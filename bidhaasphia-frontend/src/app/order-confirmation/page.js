'use client'

import { useRouter } from 'next/navigation'

export default function OrderConfirmation() {
  const router = useRouter()

  return (
    <div className="bg-white shadow-md rounded-lg p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Order Placed Successfully!</h1>
      <p className="mb-6">Thank you for your order. We'll process it as soon as possible.</p>
      <button
        onClick={() => router.push('/')}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Back to Home
      </button>
    </div>
  )
}
