'use client'

import Image from 'next/image'
import Link from 'next/link'
import { formatZar } from '@/data/catalog'
import { PageHeader } from '@/components/site/PageHeader'
import { ActionButton, buttonClass } from '@/components/site/Button'
import { useCartStore } from '@/lib/store'

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotalPrice } = useCartStore()
  const subtotal = getTotalPrice()
  const shipping = subtotal === 0 || subtotal > 2500 ? 0 : 120

  return (
    <div className="bg-white">
      <PageHeader eyebrow="Bag" title="Your bag" />

      <section className="mx-auto grid max-w-[1400px] gap-12 px-6 py-14 lg:grid-cols-12">
        <div className="lg:col-span-8">
          {items.length === 0 ? (
            <p className="text-[15px] text-muted-foreground">Your bag is empty.</p>
          ) : (
            items.map((l) => (
              <div key={l.id} className="flex gap-6 border-b border-border py-8 first:pt-0">
                <div className="relative h-32 w-24 shrink-0 overflow-hidden bg-white outline-1 -outline-offset-1 outline-[#c9a84c]/25">
                  <Image src={l.image} alt={l.name} fill sizes="96px" className="object-cover object-center" />
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline justify-between gap-4">
                    <Link
                      href={`/product/${l.slug ?? l.id.split('::')[0]}`}
                      className="font-display text-2xl italic tracking-tight hover:text-primary"
                    >
                      {l.name}
                    </Link>
                    <span className="font-mono text-sm">{formatZar(l.price * l.quantity)}</span>
                  </div>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
                    {l.length ?? l.type} · {l.category}
                  </p>
                  <div className="mt-5 flex items-center gap-6">
                    <div className="flex items-center border border-border">
                      <button
                        type="button"
                        className="px-3 py-2 font-mono text-sm text-muted-foreground hover:text-foreground"
                        onClick={() => updateQuantity(l.id, l.quantity - 1)}
                      >
                        −
                      </button>
                      <span className="px-3 font-mono text-sm">{l.quantity}</span>
                      <button
                        type="button"
                        className="px-3 py-2 font-mono text-sm text-muted-foreground hover:text-foreground"
                        onClick={() => updateQuantity(l.id, l.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground hover:text-foreground"
                      onClick={() => removeItem(l.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}

          <Link href="/shop" className={buttonClass('ghost', 'mt-8')}>
            Continue shopping
          </Link>
        </div>

        <aside className="lg:col-span-4">
          <div className="border border-border bg-panel p-8 lg:sticky lg:top-24">
            <p className="eyebrow">Summary</p>
            <dl className="mt-6 space-y-4 font-mono text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd>{formatZar(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Courier</dt>
                <dd>{shipping === 0 ? 'Free' : formatZar(shipping)}</dd>
              </div>
              <div className="flex justify-between border-t border-border pt-4 text-base">
                <dt>Total</dt>
                <dd>{formatZar(subtotal + shipping)}</dd>
              </div>
            </dl>

            {items.length > 0 ? (
              <Link href="/checkout" className={buttonClass('solid', 'mt-8 w-full')}>
                Checkout
              </Link>
            ) : (
              <ActionButton className="mt-8 w-full" disabled>
                Checkout
              </ActionButton>
            )}
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
              Free courier over R2 500 · 2–4 working days
            </p>
          </div>
        </aside>
      </section>
    </div>
  )
}
