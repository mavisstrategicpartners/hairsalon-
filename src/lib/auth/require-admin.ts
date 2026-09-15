import 'server-only'

import { headers } from 'next/headers'
import type { User } from '@supabase/supabase-js'
import { createSupabaseAdminClient } from '@/lib/supabase/admin'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export type AdminActor = {
  id: string
  email: string | null
}

export class AuthorizationError extends Error {
  readonly status: 401 | 403

  constructor(status: 401 | 403, message: string) {
    super(message)
    this.name = 'AuthorizationError'
    this.status = status
  }
}

async function readBearerToken(): Promise<string | null> {
  try {
    const authorization = (await headers()).get('authorization')
    if (!authorization) return null
    const match = /^Bearer\s+(.+)$/i.exec(authorization.trim())
    return match ? match[1].trim() : null
  } catch {
    // No request scope, so no headers to read.
    return null
  }
}

/**
 * Staff may authenticate either with Supabase session cookies (a signed-in
 * browser) or with an `Authorization: Bearer <access token>` header, which is
 * what API clients and scripts use. Both paths validate the token with
 * Supabase Auth rather than decoding it locally.
 */
async function resolveUser(): Promise<User | null> {
  const token = await readBearerToken()

  if (token) {
    const { data, error } = await createSupabaseAdminClient().auth.getUser(token)
    return error ? null : data.user ?? null
  }

  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase.auth.getUser()
  return error ? null : data.user ?? null
}

/**
 * Authorises the current request as a Biana admin.
 *
 * The role is always read from the database with the service-role client; a
 * role claimed by the client is never trusted. Throws AuthorizationError with
 * 401 when there is no valid session and 403 when the user is not an admin.
 */
export async function requireAdmin(): Promise<AdminActor> {
  const user = await resolveUser()

  if (!user) {
    throw new AuthorizationError(401, 'Authentication required.')
  }

  const admin = createSupabaseAdminClient()
  const { data: role, error: roleError } = await admin
    .from('user_roles')
    .select('role')
    .eq('user_id', user.id)
    .eq('role', 'admin')
    .maybeSingle()

  if (roleError) {
    throw new AuthorizationError(403, 'Could not verify administrator access.')
  }

  if (!role) {
    throw new AuthorizationError(403, 'Administrator access required.')
  }

  return { id: user.id, email: user.email ?? null }
}
