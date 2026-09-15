import { recordAuditLog } from '@/lib/audit/log'
import { jsonError, jsonErrorFrom, jsonOk, readJsonBody } from '@/lib/api/respond'
import { requireAdmin } from '@/lib/auth/require-admin'
import { parseProductUpdate } from '@/lib/commerce/product-input'
import { createSupabaseAdminClient } from '@/lib/supabase/admin'

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

/** Admin product update, addressed by product id. */
export async function PATCH(request: Request, ctx: RouteContext<'/api/admin/products/[id]'>) {
  try {
    const actor = await requireAdmin()
    const { id } = await ctx.params
    if (!UUID_PATTERN.test(id)) {
      return jsonError('Product id must be a UUID.', 400)
    }

    const patch = parseProductUpdate(await readJsonBody(request))

    const admin = createSupabaseAdminClient()
    const { data, error } = await admin
      .from('products')
      .update(patch)
      .eq('id', id)
      .select()
      .maybeSingle()

    if (error) {
      if (error.code === '23505') {
        return jsonError('A product with that slug already exists.', 409)
      }
      if (error.code === '23514' || error.code === '23502') {
        return jsonError('Product failed a database constraint.', 422, error.message)
      }
      return jsonError('Product could not be updated.', 502, error.message)
    }
    if (!data) {
      return jsonError('Product not found.', 404)
    }

    await recordAuditLog({
      actor,
      action: 'product.updated',
      entity: 'products',
      entityId: data.id,
      details: { slug: data.slug, changed: Object.keys(patch) },
    })

    return jsonOk(data)
  } catch (error) {
    return jsonErrorFrom(error, 'Product could not be updated.')
  }
}

/**
 * Retires a product. Defaults to a soft delete (active = false) so historic
 * orders keep referring to a product that still exists.
 * Pass ?hard=true to remove the row outright.
 */
export async function DELETE(request: Request, ctx: RouteContext<'/api/admin/products/[id]'>) {
  try {
    const actor = await requireAdmin()
    const { id } = await ctx.params
    if (!UUID_PATTERN.test(id)) {
      return jsonError('Product id must be a UUID.', 400)
    }

    const hard = new URL(request.url).searchParams.get('hard') === 'true'
    const admin = createSupabaseAdminClient()

    if (hard) {
      const { data, error } = await admin
        .from('products')
        .delete()
        .eq('id', id)
        .select('id, slug')
        .maybeSingle()

      if (error) {
        return jsonError('Product could not be deleted.', 502, error.message)
      }
      if (!data) {
        return jsonError('Product not found.', 404)
      }

      await recordAuditLog({
        actor,
        action: 'product.deleted',
        entity: 'products',
        entityId: data.id,
        details: { slug: data.slug, mode: 'hard' },
      })

      return jsonOk({ id: data.id, slug: data.slug, deleted: true })
    }

    const { data, error } = await admin
      .from('products')
      .update({ active: false })
      .eq('id', id)
      .select('id, slug, active')
      .maybeSingle()

    if (error) {
      return jsonError('Product could not be deactivated.', 502, error.message)
    }
    if (!data) {
      return jsonError('Product not found.', 404)
    }

    await recordAuditLog({
      actor,
      action: 'product.deactivated',
      entity: 'products',
      entityId: data.id,
      details: { slug: data.slug, mode: 'soft' },
    })

    return jsonOk(data)
  } catch (error) {
    return jsonErrorFrom(error, 'Product could not be deleted.')
  }
}
