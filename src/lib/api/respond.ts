import 'server-only'

import { AuthorizationError } from '@/lib/auth/require-admin'
import { PricingError } from '@/lib/commerce/pricing'
import { SupabaseConfigError } from '@/lib/supabase/env'

export function jsonOk<T>(data: T, status = 200) {
  return Response.json({ data }, { status })
}

export function jsonError(message: string, status: number, details?: unknown) {
  return Response.json({ error: { message, details } }, { status })
}

/**
 * Maps thrown errors onto responses. Unexpected errors are logged server-side
 * and reported generically so internals are never leaked to the caller.
 */
export function jsonErrorFrom(error: unknown, fallbackMessage = 'Unexpected server error.') {
  if (error instanceof AuthorizationError) {
    return jsonError(error.message, error.status)
  }
  if (error instanceof PricingError) {
    return jsonError(error.message, 422)
  }
  if (error instanceof SupabaseConfigError) {
    // Names a missing variable, never a value.
    return jsonError('Supabase is not configured on the server.', 503, error.message)
  }
  console.error('[api]', error)
  return jsonError(fallbackMessage, 500)
}

export async function readJsonBody(request: Request): Promise<Record<string, unknown>> {
  try {
    const body = await request.json()
    if (typeof body !== 'object' || body === null || Array.isArray(body)) {
      throw new Error('not an object')
    }
    return body as Record<string, unknown>
  } catch {
    throw new PricingError('Request body must be a JSON object.')
  }
}
