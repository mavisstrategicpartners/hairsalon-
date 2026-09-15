import type { NextRequest } from 'next/server'
import { jsonError, jsonErrorFrom, jsonOk } from '@/lib/api/respond'
import { createSupabaseAdminClient } from '@/lib/supabase/admin'
import type { OrderItemSnapshot } from '@/lib/supabase/types'

/**
 * Customer-facing order lookup.
 *
 * Order numbers are sequential, so the number alone is not a secret. The
 * caller must also supply the email the order was placed with:
 *
 *   GET /api/orders/BH000123?email=customer@example.com
 *
 * A wrong email and a non-existent order both answer 404, so this cannot be
 * used to discover which order numbers exist. The response carries only what a
 * customer needs to track their own order — no ids, no audit data, no admin
 * fields. There is no write path here; status changes are admin-only via
 * PATCH /api/admin/orders/[id].
 */
export async function GET(request: NextRequest, ctx: RouteContext<'/api/orders/[orderNumber]'>) {
  try {
    const { orderNumber } = await ctx.params
    const email = request.nextUrl.searchParams.get('email')?.trim().toLowerCase()

    if (!email) {
      return jsonError('An "email" query parameter is required to view an order.', 400)
    }

    const admin = createSupabaseAdminClient()
    const { data, error } = await admin
      .from('orders')
      .select(
        'order_number, customer_name, customer_email, items, subtotal, shipping, total, status, payment_method, payment_status, created_at'
      )
      .eq('order_number', orderNumber)
      .maybeSingle()

    if (error) {
      return jsonError('Could not load order.', 502)
    }

    // Same answer whether the order is missing or the email does not match.
    if (!data || data.customer_email.trim().toLowerCase() !== email) {
      return jsonError('Order not found.', 404)
    }

    const items = (data.items ?? []).map((item: OrderItemSnapshot) => ({
      slug: item.slug,
      name: item.name,
      kind: item.kind,
      length: item.length,
      quantity: item.quantity,
      unit_price: item.unit_price,
      line_total: item.line_total,
    }))

    return jsonOk({
      order_number: data.order_number,
      customer_name: data.customer_name,
      items,
      subtotal: data.subtotal,
      shipping: data.shipping,
      total: data.total,
      status: data.status,
      payment_method: data.payment_method,
      payment_status: data.payment_status,
      created_at: data.created_at,
    })
  } catch (error) {
    return jsonErrorFrom(error, 'Could not load order.')
  }
}
