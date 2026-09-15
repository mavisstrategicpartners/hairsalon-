import { notFound } from 'next/navigation'
import { getHairCollection, hairCollections } from '@/data/catalog'
import { listStoreProducts } from '@/lib/catalog/products'
import { ProductCatalog } from '@/components/shop/ProductCatalog'

/** Catalogue changes in Supabase appear within a minute. */
export const revalidate = 60

export function generateStaticParams() {
  return hairCollections.map((c) => ({ collection: c.slug }))
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ collection: string }>
}) {
  const { collection } = await params
  const col = getHairCollection(collection)
  if (!col) notFound()
  const products = await listStoreProducts()
  return <ProductCatalog collectionSlug={col.slug} products={products} />
}
