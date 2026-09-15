import type { NextRequest } from 'next/server'
import { jsonError, jsonErrorFrom, jsonOk } from '@/lib/api/respond'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { isProductCategory, PRODUCT_CATEGORIES } from '@/lib/supabase/types'

const MAX_LIMIT = 100

const PUBLIC_COLUMNS =
  'id, slug, name, price, category, tag, image, description, length, lengths, specs, created_at'

/** Public catalogue listing. RLS restricts this to active products. */
export async function GET(request: NextRequest) {
  try {
    const params = request.nextUrl.searchParams
    const category = params.get('category')
    const requestedLimit = Number(params.get('limit') ?? MAX_LIMIT)
    const limit = Number.isFinite(requestedLimit)
      ? Math.min(Math.max(Math.trunc(requestedLimit), 1), MAX_LIMIT)
      : MAX_LIMIT

    if (category !== null && !isProductCategory(category)) {
      return jsonError(`Unknown category. Use one of: ${PRODUCT_CATEGORIES.join(', ')}.`, 400)
    }

    const supabase = await createSupabaseServerClient()
    let query = supabase
      .from('products')
      .select(PUBLIC_COLUMNS)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (category !== null) {
      query = query.eq('category', category)
    }

    const { data, error } = await query
    if (error) {
      return jsonError('Could not load products.', 502)
    }

    return jsonOk(data)
  } catch (error) {
    return jsonErrorFrom(error, 'Could not load products.')
  }
}

// Catalogue writes live under /api/admin/products so there is a single admin
// surface. This route is public and read-only.
