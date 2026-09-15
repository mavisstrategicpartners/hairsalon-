'use client'

import { Suspense, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ProductCatalog } from '@/components/shop/ProductCatalog'
import type { Product } from '@/data/catalog'

const collectionQ: Record<string, string> = {
  bob: '/shop/bobs',
  straight: '/shop/straight-hair',
  wave: '/shop/curly-hair',
  frontal: '/shop/closures-frontals',
}

function ShopRedirect({ products }: { products: Product[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const q = searchParams.get('q') ?? ''

  useEffect(() => {
    const cat = searchParams.get('cat')
    if (cat === 'Services') router.replace('/services')
    else if (cat === 'Wigs') router.replace('/shop/wigs')
    else if (cat === 'Bundles') router.replace('/shop/bundles')
    else if (q && collectionQ[q]) router.replace(collectionQ[q])
  }, [router, searchParams, q])

  return <ProductCatalog query={collectionQ[q] ? '' : q} products={products} />
}

export function ShopClient({ products }: { products: Product[] }) {
  return (
    <Suspense fallback={<p className="px-6 py-16 text-muted-foreground">Loading shop…</p>}>
      <ShopRedirect products={products} />
    </Suspense>
  )
}
