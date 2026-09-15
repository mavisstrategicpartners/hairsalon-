import { Suspense } from 'react'
import { getBankDetails } from '@/lib/commerce/bank'
import { OrderConfirmation } from './OrderConfirmation'

/** Per request, so the banking details come from the live environment. */
export const dynamic = 'force-dynamic'

export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <p className="bg-white px-6 py-16 text-muted-foreground">Loading order details...</p>
      }
    >
      <OrderConfirmation bank={getBankDetails()} />
    </Suspense>
  )
}
