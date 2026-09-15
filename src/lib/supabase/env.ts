/** Thrown when Supabase env vars are absent, so callers can answer 503. */
export class SupabaseConfigError extends Error {
  constructor(name: string) {
    super(`Missing environment variable ${name}. Copy .env.example to .env.local and fill it in.`)
    this.name = 'SupabaseConfigError'
  }
}

function read(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new SupabaseConfigError(name)
  }
  return value
}

export function supabaseUrl(): string {
  return read('NEXT_PUBLIC_SUPABASE_URL')
}

export function supabaseAnonKey(): string {
  return read('NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

/**
 * Server-only. Throws if bundled into client code, because the service-role key
 * bypasses Row Level Security and must never reach the browser.
 */
export function supabaseServiceRoleKey(): string {
  if (typeof window !== 'undefined') {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY must never be read in the browser.')
  }
  return read('SUPABASE_SERVICE_ROLE_KEY')
}

/** True when Supabase is configured, so callers can degrade gracefully. */
export function hasSupabaseConfig(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
}
