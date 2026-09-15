import { recordAuditLog } from '@/lib/audit/log'
import { jsonError, jsonErrorFrom, jsonOk, readJsonBody } from '@/lib/api/respond'
import { normaliseRequestedLines, priceOrder, PricingError } from '@/lib/commerce/pricing'
import { sendOrderEmails } from '@/lib/email/order-emails'
import { createSupabaseAdminClient } from '@/lib/supabase/admin'

function requireField(body: Record<string, unknown>, field: string, max = 200): string {
  const value = body[field]
  if (typeof value !== 'string' || !value.trim()) {
    throw new PricingError(`"${field}" is required.`)
  }
  const trimmed = value.trim()
  if (trimmed.length > max) {
    throw new PricingError(`"${field}" must be ${max} characters or fewer.`)
  }
  return trimmed
}

function optionalField(body: Record<string, unknown>, field: string, max = 200): string | null {
  const value = body[field]
  if (value === undefined || value === null || value === '') return null
  if (typeof value !== 'string') {
    throw new PricingError(`"${field}" must be a string.`)
  }
  const trimmed = value.trim()
  if (trimmed.length > max) {
    throw new PricingError(`"${field}" must be ${max} characters or fewer.`)
  }
  return trimmed || null
}

/**
 * Guest checkout. Open to the public, but the client only chooses *what* to buy:
 * quantities and slugs. Prices, subtotal, shipping and total are recalculated
 * from Supabase, and status/payment_status are forced to their initial values.
 */
export async function POST(request: Request) {
  try {
    const body = await readJsonBody(request)

    const customerEmail = requireField(body, 'customer_email', 320)
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(customerEmail)) {
      throw new PricingError('"customer_email" must be a valid email address.')
    }

    const paymentMethod = (body.payment_method ?? 'eft') as unknown
    if (paymentMethod !== 'eft') {
      throw new PricingError('Only EFT payment is supported.')
    }

    const lines = normaliseRequestedLines(body.items)
    const priced = await priceOrder(lines)

    const admin = createSupabaseAdminClient()
    const { data, error } = await admin
      .from('orders')
      .insert({
        customer_name: requireField(body, 'customer_name'),
        customer_email: customerEmail,
        customer_phone: optionalField(body, 'customer_phone', 40),
        customer_address: optionalField(body, 'customer_address', 500),
        customer_city: optionalField(body, 'customer_city'),
        customer_postal_code: optionalField(body, 'customer_postal_code', 20),
        items: priced.items,
        subtotal: priced.subtotal,
        shipping: priced.shipping,
        total: priced.total,
        payment_method: 'eft',
        // status and payment_status intentionally omitted: the database
        // defaults them to 'pending' and clients may not set them.
      })
      .select(
        'id, order_number, customer_name, customer_email, customer_phone, customer_address, customer_city, customer_postal_code, items, subtotal, shipping, total, status, payment_method, payment_status, created_at'
      )
      .single()

    if (error) {
      // This endpoint is public, so the database message stays in the server
      // log rather than being echoed back with constraint and column names.
      console.error('[orders] insert failed', error.code, error.message)
      if (error.code === '23514' || error.code === '23502') {
        return jsonError('Order failed validation. Please check your details and try again.', 422)
      }
      return jsonError('Order could not be placed.', 502)
    }

    await recordAuditLog({
      action: 'order.created',
      entity: 'orders',
      entityId: data.id,
      details: {
        order_number: data.order_number,
        total: data.total,
        line_count: priced.items.length,
      },
    })

    // The order is already committed. sendOrderEmails never throws, so a mail
    // outage degrades to a logged warning instead of losing the order.
    const emails = await sendOrderEmails(data)

    // Returned to the customer who just placed the order: their own delivery
    // details plus the server-calculated money. No other order is readable.
    return jsonOk(
      {
        id: data.id,
        order_number: data.order_number,
        customer_name: data.customer_name,
        customer_address: data.customer_address,
        customer_city: data.customer_city,
        customer_postal_code: data.customer_postal_code,
        items: data.items,
        subtotal: data.subtotal,
        shipping: data.shipping,
        total: data.total,
        status: data.status,
        payment_method: data.payment_method,
        payment_status: data.payment_status,
        created_at: data.created_at,
        confirmation_email: emails.customer,
      },
      201
    )
  } catch (error) {
    return jsonErrorFrom(error, 'Order could not be placed.')
  }
}

// Order listing lives at GET /api/admin/orders so there is a single admin
// surface. This route is public and only accepts order creation.
