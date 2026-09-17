import 'server-only'

import { serviceProducts } from '@/data/catalog'
import { createSupabaseAdminClient } from '@/lib/supabase/admin'
import type { OrderItemSnapshot } from '@/lib/supabase/types'

/**
 * Studio service vouchers are static frontend content, so their prices are read
 * from the same server-side module the Services page renders. The browser still
 * never supplies a price.
 */
const SERVICE_PRICES = new Map(
  serviceProducts.map((service) => [service.slug, { name: service.name, price: service.price }])
)

/** Free courier above this subtotal, mirroring the published shipping policy. */
export const FREE_SHIPPING_THRESHOLD = 2500
export const STANDARD_SHIPPING_FEE = 120
export const MAX_QUANTITY_PER_LINE = 99

export type RequestedLine = {
  slug: string
  quantity: number
  length: string | null
}

export type PricedOrder = {
  items: OrderItemSnapshot[]
  subtotal: number
  shipping: number
  total: number
}

export class PricingError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'PricingError'
  }
}

const toCents = (value: number) => Math.round(value * 100)
const fromCents = (cents: number) => Math.round(cents) / 100

function unitPriceFromRow(
  base: number,
  specs: unknown,
  length: string | null
): number {
  if (typeof specs !== 'object' || specs === null || Array.isArray(specs)) return base
  const prices = (specs as Record<string, unknown>).length_prices
  if (typeof prices !== 'object' || prices === null || Array.isArray(prices)) return base
  if (!length) return base
  const value = (prices as Record<string, unknown>)[length]
  const parsed = typeof value === 'number' ? value : Number(value)
  if (!Number.isFinite(parsed) || parsed < 0) {
    throw new PricingError(`Length "${length}" is not available.`)
  }
  return parsed
}

/**
 * The cart stores its line id as `slug` or `slug::length`, so accept either and
 * recover the slug. Only the slug is ever used to look up a price.
 */
export function parseLineIdentifier(raw: string): { slug: string; length: string | null } {
  const [slug, ...rest] = raw.split('::')
  return { slug: slug.trim(), length: rest.length > 0 ? rest.join('::') : null }
}

export function normaliseRequestedLines(input: unknown): RequestedLine[] {
  if (!Array.isArray(input) || input.length === 0) {
    throw new PricingError('An order must contain at least one item.')
  }

  const merged = new Map<string, RequestedLine>()

  for (const entry of input) {
    if (typeof entry !== 'object' || entry === null) {
      throw new PricingError('Each order item must be an object.')
    }

    const line = entry as Record<string, unknown>
    const identifier =
      typeof line.slug === 'string' && line.slug.trim()
        ? line.slug
        : typeof line.id === 'string'
          ? line.id
          : null

    if (!identifier) {
      throw new PricingError('Each order item needs a product slug.')
    }

    const parsed = parseLineIdentifier(identifier)
    if (!parsed.slug) {
      throw new PricingError('Each order item needs a product slug.')
    }

    const rawQuantity = line.quantity ?? 1
    const quantity = typeof rawQuantity === 'number' ? rawQuantity : Number(rawQuantity)
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > MAX_QUANTITY_PER_LINE) {
      throw new PricingError(
        `Quantity for "${parsed.slug}" must be a whole number between 1 and ${MAX_QUANTITY_PER_LINE}.`
      )
    }

    const length =
      typeof line.length === 'string' && line.length.trim() ? line.length.trim() : parsed.length

    const key = `${parsed.slug}::${length ?? ''}`
    const existing = merged.get(key)
    const combined = (existing?.quantity ?? 0) + quantity

    if (combined > MAX_QUANTITY_PER_LINE) {
      throw new PricingError(
        `Quantity for "${parsed.slug}" must not exceed ${MAX_QUANTITY_PER_LINE}.`
      )
    }

    merged.set(key, { slug: parsed.slug, length, quantity: combined })
  }

  return [...merged.values()]
}

/**
 * Recalculates an order from the prices held in Supabase. Any price, subtotal
 * or total supplied by the client is ignored.
 */
export async function priceOrder(lines: RequestedLine[]): Promise<PricedOrder> {
  const productSlugs = [
    ...new Set(lines.filter((line) => !SERVICE_PRICES.has(line.slug)).map((line) => line.slug)),
  ]

  const sellable = new Map<
    string,
    { id: string; slug: string; name: string; price: number; specs: unknown }
  >()

  if (productSlugs.length > 0) {
    const admin = createSupabaseAdminClient()
    const { data, error } = await admin
      .from('products')
      .select('id, slug, name, price, active, specs')
      .in('slug', productSlugs)

    if (error) {
      throw new PricingError('Could not load product prices.')
    }

    for (const row of data ?? []) {
      if (row.active) sellable.set(row.slug, row)
    }

    const missing = productSlugs.filter((slug) => !sellable.has(slug))
    if (missing.length > 0) {
      throw new PricingError(`These items are no longer available: ${missing.join(', ')}.`)
    }
  }

  const items: OrderItemSnapshot[] = lines.map((line) => {
    const service = SERVICE_PRICES.get(line.slug)
    const source = service
      ? { id: null, name: service.name, price: service.price }
      : (() => {
          const product = sellable.get(line.slug)!
          return {
            id: product.id,
            name: product.name,
            price: unitPriceFromRow(Number(product.price), product.specs, line.length),
          }
        })()

    const unitPriceCents = toCents(source.price)
    const lineTotalCents = unitPriceCents * line.quantity

    return {
      product_id: source.id,
      kind: service ? 'service' : 'product',
      slug: line.slug,
      name: source.name,
      unit_price: fromCents(unitPriceCents),
      quantity: line.quantity,
      line_total: fromCents(lineTotalCents),
      length: line.length,
    }
  })

  const subtotalCents = items.reduce((sum, item) => sum + toCents(item.line_total), 0)
  const shippingCents =
    subtotalCents > toCents(FREE_SHIPPING_THRESHOLD) || subtotalCents === 0
      ? 0
      : toCents(STANDARD_SHIPPING_FEE)

  return {
    items,
    subtotal: fromCents(subtotalCents),
    shipping: fromCents(shippingCents),
    total: fromCents(subtotalCents + shippingCents),
  }
}
