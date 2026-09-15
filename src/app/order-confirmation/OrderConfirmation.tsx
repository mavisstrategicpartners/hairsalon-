'use client'

import { useMemo, useSyncExternalStore } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { parseStoredOrder, readStoredOrderJson, type BankDetails } from '@/lib/commerce/eft'
import { formatZar } from '@/data/catalog'
import { PageHeader } from '@/components/site/PageHeader'
import { buttonClass } from '@/components/site/Button'

/** The stored order never changes while the page is open. */
const subscribe = () => () => {}
/** `undefined` on the server marks "not hydrated yet", distinct from "missing". */
const getServerSnapshot = () => undefined

export function OrderConfirmation({ bank }: { bank: BankDetails }) {
  const searchParams = useSearchParams()
  const orderNumber = searchParams.get('order')
  const raw = useSyncExternalStore(subscribe, readStoredOrderJson, getServerSnapshot)
  const order = useMemo(() => parseStoredOrder(raw, orderNumber), [raw, orderNumber])

  if (raw === undefined) {
    return <p className="bg-white px-6 py-16 text-muted-foreground">Loading order details...</p>
  }

  if (!order) {
    return (
      <div className="bg-white">
        <PageHeader eyebrow="Order" title="Order not found" />
        <div className="mx-auto max-w-[1400px] px-6 py-16">
          <Link href="/shop" className={buttonClass('solid')}>
            Continue shopping
          </Link>
        </div>
      </div>
    )
  }

  const reference =
    bank.referenceInstructions ?? `Use ${order.order_number} as your payment reference.`

  return (
    <div className="bg-white">
      <PageHeader
        eyebrow="Confirmed"
        title="Order placed"
        intro={`Order ${order.order_number}. Payment details are below — use the order number as your reference.`}
      />

      <section className="mx-auto max-w-[900px] space-y-8 px-6 py-14">
        <div className="border border-[#c9a84c]/40 bg-white p-8 text-[#070707]">
          <p className="eyebrow">Details</p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 font-mono text-sm">
            <div>
              <p className="label-mono text-faint">Date</p>
              <p className="mt-1">{new Date(order.created_at).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="label-mono text-faint">Payment</p>
              <p className="mt-1">{order.payment_status === 'completed' ? 'Paid' : 'Pending EFT'}</p>
            </div>
          </div>
          <p className="mt-6 text-sm text-black/60">
            {order.customer_name}
            <br />
            {order.customer_address}
            <br />
            {order.customer_city}, {order.customer_postal_code}
          </p>
          <div className="mt-6 space-y-2 font-mono text-sm">
            {order.items.map((item, index) => (
              <div key={index} className="flex justify-between">
                <span className="text-black/55">
                  {item.name} × {item.quantity}
                  {item.length ? ` (${item.length})` : ''}
                </span>
                <span>{formatZar(item.line_total)}</span>
              </div>
            ))}
          </div>
          <dl className="mt-4 space-y-3 border-t border-border pt-4 font-mono text-sm">
            <div className="flex justify-between">
              <dt className="text-black/55">Subtotal</dt>
              <dd>{formatZar(order.subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-black/55">Courier</dt>
              <dd>{order.shipping === 0 ? 'Free' : formatZar(order.shipping)}</dd>
            </div>
            <div className="flex justify-between border-t border-border pt-3 text-base">
              <dt>Total</dt>
              <dd>{formatZar(order.total)}</dd>
            </div>
          </dl>
        </div>

        {order.payment_status !== 'completed' && (
          <div className="border border-[#c9a84c]/40 bg-white p-8 text-[#070707]">
            <p className="eyebrow">Payment required</p>
            <dl className="mt-6 space-y-3 font-mono text-sm">
              {bank.fields.map((field) => (
                <div key={field.label} className="flex justify-between gap-4">
                  <dt className="text-black/55">{field.label}</dt>
                  <dd>{field.value}</dd>
                </div>
              ))}
              <div className="flex justify-between gap-4">
                <dt className="text-black/55">Payment reference</dt>
                <dd>{order.order_number}</dd>
              </div>
              <div className="flex justify-between gap-4 border-t border-border pt-3 text-base">
                <dt>Amount due</dt>
                <dd>{formatZar(order.total)}</dd>
              </div>
            </dl>
            <p className="mt-6 text-sm text-black/60">
              {bank.configured
                ? reference
                : `Your banking details are on their way by email. ${reference}`}
            </p>
            <p className="mt-3 text-sm text-black/60">
              Send your proof of payment to info@bianahairsalon.com. Payment is confirmed in the
              studio, and your order is updated from there.
            </p>
          </div>
        )}

        {order.payment_status === 'completed' && (
          <p className="text-[15px] text-muted-foreground">
            Payment confirmed. A shipping note will follow by email.
          </p>
        )}

        <Link href="/shop" className={buttonClass('outline')}>
          Continue shopping
        </Link>
      </section>
    </div>
  )
}
