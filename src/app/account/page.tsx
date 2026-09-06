'use client'

import Link from 'next/link'
import { products } from '@/data/catalog'
import { ProductCard } from '@/components/site/ProductCard'
import { PageHeader } from '@/components/site/PageHeader'
import { buttonClass } from '@/components/site/Button'
import { useCartStore } from '@/lib/store'

export default function AccountPage() {
  const hasHydrated = useCartStore((state) => state.hasHydrated)
  const saved = useCartStore((state) => state.saved)
  const savedProducts = products.filter((p) => saved.includes(p.slug) && p.kind === 'product')

  return (
    <div className="bg-white">
      <PageHeader
        eyebrow="Account"
        title="Saved pieces."
        intro="Checkout is by EFT as a guest — no login required. Heart a product in Shop to keep it here."
      />
      <section className="mx-auto max-w-[1400px] px-6 py-14">
        {!hasHydrated ? (
          <p className="text-muted-foreground">Loading saved pieces…</p>
        ) : savedProducts.length === 0 ? (
          <div>
            <p className="max-w-[42ch] text-[15px] leading-relaxed text-muted-foreground">
              Nothing saved yet. Browse the shop and use the heart on a card to keep a piece for later.
            </p>
            <Link href="/shop" className={`${buttonClass('solid')} mt-8`}>
              Shop Hair
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
            {savedProducts.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
