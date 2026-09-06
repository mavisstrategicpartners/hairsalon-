'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import {
  getCollectionProducts,
  getHairCollection,
  hairCollections,
  hairProducts,
  type Product,
} from '@/data/catalog'
import { ProductCard } from '@/components/site/ProductCard'

const types = [
  { id: 'all', label: 'All hair' },
  { id: 'units', label: 'Units' },
  { id: 'bundles', label: 'Bundles' },
] as const

const sorts = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price: low to high' },
  { id: 'price-desc', label: 'Price: high to low' },
  { id: 'name', label: 'Name' },
] as const

type TypeId = (typeof types)[number]['id']
type SortId = (typeof sorts)[number]['id']

function applyType(list: Product[], type: TypeId) {
  if (type === 'units') return list.filter((p) => p.category === 'Wigs')
  if (type === 'bundles') return list.filter((p) => p.category === 'Bundles')
  return list
}

function applySort(list: Product[], sort: SortId) {
  const next = [...list]
  if (sort === 'price-asc') next.sort((a, b) => a.price - b.price)
  if (sort === 'price-desc') next.sort((a, b) => b.price - a.price)
  if (sort === 'name') next.sort((a, b) => a.name.localeCompare(b.name))
  return next
}

const chip = (active: boolean) =>
  `border px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] ${
    active
      ? 'border-[#c9a84c] bg-[#c9a84c] text-[#070707]'
      : 'border-[#c9a84c]/40 bg-white text-[#1a1208] hover:border-[#8a6820]'
  }`

export function ProductCatalog({
  collectionSlug,
  query = '',
}: {
  collectionSlug?: string
  query?: string
}) {
  const collection = collectionSlug ? getHairCollection(collectionSlug) : undefined
  const [type, setType] = useState<TypeId>('all')
  const [sort, setSort] = useState<SortId>('featured')
  const term = query.trim().toLowerCase()

  const list = useMemo(() => {
    let base = collectionSlug ? getCollectionProducts(collectionSlug) : hairProducts
    if (term) {
      base = base.filter((p) => `${p.name} ${p.tag} ${p.description}`.toLowerCase().includes(term))
    }
    return applySort(applyType(base, type), sort)
  }, [collectionSlug, type, sort, term])

  return (
    <div className="bg-white">
      {collection ? (
        <section className="border-b border-[#c9a84c]/30 bg-white">
          <div className="mx-auto grid max-w-[1400px] lg:grid-cols-2">
            <div className="relative min-h-[240px]">
              <Image
                src={collection.image}
                alt={collection.name}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-center"
                priority
              />
            </div>
            <div className="flex flex-col justify-center px-6 py-14 sm:px-12">
              <p className="eyebrow">Collection</p>
              <h1 className="mt-3 font-display text-[clamp(2.8rem,6vw,5rem)] italic leading-[0.92] tracking-tight">
                {collection.name}
              </h1>
              <p className="mt-5 max-w-[42ch] text-[15px] leading-relaxed text-muted-foreground">
                {collection.description}
              </p>
            </div>
          </div>
        </section>
      ) : (
        <section className="border-b border-[#c9a84c]/30 bg-white">
          <div className="mx-auto max-w-[1400px] px-6 pb-10 pt-16">
            <p className="eyebrow">Shop</p>
            <h1 className="mt-4 max-w-[12ch] text-balance font-display text-[clamp(3rem,7vw,5.8rem)] italic leading-[0.9] tracking-tight">
              Shop hair
            </h1>
            <p className="mt-5 max-w-[42ch] text-pretty text-[15px] leading-relaxed text-muted-foreground">
              {term
                ? `Results for “${query.trim()}”. Wigs, bobs, bundles and closures — studio services are listed separately.`
                : 'Wigs, bobs, bundles and closures. Add to bag and pay by EFT. Studio services are listed separately.'}
            </p>
          </div>
        </section>
      )}

      <section className="bg-white">
        <div className="mx-auto max-w-[1400px] px-6 py-10">
          <div className="flex flex-col gap-8 border-b border-[#c9a84c]/30 pb-8 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="label-mono text-faint">Category</p>
              <nav className="mt-3 flex flex-wrap gap-2">
                <Link href="/shop" className={chip(!collectionSlug)}>
                  All
                </Link>
                {hairCollections.map((c) => (
                  <Link key={c.slug} href={`/shop/${c.slug}`} className={chip(collectionSlug === c.slug)}>
                    {c.name}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
              <div>
                <p className="label-mono text-faint">Filter</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {types.map((t) => (
                    <button key={t.id} type="button" onClick={() => setType(t.id)} className={chip(type === t.id)}>
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="label-mono text-faint">Sort</p>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortId)}
                  className="mt-3 border border-[#c9a84c]/40 bg-white px-3 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#1a1208]"
                >
                  {sorts.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            {list.length} {list.length === 1 ? 'product' : 'products'}
          </p>

          {list.length === 0 ? (
            <p className="mt-10 text-[15px] text-muted-foreground">No products match these filters.</p>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
              {list.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
