import 'server-only'

import { createSupabaseAdminClient } from '@/lib/supabase/admin'
import type { AdminActor } from '@/lib/auth/require-admin'
import type { Json } from '@/lib/supabase/types'

type AuditEntry = {
  actor?: AdminActor | null
  action: string
  entity: string
  entityId?: string | null
  details?: Record<string, Json>
}

/**
 * Appends an admin action to audit_logs. Never throws: a failed audit write
 * must not roll back or mask the operation the admin actually performed.
 */
export async function recordAuditLog(entry: AuditEntry): Promise<void> {
  try {
    const admin = createSupabaseAdminClient()
    await admin.from('audit_logs').insert({
      actor_id: entry.actor?.id ?? null,
      actor_email: entry.actor?.email ?? null,
      action: entry.action,
      entity: entry.entity,
      entity_id: entry.entityId ?? null,
      details: entry.details ?? {},
    })
  } catch (error) {
    console.error('[audit] failed to record entry', entry.action, error)
  }
}
