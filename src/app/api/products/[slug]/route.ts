import { jsonError, jsonErrorFrom, jsonOk } from '@/lib/api/respond'
import { createSupabaseServerClient } from '@/lib/supabase/server'

const PUBLIC_COLUMNS =
  'id, slug, name, price, category, tag, image, description, length, lengths, specs, created_at'

/** Public product detail. RLS hides inactive products. */
export async function GET(_request: Request, ctx: RouteContext<'/api/products/[slug]'>) {
  try {
    const { slug } = await ctx.params
    const supabase = await createSupabaseServerClient()

    const { data, error } = await supabase
      .from('products')
      .select(PUBLIC_COLUMNS)
      .eq('slug', slug)
      .maybeSingle()

    if (error) {
      return jsonError('Could not load product.', 502)
    }
    if (!data) {
      return jsonError('Product not found.', 404)
    }

    return jsonOk(data)
  } catch (error) {
    return jsonErrorFrom(error, 'Could not load product.')
  }
}

// Updates and deletes live at /api/admin/products/[id], which requires an
// authenticated admin. This route is public and read-only.
