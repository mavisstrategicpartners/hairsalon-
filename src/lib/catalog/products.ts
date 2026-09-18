import 'server-only'

import {
  productMatchesCollection,
  serviceProducts,
  type Product,
} from '@/data/catalog'
import { getVisibleShopProduct, listVisibleShopProducts } from '@/lib/catalog/shop-catalogue'

/**
 * Storefront catalogue: the bundled 19-product Shop list with genuine
 * catalogue photographs. Checkout still prices orders from Supabase.
 */
export async function listStoreProducts(): Promise<Product[]> {
  return listVisibleShopProducts()
}

/**
 * Hair products come from the bundled Shop catalogue; studio services stay
 * static frontend content and are never written to the products table.
 */
export async function getStoreProduct(slug: string): Promise<Product | null> {
  const service = serviceProducts.find((product) => product.slug === slug)
  if (service) return service
  return getVisibleShopProduct(slug)
}

/** Products for one of the existing storefront collections. */
export async function listStoreProductsForCollection(collectionSlug: string): Promise<Product[]> {
  const products = await listStoreProducts()
  return products.filter((product) => productMatchesCollection(product, collectionSlug))
}

/** Home-page picks, kept in the order the slugs were given. */
export async function listFeaturedStoreProducts(slugs: readonly string[]): Promise<Product[]> {
  const products = await listStoreProducts()
  const bySlug = new Map(products.map((product) => [product.slug, product]))
  return slugs.flatMap((slug) => {
    const product = bySlug.get(slug)
    return product ? [product] : []
  })
}

/** Related items: services suggest services, hair suggests hair. */
export async function listRelatedStoreProducts(product: Product, limit = 4): Promise<Product[]> {
  const pool = product.kind === 'service' ? serviceProducts : await listStoreProducts()

  return pool
    .filter((candidate) => candidate.slug !== product.slug)
    .sort((a, b) => {
      const score = (candidate: Product) =>
        (candidate.category === product.category ? 2 : 0) + (candidate.tag === product.tag ? 3 : 0)
      return score(b) - score(a)
    })
    .slice(0, limit)
}
