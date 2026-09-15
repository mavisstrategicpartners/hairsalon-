/**
 * Renders the order emails for a sample order without contacting Resend, so
 * the content and the banking behaviour can be checked before going live.
 *
 *   npx tsx --conditions=react-server scripts/preview-order-email.ts
 *   npx tsx --conditions=react-server scripts/preview-order-email.ts --html
 *
 * Banking figures only appear when BANK_NAME, BANK_ACCOUNT_NAME,
 * BANK_ACCOUNT_NUMBER and BANK_BRANCH_CODE are all set in the environment.
 */
import { buildAdminEmail, buildCustomerEmail } from '../src/lib/email/order-emails'
import type { OrderEmailOrder } from '../src/lib/email/order-emails'

const sample: OrderEmailOrder = {
  order_number: 'BH000042',
  customer_name: 'Naledi Mokoena',
  customer_email: 'naledi@example.com',
  customer_phone: '072 000 0000',
  customer_address: '12 Sandton Drive',
  customer_city: 'Johannesburg',
  customer_postal_code: '2196',
  items: [
    {
      product_id: '00000000-0000-0000-0000-000000000001',
      kind: 'product',
      slug: 'goldie-unit-14',
      name: '14" Goldie Body Wave Unit',
      unit_price: 3200,
      quantity: 2,
      line_total: 6400,
      length: '14"',
    },
    {
      product_id: null,
      kind: 'service',
      slug: 'closure-install',
      name: 'Closure Install',
      unit_price: 450,
      quantity: 1,
      line_total: 450,
      length: null,
    },
  ],
  subtotal: 6850,
  shipping: 0,
  total: 6850,
  status: 'pending',
  payment_method: 'eft',
  payment_status: 'pending',
}

const html = process.argv.includes('--html')
const customer = buildCustomerEmail(sample)
const admin = buildAdminEmail(sample)

console.log('=== CUSTOMER ===')
console.log('Subject:', customer.subject)
console.log(html ? customer.html : customer.text)
console.log()
console.log('=== ADMIN ===')
console.log('Subject:', admin.subject)
console.log(html ? admin.html : admin.text)
