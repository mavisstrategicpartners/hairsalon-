import 'server-only'

import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { supabaseServiceRoleKey, supabaseUrl } from '@/lib/supabase/env'
import type { Database } from '@/lib/supabase/types'

let cached: SupabaseClient<Database> | null = null

/**
 * Service-role client. Bypasses Row Level Security, so every caller must have
 * already authorised the request (see requireAdmin) or be performing a
 * deliberately public, server-validated action such as creating an order.
 *
 * The `server-only` import makes the build fail if this reaches a client bundle.
 */
export function createSupabaseAdminClient(): SupabaseClient<Database> {
  if (!cached) {
    cached = createClient<Database>(supabaseUrl(), supabaseServiceRoleKey(), {
      auth: { persistSession: false, autoRefreshToken: false },
    })
  }
  return cached
}
