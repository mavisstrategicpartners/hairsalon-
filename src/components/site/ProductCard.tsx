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
  const hasHydrated = useCartStore((state) => state.hasHydrated)
  const loved = hasHydrated && saved.includes(product.slug)

  return (
    <article className="relative flex h-full flex-col text-[#1a1208]">
      {product.kind === 'service' ? (
        <span className="absolute left-3 top-3 z-10 bg-white/90 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#1a1208]">
          Service
        </span>
      ) : null}

      <button
        type="button"
        aria-label={loved ? 'Remove from saved' : 'Save'}
        onClick={() => toggleSaved(product.slug)}
        className="absolute right-3 top-3 z-10 text-[#1a1208]/40 transition-colors hover:text-[#1a1208]"
      >
        <Heart className={`h-4 w-4 ${loved ? 'fill-[#1a1208] text-[#1a1208]' : ''}`} strokeWidth={1.5} />
      </button>

      <Link href={`/product/${product.slug}`} className="group block">
        <span className="relative block aspect-[4/5] overflow-hidden bg-[#f4efe8]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1280px) 22vw, (min-width: 640px) 45vw, 100vw"
            className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
          />
        </span>
      </Link>

      <div className="flex flex-1 flex-col pt-4">
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-display text-[1.2rem] italic leading-snug tracking-tight">
            {product.name}
          </h3>
        </Link>
        {product.length ? (
          <p className="mt-1 text-[13px] text-[#1a1208]/50">Length: {product.length}</p>
        ) : (
          <p className="mt-1 text-[13px] text-[#1a1208]/50">{product.tag}</p>
        )}
        <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-[#1a1208]/40">{product.tag}</p>

        <div className="mt-auto flex items-end justify-between pt-4">
          <p className="text-[15px] tracking-wide">{formatZar(product.price)}</p>
          {product.kind === 'product' ? (
            <p className="text-[10px] uppercase tracking-[0.14em] text-[#1a1208]/35">Premium Quality</p>
          ) : null}
        </div>

        <button
          type="button"
          onClick={() => addItem(toCartProduct(product, { length: product.length }), 1)}
          className="mt-4 w-full border border-[#c4a15a] bg-[#c4a15a] py-2.5 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[#1a1208] transition-colors hover:border-[#b8923a] hover:bg-[#b8923a]"
        >
          Add to bag
        </button>
      </div>
    </article>
  )
}
