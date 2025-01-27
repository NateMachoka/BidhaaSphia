'use client'

import React, { Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { CheckCircle, XCircle } from 'lucide-react'

function OrderConfirmationContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const status = searchParams.get('status')

  const isOrderPlaced = status === 'placed'
  const title = isOrderPlaced ? 'Order Placed Successfully!' : 'Order Cancelled'
  const message = isOrderPlaced
    ? "Thank you for your order. We'll process it as soon as possible."
    : "Your order has been cancelled. If you have any questions, please contact our support team."
  const Icon = isOrderPlaced ? CheckCircle : XCircle

  return (
    <div className="container mx-auto p-4 flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardContent className="p-6 text-center">
          <Icon className={`mx-auto h-16 w-16 ${isOrderPlaced ? 'text-green-500' : 'text-red-500'}`} />
          <h1 className="text-2xl font-bold mt-4 mb-2">{title}</h1>
          <p className="text-gray-600 mb-6">{message}</p>
          <div className="space-y-2">
            <Button
              onClick={() => router.push('/order-history')}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              View Order History
            </Button>
            <Button
              onClick={() => router.push('/dashboard')}
              variant="outline"
              className="w-full"
            >
              Back to Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function OrderConfirmation() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderConfirmationContent />
    </Suspense>
  )
}
