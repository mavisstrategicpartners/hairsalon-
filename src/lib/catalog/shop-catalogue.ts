import { hairProducts, type Product } from '@/data/catalog'
import { isAiGeneratedShopImage } from '@/lib/catalog/ai-generated-shop-images'
import { REMOVED_FROM_SHOP } from '@/lib/catalog/removed-from-shop'

function isVisibleShopProduct(product: Product): boolean {
  if (product.kind !== 'product') return false
  if (REMOVED_FROM_SHOP.has(product.slug)) return false
  if (!product.image || product.imageUnavailable || isAiGeneratedShopImage(product.image)) {
    return false
  }
  return true
}

/** The 19-product Shop catalogue. Independent of the Supabase products table. */
export function listVisibleShopProducts(): Product[] {
  return hairProducts.filter(isVisibleShopProduct)
}

export function getVisibleShopProduct(slug: string): Product | null {
  const product = hairProducts.find((entry) => entry.slug === slug)
  return product && isVisibleShopProduct(product) ? product : null
}
