import { getBankDetails } from '@/lib/commerce/bank'
import { CheckoutForm } from './CheckoutForm'

/**
 * Rendered per request so the banking details come from the live environment.
 * Prerendering would freeze them at build time, and the form below is a client
 * component anyway, so there is nothing to cache.
 */
export const dynamic = 'force-dynamic'

export default function CheckoutPage() {
  return <CheckoutForm bank={getBankDetails()} />
}
