'use client'

import type { Product } from '@/data/catalog'
import { listVisibleShopProducts } from '@/lib/catalog/shop-catalogue'

/**
 * Client-side catalogue for search and saved items. Same bundled 19-product
 * Shop list as the server pages — not the Supabase product table.
 */
export function useStoreProducts(enabled = true): { products: Product[]; loading: boolean } {
  return { products: enabled ? listVisibleShopProducts() : [], loading: false }
}
