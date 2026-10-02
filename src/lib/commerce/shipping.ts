/** Every order ships with PostNet; there is no free-delivery threshold. */
export const POSTNET_FEE = 120

export const DELIVERY_LABEL = 'PostNet'

export function shippingFor(subtotal: number): number {
  return subtotal > 0 ? POSTNET_FEE : 0
}
