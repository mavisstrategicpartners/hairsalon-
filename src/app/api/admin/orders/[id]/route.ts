import { recordAuditLog } from '@/lib/audit/log'
import { jsonError, jsonErrorFrom, jsonOk, readJsonBody } from '@/lib/api/respond'
import { requireAdmin } from '@/lib/auth/require-admin'
import { createSupabaseAdminClient } from '@/lib/supabase/admin'
import {
  isOrderStatus,
  isPaymentStatus,
  ORDER_STATUSES,
  PAYMENT_STATUSES,
  type OrderStatus,
  type PaymentStatus,
} from '@/lib/supabase/types'

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

type OrderLocator = { column: 'id' | 'order_number'; value: string }

/** Admins hold order ids internally but read order numbers off emails. */
function locateOrder(id: string): OrderLocator {
  return UUID_PATTERN.test(id)
    ? { column: 'id', value: id }
    : { column: 'order_number', value: id }
}

/** Admin order detail. */
export async function GET(_request: Request, ctx: RouteContext<'/api/admin/orders/[id]'>) {
  try {
    await requireAdmin()
    const { id } = await ctx.params
    const locator = locateOrder(id)

    const admin = createSupabaseAdminClient()
    const { data, error } = await admin
      .from('orders')
      .select('*')
      .eq(locator.column, locator.value)
      .maybeSingle()

    if (error) {
      return jsonError('Could not load order.', 502)
    }
    if (!data) {
      return jsonError('Order not found.', 404)
    }

    return jsonOk(data)
  } catch (error) {
    return jsonErrorFrom(error, 'Could not load order.')
  }
}

/**
 * Admin status transitions. Only `status` and `payment_status` are writable:
 * money and the captured customer details stay exactly as recorded at checkout.
 */
export async function PATCH(request: Request, ctx: RouteContext<'/api/admin/orders/[id]'>) {
  try {
    const actor = await requireAdmin()
    const { id } = await ctx.params
    const locator = locateOrder(id)
    const body = await readJsonBody(request)

    const patch: { status?: OrderStatus; payment_status?: PaymentStatus } = {}

    if ('status' in body) {
      if (!isOrderStatus(body.status)) {
        return jsonError(`"status" must be one of: ${ORDER_STATUSES.join(', ')}.`, 422)
      }
      patch.status = body.status
    }

    if ('payment_status' in body) {
      if (!isPaymentStatus(body.payment_status)) {
        return jsonError(`"payment_status" must be one of: ${PAYMENT_STATUSES.join(', ')}.`, 422)
      }
      patch.payment_status = body.payment_status
    }

    if (Object.keys(patch).length === 0) {
      return jsonError('Provide "status" and/or "payment_status".', 422)
    }

    const admin = createSupabaseAdminClient()

    // Read the current values first so the audit trail records the transition.
    const { data: before, error: beforeError } = await admin
      .from('orders')
      .select('id, order_number, status, payment_status')
      .eq(locator.column, locator.value)
      .maybeSingle()

    if (beforeError) {
      return jsonError('Could not load order.', 502)
    }
    if (!before) {
      return jsonError('Order not found.', 404)
    }

    const { data, error } = await admin
      .from('orders')
      .update(patch)
      .eq('id', before.id)
      .select('id, order_number, status, payment_status, updated_at')
      .maybeSingle()

    if (error) {
      if (error.code === '23514') {
        return jsonError('Order failed a database constraint.', 422, error.message)
      }
      return jsonError('Order could not be updated.', 502, error.message)
    }
    if (!data) {
      return jsonError('Order not found.', 404)
    }

    if (patch.status && patch.status !== before.status) {
      await recordAuditLog({
        actor,
        action: 'order.status_changed',
        entity: 'orders',
        entityId: data.id,
        details: {
          order_number: data.order_number,
          from: before.status,
          to: patch.status,
        },
      })
    }

    if (patch.payment_status && patch.payment_status !== before.payment_status) {
      await recordAuditLog({
        actor,
        action: 'order.payment_status_changed',
        entity: 'orders',
        entityId: data.id,
        details: {
          order_number: data.order_number,
          from: before.payment_status,
          to: patch.payment_status,
        },
      })
    }

    return jsonOk(data)
  } catch (error) {
    return jsonErrorFrom(error, 'Order could not be updated.')
  }
}
