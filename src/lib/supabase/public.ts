import { createClient } from '@supabase/supabase-js'
import { supabaseAnonKey, supabaseUrl } from '@/lib/supabase/env'
import type { Database } from '@/lib/supabase/types'

/**
 * Session-less anon client for reading the public catalogue. It carries no user
 * cookies, so it stays on the `anon` role and RLS limits it to active products.
 */
export function createSupabasePublicClient() {
  return createClient<Database>(supabaseUrl(), supabaseAnonKey(), {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  })
}
