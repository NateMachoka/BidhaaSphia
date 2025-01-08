'use client'

import { useState, useEffect } from 'react'
import axiosInstance from '../utils/axiosInstance'
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { toast } from 'react-hot-toast'
import { Loader2 } from 'lucide-react'

export default function OrderHistory() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const response = await axiosInstance.get('/orders/view', {
        withCredentials: true,
      })
      setOrders(response.data.data)
    } catch (error) {
      console.error('Error fetching orders:', error)
      toast.error('Failed to fetch orders. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const cancelOrder = async (orderId) => {
    try {
      await axiosInstance.patch(`/orders/cancel/${orderId}`, {
        reason: 'Customer request',
      }, {
        withCredentials: true,
      })
      toast.success('Order cancelled successfully')
      fetchOrders() // Refresh orders after cancellation
    } catch (error) {
      console.error('Error cancelling order:', error)
      toast.error('Failed to cancel order. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    )
  }

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-purple-600">Order History</h2>
        {orders.length === 0 ? (
          <p className="text-gray-500 text-center">You have no orders.</p>
        ) : (
          <ul className="space-y-4">
            {orders.map((order) => (
              <li key={order._id}>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-lg font-medium">Order ID: {order._id}</p>
                        <p className="text-gray-500">Total: ${order.totalPrice.toFixed(2)}</p>
                        <p className="text-gray-500">Status: {order.status}</p>
                        <p className="text-gray-500">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>
                      {order.status === 'Pending' && (
                        <Button
                          onClick={() => cancelOrder(order._id)}
                          variant="destructive"
                        >
                          Cancel Order
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}

