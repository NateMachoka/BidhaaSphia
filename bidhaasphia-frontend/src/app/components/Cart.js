'use client';

import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useRouter } from 'next/navigation';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await axiosInstance.get('/cart/view', {
        withCredentials: true,
      });
      setCartItems(response.data.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await axiosInstance.delete('/cart/remove', {
        data: { productId },
        withCredentials: true,
      });
      fetchCart(); // Refresh the cart after removal
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const clearCart = async () => {
    try {
      await axiosInstance.delete('/cart/removeAll', {
        withCredentials: true,
      });
      setCartItems([]); // Clear cart locally
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const placeOrder = async () => {
    try {
      const response = await axiosInstance.post('/orders/place', {}, {
        withCredentials: true,
      });
      console.log('Order placed:', response.data);
      router.push('/order-confirmation'); // Navigate to order confirmation
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <li key={item.productId} className="py-4 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium">{item.name}</h3>
                  <p className="text-gray-500">Quantity: {item.quantity}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.productId)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex justify-between">
            <button
              onClick={clearCart}
              className="bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300"
            >
              Clear Cart
            </button>
            <button
              onClick={placeOrder}
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
