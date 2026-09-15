import 'server-only'

import {
  hairProducts,
  productMatchesCollection,
  serviceProducts,
  type Product,
} from '@/data/catalog'
import { CATALOGUE_COLUMNS, toStoreProduct } from '@/lib/catalog/adapter'
import { hasSupabaseConfig } from '@/lib/supabase/env'
import { createSupabasePublicClient } from '@/lib/supabase/public'

function catalogueUnavailable(message: string): never {
  throw new Error(`Could not load the Biana catalogue from Supabase: ${message}`)
}

/**
 * Every hair product the storefront may show. Until Supabase credentials are
 * present the bundled catalogue is served so the site keeps working locally;
 * once configured, Supabase is the only source and errors surface loudly.
 */
export async function listStoreProducts(): Promise<Product[]> {
  if (!hasSupabaseConfig()) return hairProducts

  const supabase = createSupabasePublicClient()
  const { data, error } = await supabase
    .from('products')
    .select(CATALOGUE_COLUMNS)
    .order('created_at', { ascending: false })

  if (error) catalogueUnavailable(error.message)
  return (data ?? []).map(toStoreProduct)
}

/**
 * Hair products come from Supabase; studio services stay static frontend
 * content and are never written to the products table.
 */
export async function getStoreProduct(slug: string): Promise<Product | null> {
  const service = serviceProducts.find((product) => product.slug === slug)
  if (service) return service

  if (!hasSupabaseConfig()) {
    return hairProducts.find((product) => product.slug === slug) ?? null
  }

  const supabase = createSupabasePublicClient()
  const { data, error } = await supabase
    .from('products')
    .select(CATALOGUE_COLUMNS)
    .eq('slug', slug)
    .maybeSingle()

  if (error) catalogueUnavailable(error.message)
  return data ? toStoreProduct(data) : null
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
