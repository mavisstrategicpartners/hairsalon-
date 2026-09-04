'use client'

import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import {
  getOrderById,
  updatePaymentStatus,
  sendPaymentConfirmationEmail,
  type Order,
} from '@/lib/orders'
import { formatZar } from '@/data/catalog'
import { PageHeader } from '@/components/site/PageHeader'
import { ActionButton, buttonClass } from '@/components/site/Button'

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<p className="px-6 py-16 text-muted-foreground">Loading order details...</p>}>
      <OrderConfirmationContent />
    </Suspense>
  )
}

function OrderConfirmationContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')
  const [order, setOrder] = useState<Order | undefined>(() => (orderId ? getOrderById(orderId) : undefined))
  const [confirmingPayment, setConfirmingPayment] = useState(false)

  const handleConfirmPayment = () => {
    if (!order) return
    setConfirmingPayment(true)
    setTimeout(() => {
      updatePaymentStatus(order.id, 'completed')
      sendPaymentConfirmationEmail(order)
      setOrder(getOrderById(order.id))
      setConfirmingPayment(false)
    }, 1500)
  }

  if (!orderId || !order) {
    return (
      <>
        <PageHeader eyebrow="Order" title="Order not found" />
        <div className="mx-auto max-w-[1400px] px-6 py-16">
          <Link href="/shop" className={buttonClass('solid')}>
            Continue shopping
          </Link>
        </div>
      </>
    )
  }

  return (
    <>
      <PageHeader
        eyebrow="Confirmed"
        title="Order placed"
        intro={`Order ${order.orderNumber}. Payment details are below — use the order number as your reference.`}
      />

      <section className="mx-auto max-w-[900px] space-y-8 px-6 py-14">
        <div className="border border-border bg-panel p-8">
          <p className="eyebrow">Details</p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 font-mono text-sm">
            <div>
              <p className="label-mono text-faint">Date</p>
              <p className="mt-1">{new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="label-mono text-faint">Payment</p>
              <p className="mt-1">
                {order.paymentStatus === 'completed' ? 'Paid' : 'Pending EFT'}
              </p>
            </div>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            {order.customerName}
            <br />
            {order.customerAddress}
            <br />
            {order.customerCity}, {order.customerPostalCode}
          </p>
          <div className="mt-6 space-y-2 font-mono text-sm">
            {order.items.map((item, index) => (
              <div key={index} className="flex justify-between">
                <span className="text-muted-foreground">
                  {item.name} × {item.quantity}
                  {item.length ? ` (${item.length})` : ''}
                </span>
                <span>{formatZar(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between border-t border-border pt-4 font-mono text-base">
            <span>Total</span>
            <span>{formatZar(order.total)}</span>
          </div>
        </div>

        {order.paymentStatus !== 'completed' && (
          <div className="border border-border bg-panel p-8">
            <p className="eyebrow">Payment required</p>
            <p className="mt-4 text-sm text-muted-foreground">
              First National Bank · Bianca&apos;s Hair · 1234567890 · 250655
              <br />
              Reference {order.orderNumber} · {formatZar(order.total)}
            </p>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
              Admin demo: confirm payment below.
            </p>
            <ActionButton className="mt-6" onClick={handleConfirmPayment} disabled={confirmingPayment}>
              {confirmingPayment ? 'Confirming…' : 'Confirm payment (admin demo)'}
            </ActionButton>
          </div>
        )}

        {order.paymentStatus === 'completed' && (
          <p className="text-[15px] text-muted-foreground">
            Payment confirmed. A shipping note will follow by email.
          </p>
        )}

        <Link href="/shop" className={buttonClass('outline')}>
          Continue shopping
        </Link>
      </section>
    </>
  )
}
