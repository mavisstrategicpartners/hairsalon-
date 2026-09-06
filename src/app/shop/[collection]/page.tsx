import { notFound } from 'next/navigation'
import { getHairCollection, hairCollections } from '@/data/catalog'
import { ProductCatalog } from '@/components/shop/ProductCatalog'

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
  return <ProductCatalog collectionSlug={col.slug} />
}
