import 'server-only'

import type { BankDetails } from '@/lib/commerce/eft'

function readOptional(name: string): string | null {
  const value = process.env[name]?.trim()
  return value ? value : null
}

/**
 * Biana's EFT account, read from server environment variables so the figures
 * are never baked into the client bundle or the repository.
 *
 * All four account fields must be present for the details to be shown. If any
 * is missing the caller gets `configured: false` and must not invent values —
 * the customer is told the details will follow instead.
 */
export function getBankDetails(): BankDetails {
  const bankName = readOptional('BANK_NAME')
  const accountName = readOptional('BANK_ACCOUNT_NAME')
  const accountNumber = readOptional('BANK_ACCOUNT_NUMBER')
  const branchCode = readOptional('BANK_BRANCH_CODE')
  const referenceInstructions = readOptional('BANK_REFERENCE_INSTRUCTIONS')

  const configured = Boolean(bankName && accountName && accountNumber && branchCode)

  if (!configured) {
    return { configured: false, fields: [], referenceInstructions }
  }

  return {
    configured: true,
    fields: [
      { label: 'Bank name', value: bankName! },
      { label: 'Account name', value: accountName! },
      { label: 'Account number', value: accountNumber! },
      { label: 'Branch code', value: branchCode! },
    ],
    referenceInstructions,
  }
}
