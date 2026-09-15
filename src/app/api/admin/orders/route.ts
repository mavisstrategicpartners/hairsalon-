import type { NextRequest } from 'next/server'
import { jsonError, jsonErrorFrom, jsonOk } from '@/lib/api/respond'
import { requireAdmin } from '@/lib/auth/require-admin'
import { createSupabaseAdminClient } from '@/lib/supabase/admin'
import {
  isOrderStatus,
  isPaymentStatus,
  ORDER_STATUSES,
  PAYMENT_STATUSES,
} from '@/lib/supabase/types'

const MAX_LIMIT = 100

/** Admin order list, newest first, optionally filtered by status. */
export async function GET(request: NextRequest) {
  try {
    await requireAdmin()

    const params = request.nextUrl.searchParams
    const status = params.get('status')
    const paymentStatus = params.get('payment_status')

    if (status !== null && !isOrderStatus(status)) {
      return jsonError(`Unknown status. Use one of: ${ORDER_STATUSES.join(', ')}.`, 400)
    }
    if (paymentStatus !== null && !isPaymentStatus(paymentStatus)) {
      return jsonError(`Unknown payment_status. Use one of: ${PAYMENT_STATUSES.join(', ')}.`, 400)
    }

    const requestedLimit = Number(params.get('limit') ?? MAX_LIMIT)
    const limit = Number.isFinite(requestedLimit)
      ? Math.min(Math.max(Math.trunc(requestedLimit), 1), MAX_LIMIT)
      : MAX_LIMIT

    const admin = createSupabaseAdminClient()
    let query = admin
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (status !== null) query = query.eq('status', status)
    if (paymentStatus !== null) query = query.eq('payment_status', paymentStatus)

    const { data, error } = await query
    if (error) {
      return jsonError('Could not load orders.', 502)
    }

    return jsonOk(data)
  } catch (error) {
    return jsonErrorFrom(error, 'Could not load orders.')
  }
}
