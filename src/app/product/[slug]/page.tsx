'use client'

import Image from 'next/image'
import Link from 'next/link'
import { notFound, useParams, useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import {
  formatZar,
  getHairCollection,
  hairCareCopy,
  hairShippingCopy,
  primaryCollectionSlug,
  products,
  relatedHairProducts,
  serviceRedeemCopy,
  toCartProduct,
} from '@/data/catalog'
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

  const related = useMemo(() => (product ? relatedHairProducts(product, 4) : []), [product])
  const collectionSlug = product && product.kind === 'product' ? primaryCollectionSlug(product) : undefined
  const collection = collectionSlug ? getHairCollection(collectionSlug) : undefined

  if (!product) {
    notFound()
    return null
  }

  const selectedLength = product.lengths?.[lengthIndex]
  const isService = product.kind === 'service'

  const addToBag = () => {
    addItem(toCartProduct(product, { length: selectedLength }), qty)
    router.push('/cart')
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-[1400px] px-6 pt-8">
        <nav className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
          {isService ? (
            <Link href="/services" className="hover:text-foreground">
              Services
            </Link>
          ) : (
            <Link href="/shop" className="hover:text-foreground">
              Shop
            </Link>
          )}
          {collection ? (
            <>
              <span className="px-2">/</span>
              <Link href={`/shop/${collection.slug}`} className="hover:text-foreground">
                {collection.name}
              </Link>
            </>
          ) : null}
          <span className="px-2">/</span>
          <span className="text-muted-foreground">{product.name}</span>
        </nav>
      </div>

      <section className="mx-auto grid max-w-[1400px] gap-12 px-6 py-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="relative min-h-[52vh] overflow-hidden bg-[#f7f4ee] outline-1 -outline-offset-1 outline-[#c9a84c]/40 lg:min-h-[78vh]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover object-center"
            />
          </div>
        </div>

        <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
          <p className="eyebrow">{isService ? 'Service' : collection?.name ?? product.category}</p>
          <h1 className="mt-4 text-balance font-display text-5xl italic leading-[0.95] tracking-tight sm:text-6xl">
            {product.name}
          </h1>
          <p className="mt-5 font-mono text-lg text-[#c9a84c]">{formatZar(product.price)}</p>

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
          ) : product.length ? (
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              Length {product.length}
            </p>
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
            <ActionButton
              onClick={addToBag}
              className="border-[#c4a15a] bg-[#c4a15a] text-[#1a1208] hover:border-[#b8923a] hover:bg-[#b8923a] hover:text-[#1a1208]"
            >
              {isService ? 'Add voucher to bag' : 'Add to bag'}
            </ActionButton>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1400px] gap-px border-y border-border bg-border px-0 lg:grid-cols-2">
        <article className="bg-white px-6 py-12 sm:px-10">
          <h2 className="font-display text-3xl italic tracking-tight">Description</h2>
          <p className="mt-5 max-w-[52ch] text-[15px] leading-relaxed text-muted-foreground">{product.description}</p>
        </article>
        <article className="bg-white px-6 py-12 sm:px-10">
          <h2 className="font-display text-3xl italic tracking-tight">
            {isService ? 'Service details' : 'Hair details'}
          </h2>
          <dl className="mt-5">
            {product.specs.map((s) => (
              <div key={s.label} className="flex items-baseline justify-between border-b border-border py-4">
                <dt className="label-mono text-faint">{s.label}</dt>
                <dd className="font-mono text-sm text-muted-foreground">{s.value}</dd>
              </div>
            ))}
          </dl>
        </article>
        <article className="bg-white px-6 py-12 sm:px-10">
          <h2 className="font-display text-3xl italic tracking-tight">{isService ? 'In studio' : 'Care'}</h2>
          <p className="mt-5 max-w-[52ch] text-[15px] leading-relaxed text-muted-foreground">
            {isService ? serviceRedeemCopy : hairCareCopy}
          </p>
        </article>
        <article className="bg-white px-6 py-12 sm:px-10">
          <h2 className="font-display text-3xl italic tracking-tight">
            {isService ? 'Booking' : 'Shipping'}
          </h2>
          <p className="mt-5 max-w-[52ch] text-[15px] leading-relaxed text-muted-foreground">
            {isService
              ? 'Choose a voucher, pay by EFT, then write to us or call 083 670 2112 to hold a chair at 46 Plein Street.'
              : hairShippingCopy}
          </p>
        </article>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-20">
        <h2 className="mb-12 font-display text-4xl italic tracking-tight">
          {isService ? 'Other services' : 'Related products'}
        </h2>
        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 xl:grid-cols-4">
          {related.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </div>
  )
}
