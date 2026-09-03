'use client'

import { products } from '@/data/products'
import ProductCard from '@/components/ProductCard'
import { useCartStore } from '@/lib/store'

export default function ShopPage() {
  const addItem = useCartStore((state) => state.addItem)

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
          Our Hair Collection
        </h1>
        <p className="mt-2 text-gray-500">
          Premium wigs, bundles & installation services
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={addItem}
          />
        ))}
      </div>
    </div>
  )
}
