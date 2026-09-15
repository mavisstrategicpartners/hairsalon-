import type { OrderItemSnapshot } from '@/lib/supabase/types'

/**
 * EFT details as resolved from server environment variables. When `configured`
 * is false the UI shows no banking figures at all rather than placeholders.
 */
export type BankDetails = {
  configured: boolean
  fields: { label: string; value: string }[]
  referenceInstructions: string | null
}

/** The subset of the order the customer sees after checkout. */
export type PlacedOrder = {
  id: string
  order_number: string
  customer_name: string
  customer_address: string | null
  customer_city: string | null
  customer_postal_code: string | null
  items: OrderItemSnapshot[]
  subtotal: number
  shipping: number
  total: number
  status: string
  payment_method: string
  payment_status: string
  created_at: string
  /** Outcome of the confirmation email: sent, skipped or failed. */
  confirmation_email?: 'sent' | 'skipped' | 'failed'
}

export const LAST_ORDER_STORAGE_KEY = 'biana:last-order'

/**
 * The confirmation page reads the order the API returned rather than fetching
 * by order number. Order numbers are sequential, so GET /api/orders/[number]
 * also demands the customer's email; straight after checkout we already have
 * the authoritative figures and need neither.
 */
export function readStoredOrderJson(): string | null {
  try {
    return window.sessionStorage.getItem(LAST_ORDER_STORAGE_KEY)
  } catch {
    return null
  }
}

export function parseStoredOrder(
  raw: string | null | undefined,
  orderNumber: string | null
): PlacedOrder | null {
  if (!raw) return null

  try {
    const order = JSON.parse(raw) as PlacedOrder
    if (!order?.order_number) return null
    if (orderNumber && order.order_number !== orderNumber) return null
    return order
  } catch {
    return null
  }
}

export function storeOrder(order: PlacedOrder) {
  try {
    window.sessionStorage.setItem(LAST_ORDER_STORAGE_KEY, JSON.stringify(order))
  } catch {
    // Private browsing can refuse storage; the confirmation page then shows
    // the "order not found" state and the customer still has their email.
  }
}
