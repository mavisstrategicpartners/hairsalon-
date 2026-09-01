'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getOrderById, updatePaymentStatus, sendPaymentConfirmationEmail } from '@/lib/orders'
import { CheckCircle, Clock, Truck, Package } from 'lucide-react'
import Link from 'next/link'

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [confirmingPayment, setConfirmingPayment] = useState(false)

  useEffect(() => {
    if (orderId) {
      const fetchedOrder = getOrderById(orderId)
      setOrder(fetchedOrder)
      setLoading(false)
    }
  }, [orderId])

  const handleConfirmPayment = () => {
    if (order) {
      setConfirmingPayment(true)
      // Simulate admin confirming payment
      setTimeout(() => {
        updatePaymentStatus(order.id, 'completed')
        sendPaymentConfirmationEmail(order)
        const updatedOrder = getOrderById(order.id)
        setOrder(updatedOrder)
        setConfirmingPayment(false)
      }, 1500)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <p>Loading order details...</p>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
          <Link href="/shop">
            <Button size="lg">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    )
  }

  const statusSteps = [
    { key: 'pending', label: 'Order Placed', icon: Package },
    { key: 'paid', label: 'Payment Confirmed', icon: CheckCircle },
    { key: 'processing', label: 'Processing', icon: Clock },
    { key: 'shipped', label: 'Shipped', icon: Truck },
    { key: 'delivered', label: 'Delivered', icon: CheckCircle }
  ]

  const getCurrentStepIndex = () => {
    if (order.status === 'pending') return 0
    if (order.status === 'paid') return 1
    if (order.status === 'processing') return 2
    if (order.status === 'shipped') return 3
    if (order.status === 'delivered') return 4
    return 0
  }

  const currentStep = getCurrentStepIndex()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="h-20 w-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">
            Order Placed Successfully!
          </h1>
          <p className="text-gray-600">
            Order Number: <span className="font-semibold">{order.orderNumber}</span>
          </p>
        </div>

        {/* Order Status Timeline */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Order Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              {statusSteps.map((step, index) => {
                const Icon = step.icon
                const isCompleted = index <= currentStep
                const isCurrent = index === currentStep
                
                return (
                  <div key={step.key} className="flex flex-col items-center flex-1">
                    <div
                      className={`h-12 w-12 rounded-full flex items-center justify-center mb-2 ${
                        isCompleted
                          ? 'bg-green-500 text-white'
                          : isCurrent
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <p
                      className={`text-xs text-center ${
                        isCompleted
                          ? 'text-green-600 font-medium'
                          : isCurrent
                          ? 'text-red-600 font-medium'
                          : 'text-gray-400'
                      }`}
                    >
                      {step.label}
                    </p>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Order Details */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Order Date</p>
                  <p className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Payment Status</p>
                  <p className={`font-medium ${order.paymentStatus === 'completed' ? 'text-green-600' : 'text-yellow-600'}`}>
                    {order.paymentStatus === 'completed' ? 'Paid' : 'Pending Payment'}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">Shipping Address</p>
                <p className="font-medium">{order.customerName}</p>
                <p className="text-gray-700">{order.customerAddress}</p>
                <p className="text-gray-700">
                  {order.customerCity}, {order.customerPostalCode}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">Items</p>
                <div className="space-y-2">
                  {order.items.map((item: any, index: number) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>
                        {item.name} x {item.quantity}
                        {item.length && <span className="text-gray-500 ml-2">({item.length})</span>}
                      </span>
                      <span>R{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">R{order.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {order.shipping === 0 ? 'Free' : `R${order.shipping.toLocaleString()}`}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t">
                  <span>Total</span>
                  <span className="text-red-600">R{order.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Information */}
        {order.paymentStatus !== 'completed' && (
          <Card className="mb-8 border-rose-200">
            <CardHeader>
              <CardTitle className="text-rose-900">Payment Required</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-rose-50 border border-rose-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-rose-700 mb-3">
                  Please complete your payment using the following bank details. Use your order number as reference.
                </p>
                <div className="text-sm text-rose-800 space-y-1">
                  <p><strong>Bank:</strong> First National Bank</p>
                  <p><strong>Account Name:</strong> Bianca's Hair</p>
                  <p><strong>Account Number:</strong> 1234567890</p>
                  <p><strong>Branch Code:</strong> 250655</p>
                  <p><strong>Reference:</strong> {order.orderNumber}</p>
                  <p><strong>Amount:</strong> R{order.total.toLocaleString()}</p>
                </div>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-yellow-800">
                  <strong>Admin Demo:</strong> Click the button below to simulate payment confirmation.
                  In production, this would be done automatically when payment is received.
                </p>
              </div>

              <Button
                onClick={handleConfirmPayment}
                disabled={confirmingPayment}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {confirmingPayment ? 'Confirming Payment...' : 'Confirm Payment (Admin Demo)'}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Next Steps */}
        {order.paymentStatus === 'completed' && (
          <Card className="mb-8 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-green-900 mb-2">Payment Confirmed!</h3>
                  <p className="text-sm text-green-700">
                    Your payment has been received and your order is now being processed. 
                    You will receive a shipping confirmation email once your order is on its way.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Continue Shopping */}
        <div className="text-center">
          <Link href="/shop">
            <Button size="lg" variant="outline" className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
