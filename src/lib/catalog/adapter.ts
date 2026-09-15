import type { Product } from '@/data/catalog'
import { hasSupabaseConfig, supabaseUrl } from '@/lib/supabase/env'
import type { Json, ProductRow } from '@/lib/supabase/types'

/** Columns the storefront needs. `active` is enforced by RLS, not selected. */
export const CATALOGUE_COLUMNS =
  'slug, name, price, category, tag, image, description, length, lengths, specs'

export type CatalogueRow = Pick<
  ProductRow,
  | 'slug'
  | 'name'
  | 'price'
  | 'category'
  | 'tag'
  | 'image'
  | 'description'
  | 'length'
  | 'lengths'
  | 'specs'
>

const PRODUCT_IMAGE_BUCKET = 'product-images'
const FALLBACK_IMAGE = '/images/products/weave-closure-set.png'

/** Spec keys whose plain title-casing would read badly. */
const SPEC_LABELS: Record<string, string> = {
  lace_type: 'Lace type',
  hair_type: 'Hair type',
  cap_size: 'Cap size',
  cap_construction: 'Cap construction',
  gsm: 'GSM',
}

/**
 * Accepts a local path, an absolute URL, or an object path inside the
 * `product-images` bucket, and returns something `next/image` can render.
 */
export function resolveProductImage(image: string | null | undefined): string {
  const value = image?.trim()
  if (!value) return FALLBACK_IMAGE
  if (value.startsWith('/') || /^https?:\/\//i.test(value)) return value
  if (!hasSupabaseConfig()) return FALLBACK_IMAGE

  const prefix = `${PRODUCT_IMAGE_BUCKET}/`
  const objectPath = value.startsWith(prefix) ? value.slice(prefix.length) : value
  const base = supabaseUrl().replace(/\/+$/, '')
  return `${base}/storage/v1/object/public/${PRODUCT_IMAGE_BUCKET}/${objectPath}`
}

function humaniseKey(key: string) {
  const spaced = key.replace(/[_-]+/g, ' ').trim()
  return spaced.charAt(0).toUpperCase() + spaced.slice(1)
}

function specValue(value: Json): string | null {
  if (typeof value === 'string') return value.trim() || null
  if (typeof value === 'number' || typeof value === 'boolean') return String(value)
  if (Array.isArray(value)) {
    const parts = value.map(specValue).filter((part): part is string => Boolean(part))
    return parts.length > 0 ? parts.join(', ') : null
  }
  return null
}

/**
 * The frontend renders specs as an ordered label/value list. Supabase stores
 * flexible jsonb, so accept both `{ texture: 'Straight' }` and
 * `[{ label, value }]` shapes.
 */
export function toSpecList(specs: unknown): Product['specs'] {
  if (Array.isArray(specs)) {
    return specs.flatMap((entry) => {
      if (typeof entry !== 'object' || entry === null) return []
      const { label, value } = entry as Record<string, unknown>
      if (typeof label !== 'string' || !label.trim()) return []
      const text = specValue(value as Json)
      return text ? [{ label: label.trim(), value: text }] : []
    })
  }

  if (typeof specs === 'object' && specs !== null) {
    return Object.entries(specs as Record<string, Json>).flatMap(([key, value]) => {
      const text = specValue(value)
      return text ? [{ label: SPEC_LABELS[key] ?? humaniseKey(key), value: text }] : []
    })
  }

  return []
}

/** Adapter: one Supabase product row to the frontend `Product` interface. */
export function toStoreProduct(row: CatalogueRow): Product {
  const lengths = Array.isArray(row.lengths) && row.lengths.length > 0 ? row.lengths : undefined

  return {
    slug: row.slug,
    name: row.name,
    price: Number(row.price),
    category: row.category,
    tag: row.tag?.trim() || row.category,
    kind: 'product',
    image: resolveProductImage(row.image),
    description: row.description?.trim() ?? '',
    length: row.length?.trim() || undefined,
    lengths,
    specs: toSpecList(row.specs),
  }
}
