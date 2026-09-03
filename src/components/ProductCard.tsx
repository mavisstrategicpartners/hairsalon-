'use client'

import { Product } from '@/lib/store'
import { ShoppingCart, Heart } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const isService = product.category === 'services'

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200/80 transition hover:shadow-md">
      <div className="relative bg-gradient-to-b from-[#fde8d8] to-white px-6 pb-4 pt-6">
        <button
          type="button"
          onClick={() => setIsLiked(!isLiked)}
          className="absolute right-4 top-4 z-10 rounded-full p-1.5 text-gray-400 transition hover:text-[#d4653f]"
          aria-label={isLiked ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`h-5 w-5 ${isLiked ? 'fill-[#d4653f] text-[#d4653f]' : ''}`} />
        </button>

        {isService && (
          <span className="absolute left-4 top-4 z-10 rounded-full bg-black px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-white">
            Service
          </span>
        )}

        <div className="relative mx-auto h-40 w-40 overflow-hidden rounded-full bg-white ring-1 ring-gray-200/60">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="160px"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="line-clamp-2 text-[15px] font-bold leading-snug text-gray-900">
          {product.name}
        </h3>
        {product.length && (
          <p className="text-sm text-gray-400">Length: {product.length}</p>
        )}
        {product.type && (
          <span className="inline-flex w-fit items-center rounded-full border border-[#d4653f]/40 px-2.5 py-0.5 text-xs font-medium text-[#d4653f]">
            {product.type}
          </span>
        )}
        <div className="mt-auto flex items-end justify-between pt-3">
          <span className="text-lg font-bold text-[#d4653f]">
            R{product.price.toLocaleString()}
          </span>
          {!isService && (
            <span className="text-xs text-gray-400">Premium Quality</span>
          )}
        </div>
      </div>

      <div className="px-5 pb-5">
        <button
          type="button"
          onClick={() => onAddToCart(product)}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#d4653f] py-2.5 text-sm font-semibold text-white transition hover:bg-[#d4653f]/90"
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </button>
      </div>
    </div>
  )
}
