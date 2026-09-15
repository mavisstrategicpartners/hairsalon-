import type { NextRequest } from 'next/server'
import { recordAuditLog } from '@/lib/audit/log'
import { jsonError, jsonErrorFrom, jsonOk, readJsonBody } from '@/lib/api/respond'
import { requireAdmin } from '@/lib/auth/require-admin'
import { parseProductCreate } from '@/lib/commerce/product-input'
import { createSupabaseAdminClient } from '@/lib/supabase/admin'
import { isProductCategory, PRODUCT_CATEGORIES } from '@/lib/supabase/types'

const MAX_LIMIT = 200

/**
 * Admin catalogue listing. Unlike the public route this uses the service-role
 * client, so inactive products are visible for editing.
 */
export async function GET(request: NextRequest) {
  try {
    await requireAdmin()

    const params = request.nextUrl.searchParams
    const category = params.get('category')
    const active = params.get('active')

    if (category !== null && !isProductCategory(category)) {
      return jsonError(`Unknown category. Use one of: ${PRODUCT_CATEGORIES.join(', ')}.`, 400)
    }
    if (active !== null && active !== 'true' && active !== 'false') {
      return jsonError('"active" must be true or false.', 400)
    }

    const requestedLimit = Number(params.get('limit') ?? MAX_LIMIT)
    const limit = Number.isFinite(requestedLimit)
      ? Math.min(Math.max(Math.trunc(requestedLimit), 1), MAX_LIMIT)
      : MAX_LIMIT

    const admin = createSupabaseAdminClient()
    let query = admin
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (category !== null) query = query.eq('category', category)
    if (active !== null) query = query.eq('active', active === 'true')

    const { data, error } = await query
    if (error) {
      return jsonError('Could not load products.', 502)
    }

    return jsonOk(data)
  } catch (error) {
    return jsonErrorFrom(error, 'Could not load products.')
  }
}

/** Admin product creation. Categories are restricted to the five hair types. */
export async function POST(request: Request) {
  try {
    const actor = await requireAdmin()
    const payload = parseProductCreate(await readJsonBody(request))

    const admin = createSupabaseAdminClient()
    const { data, error } = await admin.from('products').insert(payload).select().single()

    if (error) {
      if (error.code === '23505') {
        return jsonError('A product with that slug already exists.', 409)
      }
      if (error.code === '23514' || error.code === '23502') {
        return jsonError('Product failed a database constraint.', 422, error.message)
      }
      return jsonError('Product could not be created.', 502, error.message)
    }

    await recordAuditLog({
      actor,
      action: 'product.created',
      entity: 'products',
      entityId: data.id,
      details: { slug: data.slug, price: data.price, category: data.category },
    })

    return jsonOk(data, 201)
  } catch (error) {
    return jsonErrorFrom(error, 'Product could not be created.')
  }
}
