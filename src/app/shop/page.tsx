'use client'

import { Suspense, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ProductCatalog } from '@/components/shop/ProductCatalog'

const collectionQ: Record<string, string> = {
  bob: '/shop/bobs',
  straight: '/shop/straight-hair',
  wave: '/shop/curly-hair',
  frontal: '/shop/closures-frontals',
}

function ShopRedirect() {
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

  return <ProductCatalog query={collectionQ[q] ? '' : q} />
}

export default function ShopPage() {
  return (
    <Suspense fallback={<p className="px-6 py-16 text-muted-foreground">Loading shop…</p>}>
      <ShopRedirect />
    </Suspense>
  )
}
