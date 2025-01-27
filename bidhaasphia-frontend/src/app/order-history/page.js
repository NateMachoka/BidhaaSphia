'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axiosInstance from '../utils/axiosInstance';
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { toast } from 'react-hot-toast';
import { Loader2, ShoppingBag, X } from 'lucide-react';

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/orders/view', {
        withCredentials: true,
      });
      setOrders(response.data.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to fetch orders. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const placeOrder = async (orderId) => {
  try {
    const order = orders.find((order) => order._id === orderId);

    if (!order.products || order.products.length === 0) {
      throw new Error('This order has no products and cannot be placed.');
    }

    const orderData = { orderId };

    const response = await axiosInstance.post(
      '/orders/place',
      orderData,
      { withCredentials: true }
    );

    toast.success('Order placed successfully');
    router.push('/order-confirmation?status=placed');
  } catch (error) {
    toast.error(error.response?.data?.message || error.message || 'Error placing order. Please try again.');
  }
};


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    );
  }

  // Sort orders: Pending first, followed by Completed or Cancelled
  const sortedOrders = orders.sort((a, b) => {
    if (a.status === 'Pending' && b.status !== 'Pending') return -1; // a comes before b
    if (b.status === 'Pending' && a.status !== 'Pending') return 1; // b comes before a
    return 0; // Keep other orders in the same order
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-purple-600">Order History</h1>
      {orders.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-gray-500">You have no orders yet.</p>
            <Button 
              onClick={() => router.push('/products')}
              className="mt-4 bg-purple-600 hover:bg-purple-700"
            >
              Start Shopping
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {sortedOrders.map((order) => (
            <Card key={order._id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold flex items-center">
                    <ShoppingBag className="mr-2" /> Order #{order._id.slice(-6)}
                  </h2>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <p className="text-gray-600">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                <p className="text-gray-600">Total: ${order.totalPrice.toFixed(2)}</p>
                <div className="flex space-x-4 mt-4">
                  {order.status === 'Pending' && (
                    <>
                      <Button
                        onClick={() => placeOrder(order._id)}  // Trigger the placeOrder function
                        className="flex items-center bg-green-600 hover:bg-green-700"
                      >
                        Place Order
                      </Button>
                      <Button
                        onClick={() => cancelOrder(order._id)}
                        variant="destructive"
                        className="flex items-center"
                      >
                        <X className="mr-2 h-4 w-4" /> Cancel Order
                      </Button>
                    </>
                  )}
                  {/* Add buttons for completed orders if needed */}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
