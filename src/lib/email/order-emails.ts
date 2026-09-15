import 'server-only'

import { getBankDetails } from '@/lib/commerce/bank'
import { adminOrderEmail, emailFrom, getResendClient } from '@/lib/email/resend'
import type { OrderItemSnapshot, OrderRow } from '@/lib/supabase/types'

export type OrderEmailOrder = Pick<
  OrderRow,
  | 'order_number'
  | 'customer_name'
  | 'customer_email'
  | 'customer_phone'
  | 'customer_address'
  | 'customer_city'
  | 'customer_postal_code'
  | 'items'
  | 'subtotal'
  | 'shipping'
  | 'total'
  | 'status'
  | 'payment_method'
  | 'payment_status'
>

type Delivery = 'sent' | 'skipped' | 'failed'

export type OrderEmailResult = {
  customer: Delivery
  admin: Delivery
}

const PAYMENT_METHOD_LABELS: Record<string, string> = {
  eft: 'EFT / bank transfer',
}

const formatMoney = (value: number) =>
  `R${Number(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const itemLabel = (item: OrderItemSnapshot) =>
  item.length ? `${item.name} (${item.length})` : item.name

function itemRowsHtml(items: OrderItemSnapshot[]) {
  return items
    .map(
      (item) => `
        <tr>
          <td style="padding:8px 0;border-bottom:1px solid #e7e2d8;">
            ${escapeHtml(itemLabel(item))}
            <span style="color:#6b6257;">&times; ${item.quantity}</span>
            <br />
            <span style="color:#6b6257;font-size:12px;">${formatMoney(item.unit_price)} each</span>
          </td>
          <td style="padding:8px 0;border-bottom:1px solid #e7e2d8;text-align:right;white-space:nowrap;">
            ${formatMoney(item.line_total)}
          </td>
        </tr>`
    )
    .join('')
}

function itemRowsText(items: OrderItemSnapshot[]) {
  return items
    .map(
      (item) =>
        `- ${itemLabel(item)} x${item.quantity} @ ${formatMoney(item.unit_price)} = ${formatMoney(item.line_total)}`
    )
    .join('\n')
}

function totalsHtml(order: OrderEmailOrder) {
  return `
    <tr>
      <td style="padding:8px 0;">Subtotal</td>
      <td style="padding:8px 0;text-align:right;">${formatMoney(order.subtotal)}</td>
    </tr>
    <tr>
      <td style="padding:8px 0;">Shipping</td>
      <td style="padding:8px 0;text-align:right;">${
        Number(order.shipping) === 0 ? 'Free' : formatMoney(order.shipping)
      }</td>
    </tr>
    <tr>
      <td style="padding:12px 0 0;border-top:1px solid #1a1208;font-weight:700;">Total</td>
      <td style="padding:12px 0 0;border-top:1px solid #1a1208;text-align:right;font-weight:700;">
        ${formatMoney(order.total)}
      </td>
    </tr>`
}

/**
 * EFT instructions are only included while payment is outstanding. If the bank
 * account is not configured no figures are shown — we never invent details.
 */
function eftSectionHtml(order: OrderEmailOrder) {
  if (order.payment_method !== 'eft' || order.payment_status === 'completed') return ''

  const bank = getBankDetails()
  const reference =
    bank.referenceInstructions ?? `Use ${order.order_number} as your payment reference.`

  if (!bank.configured) {
    return `
      <h2 style="font-size:16px;margin:32px 0 8px;">Payment</h2>
      <p style="margin:0;color:#3f3931;">
        Your banking details will follow in a separate message. ${escapeHtml(reference)}
      </p>`
  }

  const rows = bank.fields
    .map(
      (field) => `
        <tr>
          <td style="padding:6px 0;color:#6b6257;">${escapeHtml(field.label)}</td>
          <td style="padding:6px 0;text-align:right;">${escapeHtml(field.value)}</td>
        </tr>`
    )
    .join('')

  return `
    <h2 style="font-size:16px;margin:32px 0 8px;">Payment by EFT</h2>
    <table role="presentation" width="100%" style="border-collapse:collapse;font-size:14px;">
      ${rows}
      <tr>
        <td style="padding:6px 0;color:#6b6257;">Payment reference</td>
        <td style="padding:6px 0;text-align:right;">${escapeHtml(order.order_number)}</td>
      </tr>
      <tr>
        <td style="padding:6px 0;color:#6b6257;">Amount due</td>
        <td style="padding:6px 0;text-align:right;">${formatMoney(order.total)}</td>
      </tr>
    </table>
    <p style="margin:12px 0 0;color:#3f3931;">${escapeHtml(reference)}</p>`
}

function eftSectionText(order: OrderEmailOrder) {
  if (order.payment_method !== 'eft' || order.payment_status === 'completed') return ''

  const bank = getBankDetails()
  const reference =
    bank.referenceInstructions ?? `Use ${order.order_number} as your payment reference.`

  if (!bank.configured) {
    return `\nPayment\nYour banking details will follow in a separate message. ${reference}\n`
  }

  const lines = bank.fields.map((field) => `${field.label}: ${field.value}`).join('\n')
  return `\nPayment by EFT\n${lines}\nPayment reference: ${order.order_number}\nAmount due: ${formatMoney(order.total)}\n${reference}\n`
}

/** Exported so the templates can be previewed without sending anything. */
export function buildCustomerEmail(order: OrderEmailOrder) {
  const paymentLabel = PAYMENT_METHOD_LABELS[order.payment_method] ?? order.payment_method
  const paymentState = order.payment_status === 'completed' ? 'Paid' : 'Awaiting payment'

  const html = `<!doctype html>
<html>
  <body style="margin:0;background:#f7f4ee;font-family:Helvetica,Arial,sans-serif;color:#1a1208;">
    <div style="max-width:600px;margin:0 auto;padding:32px 24px;background:#ffffff;">
      <p style="margin:0;letter-spacing:0.18em;text-transform:uppercase;font-size:11px;color:#8a6820;">
        Biana HAIR
      </p>
      <h1 style="font-size:24px;margin:16px 0 4px;">Thank you, ${escapeHtml(order.customer_name)}</h1>
      <p style="margin:0;color:#3f3931;font-size:14px;">
        Your order <strong>${escapeHtml(order.order_number)}</strong> has been received.
      </p>

      <h2 style="font-size:16px;margin:32px 0 8px;">Your order</h2>
      <table role="presentation" width="100%" style="border-collapse:collapse;font-size:14px;">
        ${itemRowsHtml(order.items)}
        ${totalsHtml(order)}
      </table>

      <h2 style="font-size:16px;margin:32px 0 8px;">Payment status</h2>
      <table role="presentation" width="100%" style="border-collapse:collapse;font-size:14px;">
        <tr>
          <td style="padding:6px 0;color:#6b6257;">Payment method</td>
          <td style="padding:6px 0;text-align:right;">${escapeHtml(paymentLabel)}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#6b6257;">Payment status</td>
          <td style="padding:6px 0;text-align:right;">${paymentState}</td>
        </tr>
      </table>

      ${eftSectionHtml(order)}

      <p style="margin:32px 0 0;color:#6b6257;font-size:12px;">
        Biana HAIR &middot; 46 Plein Street, Johannesburg
      </p>
    </div>
  </body>
</html>`

  const text = `Biana HAIR

Thank you, ${order.customer_name}
Your order ${order.order_number} has been received.

Your order
${itemRowsText(order.items)}

Subtotal: ${formatMoney(order.subtotal)}
Shipping: ${Number(order.shipping) === 0 ? 'Free' : formatMoney(order.shipping)}
Total: ${formatMoney(order.total)}

Payment method: ${paymentLabel}
Payment status: ${paymentState}
${eftSectionText(order)}
Biana HAIR - 46 Plein Street, Johannesburg`

  return { subject: `Biana HAIR — order ${order.order_number}`, html, text }
}

export function buildAdminEmail(order: OrderEmailOrder) {
  const address = [order.customer_address, order.customer_city, order.customer_postal_code]
    .filter(Boolean)
    .join(', ')

  const html = `<!doctype html>
<html>
  <body style="margin:0;font-family:Helvetica,Arial,sans-serif;color:#1a1208;">
    <div style="max-width:600px;margin:0 auto;padding:24px;">
      <h1 style="font-size:20px;margin:0 0 4px;">New order ${escapeHtml(order.order_number)}</h1>
      <p style="margin:0 0 16px;color:#3f3931;font-size:14px;">
        ${formatMoney(order.total)} &middot; ${escapeHtml(order.payment_method)} &middot;
        payment ${escapeHtml(order.payment_status)} &middot; order ${escapeHtml(order.status)}
      </p>

      <table role="presentation" width="100%" style="border-collapse:collapse;font-size:14px;">
        <tr>
          <td style="padding:6px 0;color:#6b6257;">Customer</td>
          <td style="padding:6px 0;text-align:right;">${escapeHtml(order.customer_name)}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#6b6257;">Email</td>
          <td style="padding:6px 0;text-align:right;">${escapeHtml(order.customer_email)}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#6b6257;">Phone</td>
          <td style="padding:6px 0;text-align:right;">${escapeHtml(order.customer_phone ?? '—')}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#6b6257;">Deliver to</td>
          <td style="padding:6px 0;text-align:right;">${escapeHtml(address || '—')}</td>
        </tr>
      </table>

      <h2 style="font-size:16px;margin:24px 0 8px;">Items</h2>
      <table role="presentation" width="100%" style="border-collapse:collapse;font-size:14px;">
        ${itemRowsHtml(order.items)}
        ${totalsHtml(order)}
      </table>
    </div>
  </body>
</html>`

  const text = `New order ${order.order_number}
${formatMoney(order.total)} | ${order.payment_method} | payment ${order.payment_status} | order ${order.status}

Customer: ${order.customer_name}
Email: ${order.customer_email}
Phone: ${order.customer_phone ?? '-'}
Deliver to: ${address || '-'}

Items
${itemRowsText(order.items)}

Subtotal: ${formatMoney(order.subtotal)}
Shipping: ${Number(order.shipping) === 0 ? 'Free' : formatMoney(order.shipping)}
Total: ${formatMoney(order.total)}`

  return {
    subject: `New Biana order ${order.order_number} — ${formatMoney(order.total)}`,
    html,
    text,
  }
}

/**
 * Sends the customer confirmation and the admin notification.
 *
 * Never throws and never reports failure to the caller as an error: the order
 * is already committed in Supabase and must survive any email problem. Failures
 * are logged without the API key or message bodies.
 */
export async function sendOrderEmails(order: OrderEmailOrder): Promise<OrderEmailResult> {
  const result: OrderEmailResult = { customer: 'skipped', admin: 'skipped' }

  const resend = getResendClient()
  const from = emailFrom()
  if (!resend || !from) {
    console.warn('[email] Resend is not configured; order emails skipped')
    return result
  }

  const customer = buildCustomerEmail(order)
  try {
    const { error } = await resend.emails.send({
      from,
      to: order.customer_email,
      subject: customer.subject,
      html: customer.html,
      text: customer.text,
      replyTo: adminOrderEmail() ?? undefined,
    })
    result.customer = error ? 'failed' : 'sent'
    if (error) console.error('[email] customer confirmation failed:', error.message)
  } catch (error) {
    result.customer = 'failed'
    console.error('[email] customer confirmation threw:', (error as Error).message)
  }

  const adminTo = adminOrderEmail()
  if (adminTo) {
    const notification = buildAdminEmail(order)
    try {
      const { error } = await resend.emails.send({
        from,
        to: adminTo,
        subject: notification.subject,
        html: notification.html,
        text: notification.text,
        replyTo: order.customer_email,
      })
      result.admin = error ? 'failed' : 'sent'
      if (error) console.error('[email] admin notification failed:', error.message)
    } catch (error) {
      result.admin = 'failed'
      console.error('[email] admin notification threw:', (error as Error).message)
    }
  }

  return result
}
