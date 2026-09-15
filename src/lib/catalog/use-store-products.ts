'use client'

import { useEffect, useState } from 'react'
import { hairProducts, type Product } from '@/data/catalog'
import { toStoreProduct, type CatalogueRow } from '@/lib/catalog/adapter'

/** Shared across components so the catalogue is fetched once per page load. */
let cached: Product[] | null = null

/**
 * Client-side catalogue for the few widgets that cannot be server-rendered
 * (search overlay, saved items). Reads the public products API, which RLS
 * restricts to active products.
 */
export function useStoreProducts(enabled = true) {
  const [products, setProducts] = useState<Product[]>(() => cached ?? [])
  const [loading, setLoading] = useState(() => !cached)

  useEffect(() => {
    if (!enabled || cached) return

    const controller = new AbortController()

    void (async () => {
      try {
        const response = await fetch('/api/products', {
          signal: controller.signal,
          headers: { accept: 'application/json' },
        })
        if (!response.ok) throw new Error(`products request failed: ${response.status}`)

        const body = (await response.json()) as { data?: CatalogueRow[] }
        cached = (body.data ?? []).map(toStoreProduct)
        setProducts(cached)
      } catch (error) {
        if (controller.signal.aborted) return
        // Fall back to the bundled catalogue so the widget still works.
        console.error('[catalog]', error)
        setProducts(hairProducts)
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    })()

    return () => controller.abort()
  }, [enabled])

  return { products, loading }
}
