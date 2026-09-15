import 'server-only'

import { Resend } from 'resend'

/**
 * Resend configuration. All three variables are server-only: none is prefixed
 * with NEXT_PUBLIC_, so the API key can never reach the browser bundle.
 */
function readOptional(name: string): string | null {
  const value = process.env[name]?.trim()
  return value ? value : null
}

export function emailFrom(): string | null {
  return readOptional('RESEND_FROM')
}

/** Where new-order notifications go. Optional: without it, only the customer is emailed. */
export function adminOrderEmail(): string | null {
  return readOptional('ADMIN_ORDER_EMAIL')
}

export function isEmailConfigured(): boolean {
  return Boolean(readOptional('RESEND_API_KEY') && emailFrom())
}

let cached: Resend | null = null

/** Returns null when email is not configured, so callers can skip quietly. */
export function getResendClient(): Resend | null {
  const apiKey = readOptional('RESEND_API_KEY')
  if (!apiKey || !emailFrom()) return null
  if (!cached) cached = new Resend(apiKey)
  return cached
}
