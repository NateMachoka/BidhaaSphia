'use client'

import { useState, useEffect } from 'react'
import axiosInstance from '../utils/axiosInstance'

interface Order {
  _id: string
  totalPrice: number
  status: string
  createdAt: string
}

export default function OrderHistory() {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await axiosInstance.get('/orders/view', {
        withCredentials: true,
      })
      setOrders(response.data.data)
    } catch (error) {
      console.error('Error fetching orders:', error)
    }
  }

  const cancelOrder = async (orderId: string) => {
    try {
      await axiosInstance.patch(`/orders/cancel/${orderId}`, {
        reason: 'Customer request',
      }, {
        withCredentials: true,
      })
      fetchOrders() // Refresh orders after cancellation
    } catch (error) {
      console.error('Error cancelling order:', error)
    }
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Order History</h2>
      {orders.length === 0 ? (
        <p>You have no orders.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {orders.map((order) => (
            <li key={order._id} className="py-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-medium">Order ID: {order._id}</p>
                  <p className="text-gray-500">Total: ${order.totalPrice.toFixed(2)}</p>
                  <p className="text-gray-500">Status: {order.status}</p>
                  <p className="text-gray-500">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                {order.status === 'Pending' && (
                  <button
                    onClick={() => cancelOrder(order._id)}
                    className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
