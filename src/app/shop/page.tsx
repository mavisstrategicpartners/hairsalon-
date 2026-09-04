'use client'

import { useMemo, useState } from 'react'
import { products } from '@/data/catalog'
import { ProductCard } from '@/components/site/ProductCard'

const filters = [
  { id: 'all', label: 'All' },
  { id: 'Services', label: 'Services' },
  { id: 'Wigs', label: 'Wigs' },
  { id: 'Bundles', label: 'Bundles' },
] as const

export default function ShopPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]['id']>('all')
  const list = useMemo(
    () => (filter === 'all' ? products : products.filter((p) => p.category === filter)),
    [filter]
  )

  return (
    <div className="bg-[#070707]">
      <section className="border-b border-[#c9a84c]/30 bg-[#070707]">
        <div className="mx-auto max-w-[1400px] px-6 pb-10 pt-16">
          <p className="eyebrow">01 — Shop</p>
          <div className="mt-4 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <h1 className="max-w-[14ch] text-balance font-display text-[clamp(3rem,7vw,5.8rem)] italic leading-[0.9] tracking-tight">
              Shop hair & services
            </h1>
            <p className="max-w-[36ch] text-pretty text-[15px] leading-relaxed text-muted-foreground lg:pb-2">
              Units, bundles and studio vouchers — add to bag and pay by EFT.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={`border px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] ${
                  filter === f.id
                    ? 'border-[#c9a84c] bg-[#c9a84c] text-[#070707]'
                    : 'border-[#c9a84c]/40 bg-transparent text-[#f4ead8] hover:border-[#c9a84c]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#070707]">
        <div className="mx-auto max-w-[1400px] px-6 py-14">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
            {list.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
