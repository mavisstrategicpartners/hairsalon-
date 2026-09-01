export interface Order {
  id: string
  customerName: string
  customerEmail: string
  customerPhone: string
  customerAddress: string
  customerCity: string
  customerPostalCode: string
  items: OrderItem[]
  subtotal: number
  shipping: number
  total: number
  status: 'pending' | 'processing' | 'paid' | 'shipped' | 'delivered'
  paymentMethod: 'eft' | 'card'
  paymentStatus: 'pending' | 'completed'
  createdAt: Date
  updatedAt: Date
  orderNumber: string
}

export interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  length?: string
  type?: string
}

// Simulated order storage (in production, this would be a database)
let orders: Order[] = []

export function generateOrderNumber(): string {
  const timestamp = Date.now().toString().slice(-6)
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  return `BH${timestamp}${random}`
}

export function createOrder(orderData: Omit<Order, 'id' | 'status' | 'paymentStatus' | 'createdAt' | 'updatedAt' | 'orderNumber'>): Order {
  const order: Order = {
    ...orderData,
    id: crypto.randomUUID(),
    status: 'pending',
    paymentStatus: 'pending',
    createdAt: new Date(),
    updatedAt: new Date(),
    orderNumber: generateOrderNumber()
  }
  
  orders.push(order)
  return order
}

export function getOrderById(orderId: string): Order | undefined {
  return orders.find(order => order.id === orderId)
}

export function getOrderByOrderNumber(orderNumber: string): Order | undefined {
  return orders.find(order => order.orderNumber === orderNumber)
}

export function updateOrderStatus(orderId: string, status: Order['status']): Order | undefined {
  const order = getOrderById(orderId)
  if (order) {
    order.status = status
    order.updatedAt = new Date()
    return order
  }
  return undefined
}

export function updatePaymentStatus(orderId: string, paymentStatus: Order['paymentStatus']): Order | undefined {
  const order = getOrderById(orderId)
  if (order) {
    order.paymentStatus = paymentStatus
    if (paymentStatus === 'completed') {
      order.status = 'paid'
    }
    order.updatedAt = new Date()
    return order
  }
  return undefined
}

export function getOrdersByEmail(email: string): Order[] {
  return orders.filter(order => order.customerEmail === email)
}

// Simulated email notification
export function sendOrderConfirmationEmail(order: Order): void {
  console.log('=== ORDER CONFIRMATION EMAIL ===')
  console.log(`To: ${order.customerEmail}`)
  console.log(`Subject: Order Confirmation - ${order.orderNumber}`)
  console.log('\nDear ' + order.customerName + ',')
  console.log('\nThank you for your order!')
  console.log(`Order Number: ${order.orderNumber}`)
  console.log(`Order Date: ${order.createdAt.toLocaleDateString()}`)
  console.log('\nOrder Details:')
  order.items.forEach(item => {
    console.log(`- ${item.name} x${item.quantity} - R${(item.price * item.quantity).toLocaleString()}`)
  })
  console.log(`\nSubtotal: R${order.subtotal.toLocaleString()}`)
  console.log(`Shipping: R${order.shipping.toLocaleString()}`)
  console.log(`Total: R${order.total.toLocaleString()}`)
  console.log('\nPayment Method: ' + (order.paymentMethod === 'eft' ? 'EFT / Bank Transfer' : 'Card Payment'))
  console.log('\nPlease make payment to:')
  console.log('Bank: First National Bank')
  console.log('Account Name: Bianca\'s Hair')
  console.log('Account Number: 1234567890')
  console.log('Branch Code: 250655')
  console.log('Reference: ' + order.orderNumber)
  console.log('\nOnce payment is confirmed, we will process your order immediately.')
  console.log('\nThank you for choosing Bianca\'s Hair!')
  console.log('================================\n')
}

export function sendPaymentConfirmationEmail(order: Order): void {
  console.log('=== PAYMENT CONFIRMATION EMAIL ===')
  console.log(`To: ${order.customerEmail}`)
  console.log(`Subject: Payment Confirmed - ${order.orderNumber}`)
  console.log('\nDear ' + order.customerName + ',')
  console.log('\nGreat news! Your payment has been confirmed.')
  console.log(`Order Number: ${order.orderNumber}`)
  console.log(`Payment Date: ${new Date().toLocaleDateString()}`)
  console.log(`Amount Paid: R${order.total.toLocaleString()}`)
  console.log('\nYour order is now being processed and will be shipped soon.')
  console.log('You will receive another notification when your order ships.')
  console.log('\nThank you for your payment!')
  console.log('================================\n')
}

export function sendShippingConfirmationEmail(order: Order): void {
  console.log('=== SHIPPING CONFIRMATION EMAIL ===')
  console.log(`To: ${order.customerEmail}`)
  console.log(`Subject: Your Order Has Shipped - ${order.orderNumber}`)
  console.log('\nDear ' + order.customerName + ',')
  console.log('\nYour order has been shipped!')
  console.log(`Order Number: ${order.orderNumber}`)
  console.log(`Shipping Date: ${new Date().toLocaleDateString()}`)
  console.log('\nYour package is on its way to:')
  console.log(order.customerAddress)
  console.log(order.customerCity + ', ' + order.customerPostalCode)
  console.log('\nThank you for shopping with Bianca\'s Hair!')
  console.log('================================\n')
}
