import { hairProducts, type Product } from '@/data/catalog'
import { REMOVED_FROM_SHOP } from '@/lib/catalog/removed-from-shop'

function isVisibleShopProduct(product: Product): boolean {
  if (product.kind !== 'product') return false
  if (REMOVED_FROM_SHOP.has(product.slug)) return false
  if (!product.image || product.imageUnavailable) return false
  return true
}

/** The bundled Shop catalogue. Independent of the Supabase products table. */
export function listVisibleShopProducts(): Product[] {
  return hairProducts.filter(isVisibleShopProduct)
}

export function getVisibleShopProduct(slug: string): Product | null {
  const product = hairProducts.find((entry) => entry.slug === slug)
  return product && isVisibleShopProduct(product) ? product : null
}

export type GalleryPhoto = { src: string; product: Product }

/** Gallery page: every still photograph of the Shop products, in Shop order. */
export function listGalleryPhotos(): GalleryPhoto[] {
  const seen = new Set<string>()
  const photos: GalleryPhoto[] = []
  for (const product of listVisibleShopProducts()) {
    for (const src of [product.image, ...(product.images ?? [])]) {
      if (!src || /\.(mp4|webm|mov)$/i.test(src) || seen.has(src)) continue
      seen.add(src)
      photos.push({ src, product })
    }
  }
  return photos
}
