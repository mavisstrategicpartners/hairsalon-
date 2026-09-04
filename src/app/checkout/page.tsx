'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useCartStore } from '@/lib/store'
import { createOrder, sendOrderConfirmationEmail, type OrderItem } from '@/lib/orders'
import { formatZar } from '@/data/catalog'
import { PageHeader } from '@/components/site/PageHeader'
import { ActionButton, buttonClass } from '@/components/site/Button'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotalPrice, clearCart } = useCartStore()
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'South Africa',
  })

  const shippingCost = getTotalPrice() > 2500 || getTotalPrice() === 0 ? 0 : 120
  const total = getTotalPrice() + shippingCost

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    const orderItems: OrderItem[] = items.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      length: item.length,
      type: item.type,
    }))

    const order = createOrder({
      customerName: `${formData.firstName} ${formData.lastName}`,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      customerAddress: formData.address,
      customerCity: formData.city,
      customerPostalCode: formData.postalCode,
      items: orderItems,
      subtotal: getTotalPrice(),
      shipping: shippingCost,
      total,
      paymentMethod: 'eft',
    })

    sendOrderConfirmationEmail(order)
    sessionStorage.setItem('lastOrderId', order.id)
    clearCart()

    setTimeout(() => {
      router.push(`/order-confirmation?orderId=${order.id}`)
    }, 1500)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  if (items.length === 0) {
    return (
      <div className="bg-white">
        <PageHeader eyebrow="Checkout" title="Your bag is empty" />
        <div className="mx-auto max-w-[1400px] px-6 py-16">
          <Link href="/shop" className={buttonClass('solid')}>
            Shop the edit
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white">
      <PageHeader eyebrow="Checkout" title="Complete your order" />

      <form
        onSubmit={handleSubmit}
        className="mx-auto grid max-w-[1400px] gap-12 px-6 py-14 lg:grid-cols-12"
      >
        <div className="lg:col-span-7">
          <div className="border border-border bg-white p-8">
            <p className="eyebrow">Shipping</p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {(
                [
                  ['firstName', 'First name'],
                  ['lastName', 'Last name'],
                  ['email', 'Email'],
                  ['phone', 'Phone'],
                ] as const
              ).map(([name, label]) => (
                <div key={name}>
                  <label className="label-mono text-faint">{label}</label>
                  <input
                    required
                    type={name === 'email' ? 'email' : name === 'phone' ? 'tel' : 'text'}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="mt-2 w-full border border-border bg-white px-4 py-3 text-sm"
                  />
                </div>
              ))}
            </div>
            <div className="mt-6">
              <label className="label-mono text-faint">Address</label>
              <input
                required
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="mt-2 w-full border border-border bg-white px-4 py-3 text-sm"
              />
            </div>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <label className="label-mono text-faint">City</label>
                <input
                  required
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="mt-2 w-full border border-border bg-white px-4 py-3 text-sm"
                />
              </div>
              <div>
                <label className="label-mono text-faint">Postal code</label>
                <input
                  required
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="mt-2 w-full border border-border bg-white px-4 py-3 text-sm"
                />
              </div>
            </div>
            <div className="mt-6">
              <label className="label-mono text-faint">Country</label>
              <input
                name="country"
                value={formData.country}
                disabled
                className="mt-2 w-full border border-border bg-white px-4 py-3 text-sm opacity-60"
              />
            </div>

            <div className="mt-8 border border-border p-4">
              <p className="label-mono text-primary">EFT / bank transfer</p>
              <p className="mt-3 text-sm text-muted-foreground">
                After placing your order you will receive payment details by email.
              </p>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
                First National Bank · Bianca&apos;s Hair · 1234567890 · 250655
              </p>
            </div>

            <ActionButton type="submit" className="mt-8 w-full" disabled={isProcessing}>
              {isProcessing ? 'Processing…' : `Place order — ${formatZar(total)}`}
            </ActionButton>
          </div>
        </div>

        <aside className="lg:col-span-5">
          <div className="border border-border bg-white p-8">
            <p className="eyebrow">Summary</p>
            <div className="mt-6 space-y-3 font-mono text-sm">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between gap-4">
                  <span className="text-muted-foreground">
                    {item.name} × {item.quantity}
                  </span>
                  <span>{formatZar(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <dl className="mt-6 space-y-3 border-t border-border pt-4 font-mono text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd>{formatZar(getTotalPrice())}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Courier</dt>
                <dd>{shippingCost === 0 ? 'Free' : formatZar(shippingCost)}</dd>
              </div>
              <div className="flex justify-between border-t border-border pt-3 text-base">
                <dt>Total</dt>
                <dd>{formatZar(total)}</dd>
              </div>
            </dl>
          </div>
        </aside>
      </form>
    </div>
  )
}
