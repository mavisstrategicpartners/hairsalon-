import { listStoreProducts } from '@/lib/catalog/products'
import { ShopClient } from './ShopClient'

/** Catalogue changes in Supabase appear within a minute. */
export const revalidate = 60

export default async function ShopPage() {
  const products = await listStoreProducts()
  return <ShopClient products={products} />
}
