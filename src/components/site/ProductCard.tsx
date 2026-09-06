'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart } from 'lucide-react'
import { formatZar, toCartProduct, type Product } from '@/data/catalog'
import { useCartStore } from '@/lib/store'

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem)
  const toggleSaved = useCartStore((state) => state.toggleSaved)
  const saved = useCartStore((state) => state.saved)
  const loved = saved.includes(product.slug)

  return (
    <article className="relative flex h-full flex-col border border-[#c9a84c]/40 bg-white px-5 pb-5 pt-6 text-[#070707]">
      {product.kind === 'service' ? (
        <span className="absolute left-5 top-5 z-10 rounded-full border border-[#c9a84c] bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#c9a84c]">
          Service
        </span>
      ) : null}

      <button
        type="button"
        aria-label={loved ? 'Remove from saved' : 'Save'}
        onClick={() => toggleSaved(product.slug)}
        className="absolute right-5 top-5 z-10 text-[#c9a84c] transition-colors hover:text-[#070707]"
      >
        <Heart className={`h-5 w-5 ${loved ? 'fill-[#c9a84c] text-[#c9a84c]' : ''}`} />
      </button>

      <Link href={`/product/${product.slug}`} className="mx-auto mt-4 block">
        <span className="relative mx-auto block h-44 w-44 overflow-hidden rounded-full bg-white ring-1 ring-[#c9a84c]/50">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="176px"
            className="object-cover object-center"
          />
        </span>
      </Link>

      <div className="mt-6 flex flex-1 flex-col">
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-display text-xl italic leading-snug tracking-tight text-[#070707]">
            {product.name}
          </h3>
        </Link>
        {product.length ? (
          <p className="mt-1 text-sm text-black/55">Length: {product.length}</p>
        ) : (
          <p className="mt-1 text-sm text-black/55">{product.tag}</p>
        )}
        <span className="mt-3 inline-flex w-fit rounded-full border border-[#c9a84c]/40 px-3 py-0.5 text-[11px] uppercase tracking-[0.12em] text-[#c9a84c]">
          {product.tag}
        </span>

        <div className="mt-auto flex items-end justify-between pt-6">
          <p className="font-mono text-lg text-[#c9a84c]">{formatZar(product.price)}</p>
          {product.kind === 'product' ? (
            <p className="text-[11px] uppercase tracking-[0.12em] text-black/45">Premium Quality</p>
          ) : null}
        </div>

        <button
          type="button"
          onClick={() => addItem(toCartProduct(product, { length: product.length }), 1)}
          className="mt-4 w-full border-2 border-[#c9a84c] bg-[#c9a84c] py-2.5 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-black transition-colors hover:bg-black hover:border-black hover:text-white"
        >
          Add to bag
        </button>
      </div>
    </article>
  )
}
