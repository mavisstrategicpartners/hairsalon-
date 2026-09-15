import 'server-only'

import { PricingError } from '@/lib/commerce/pricing'
import { PRODUCT_CATEGORIES, type Json, type ProductCategory } from '@/lib/supabase/types'

export type ProductWritePayload = {
  slug: string
  name: string
  price: number
  category: ProductCategory
  tag: string | null
  image: string | null
  description: string | null
  length: string | null
  lengths: string[]
  specs: Record<string, Json>
  active: boolean
}

const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/

function requireString(value: unknown, field: string): string {
  if (typeof value !== 'string' || !value.trim()) {
    throw new PricingError(`"${field}" is required.`)
  }
  return value.trim()
}

function optionalString(value: unknown, field: string): string | null {
  if (value === undefined || value === null || value === '') return null
  if (typeof value !== 'string') {
    throw new PricingError(`"${field}" must be a string.`)
  }
  const trimmed = value.trim()
  return trimmed ? trimmed : null
}

function parsePrice(value: unknown): number {
  const price = typeof value === 'number' ? value : Number(value)
  if (!Number.isFinite(price) || price < 0) {
    throw new PricingError('"price" must be a number of zero or more.')
  }
  return Math.round(price * 100) / 100
}

function parseCategory(value: unknown): ProductCategory {
  const category = requireString(value, 'category')
  if (!(PRODUCT_CATEGORIES as readonly string[]).includes(category)) {
    throw new PricingError(`"category" must be one of: ${PRODUCT_CATEGORIES.join(', ')}.`)
  }
  return category as ProductCategory
}

function parseLengths(value: unknown): string[] {
  if (value === undefined || value === null) return []
  if (!Array.isArray(value) || value.some((entry) => typeof entry !== 'string')) {
    throw new PricingError('"lengths" must be an array of strings.')
  }
  return value.map((entry) => (entry as string).trim()).filter(Boolean)
}

function parseSpecs(value: unknown): Record<string, Json> {
  if (value === undefined || value === null) return {}
  if (typeof value !== 'object' || Array.isArray(value)) {
    throw new PricingError('"specs" must be a JSON object.')
  }
  return value as Record<string, Json>
}

export function parseProductCreate(body: Record<string, unknown>): ProductWritePayload {
  const slug = requireString(body.slug, 'slug').toLowerCase()
  if (!SLUG_PATTERN.test(slug)) {
    throw new PricingError('"slug" must be lowercase words separated by hyphens.')
  }

  return {
    slug,
    name: requireString(body.name, 'name'),
    price: parsePrice(body.price),
    category: parseCategory(body.category),
    tag: optionalString(body.tag, 'tag'),
    image: optionalString(body.image, 'image'),
    description: optionalString(body.description, 'description'),
    length: optionalString(body.length, 'length'),
    lengths: parseLengths(body.lengths),
    specs: parseSpecs(body.specs),
    active: body.active === undefined ? true : Boolean(body.active),
  }
}

export function parseProductUpdate(
  body: Record<string, unknown>
): Partial<ProductWritePayload> {
  const patch: Partial<ProductWritePayload> = {}

  if ('name' in body) patch.name = requireString(body.name, 'name')
  if ('price' in body) patch.price = parsePrice(body.price)
  if ('category' in body) patch.category = parseCategory(body.category)
  if ('tag' in body) patch.tag = optionalString(body.tag, 'tag')
  if ('image' in body) patch.image = optionalString(body.image, 'image')
  if ('description' in body) patch.description = optionalString(body.description, 'description')
  if ('length' in body) patch.length = optionalString(body.length, 'length')
  if ('lengths' in body) patch.lengths = parseLengths(body.lengths)
  if ('specs' in body) patch.specs = parseSpecs(body.specs)
  if ('active' in body) patch.active = Boolean(body.active)

  if ('slug' in body) {
    const slug = requireString(body.slug, 'slug').toLowerCase()
    if (!SLUG_PATTERN.test(slug)) {
      throw new PricingError('"slug" must be lowercase words separated by hyphens.')
    }
    patch.slug = slug
  }

  if (Object.keys(patch).length === 0) {
    throw new PricingError('No supported fields to update.')
  }

  return patch
}
