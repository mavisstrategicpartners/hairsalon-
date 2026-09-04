'use client'

import Image from 'next/image'
import Link from 'next/link'
import { notFound, useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { formatZar, products, toCartProduct } from '@/data/catalog'
import { ProductCard } from '@/components/site/ProductCard'
import { ActionButton } from '@/components/site/Button'
import { useCartStore } from '@/lib/store'

export default function ProductDetailPage() {
  const params = useParams<{ slug: string }>()
  const router = useRouter()
  const product = products.find((p) => p.slug === params.slug)
  const addItem = useCartStore((state) => state.addItem)
  const [lengthIndex, setLengthIndex] = useState(0)
  const [qty, setQty] = useState(1)

  if (!product) {
    notFound()
    return null
  }

  const related = products.filter((p) => p.slug !== product.slug).slice(0, 3)
  const selectedLength = product.lengths?.[lengthIndex]

  const addToBag = () => {
    addItem(toCartProduct(product, { length: selectedLength }), qty)
    router.push('/cart')
  }

  return (
    <div className="bg-[#070707]">
      <div className="mx-auto max-w-[1400px] px-6 pt-8">
        <nav className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
          <Link href="/shop" className="hover:text-foreground">
            Shop
          </Link>
          <span className="px-2">/</span>
          <span className="text-muted-foreground">{product.category}</span>
        </nav>
      </div>

      <section className="mx-auto grid max-w-[1400px] gap-12 px-6 py-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="relative aspect-[4/5] overflow-hidden bg-[#111111] outline-1 -outline-offset-1 outline-[#c9a84c]/35">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover object-center"
            />
          </div>
        </div>

        <div className="lg:col-span-5">
          <p className="eyebrow">{product.kind === 'service' ? 'Service' : product.category}</p>
          <h1 className="mt-4 text-balance font-display text-5xl italic leading-[0.95] tracking-tight sm:text-6xl">
            {product.name}
          </h1>
          <p className="mt-5 font-mono text-lg">{formatZar(product.price)}</p>
          <p className="mt-6 max-w-[46ch] text-pretty text-[15px] leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          {product.lengths ? (
            <div className="mt-9">
              <p className="label-mono text-faint">Length</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.lengths.map((l, i) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setLengthIndex(i)}
                    className={`border px-4 py-2 font-mono text-[11px] transition-colors ${
                      i === lengthIndex
                        ? 'border-[#c9a84c] text-[#c9a84c]'
                        : 'border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <div className="flex items-center border border-border">
              <button
                type="button"
                className="px-4 py-3 font-mono text-sm text-muted-foreground hover:text-foreground"
                onClick={() => setQty((n) => Math.max(1, n - 1))}
              >
                −
              </button>
              <span className="px-3 font-mono text-sm">{qty}</span>
              <button
                type="button"
                className="px-4 py-3 font-mono text-sm text-muted-foreground hover:text-foreground"
                onClick={() => setQty((n) => n + 1)}
              >
                +
              </button>
            </div>
            <ActionButton onClick={addToBag}>
              {product.kind === 'service' ? 'Add voucher to bag' : 'Add to bag'}
            </ActionButton>
          </div>

          <dl className="mt-12 border-t border-border">
            {product.specs.map((s) => (
              <div key={s.label} className="flex items-baseline justify-between border-b border-border py-4">
                <dt className="label-mono text-faint">{s.label}</dt>
                <dd className="font-mono text-sm text-muted-foreground">{s.value}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
            {product.kind === 'service'
              ? 'Redeem in studio · 46 Plein Street, Johannesburg'
              : 'Free courier over R2 500 · 2–4 working days nationwide'}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] border-t border-border px-6 py-20">
        <h2 className="mb-12 font-display text-4xl italic tracking-tight">Pairs well with</h2>
        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 md:grid-cols-3">
          {related.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </div>
  )
}
