import { notFound } from 'next/navigation'
import { getStoreProduct, listRelatedStoreProducts } from '@/lib/catalog/products'
import { ProductDetail } from './ProductDetail'

/**
 * Matches the catalogue pages: edits in Supabase appear within a minute, and a
 * brief Supabase outage serves the last good render instead of an error.
 */
export const revalidate = 60

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getStoreProduct(slug)
  if (!product) notFound()

  const related = await listRelatedStoreProducts(product, 4)
  return <ProductDetail product={product} related={related} />
}
