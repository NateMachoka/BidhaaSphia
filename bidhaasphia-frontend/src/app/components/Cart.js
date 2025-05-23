'use client';

import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useRouter } from 'next/navigation';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
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
      setErrorMessage(''); // Clear error message if successful
    } catch (error) {
      setErrorMessage('Error fetching cart. Please try again later.');
      if (process.env.NODE_ENV === 'development') {
        console.error('Error fetching cart:', error); // Log only in development
      }
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await axiosInstance.delete('/cart/remove', {
        data: { productId },
        withCredentials: true,
      });
      fetchCart(); // Refresh the cart after removal
      setErrorMessage(''); // Clear error message if successful
    } catch (error) {
      setErrorMessage('Error removing item from cart. Please try again.');
      if (process.env.NODE_ENV === 'development') {
        console.error('Error removing from cart:', error);
      }
    }
  };

  const clearCart = async () => {
    try {
      await axiosInstance.delete('/cart/removeAll', {
        withCredentials: true,
      });
      setCartItems([]); // Clear cart locally
      setErrorMessage(''); // Clear error message if successful
    } catch (error) {
      setErrorMessage('Error clearing cart. Please try again.');
      if (process.env.NODE_ENV === 'development') {
        console.error('Error clearing cart:', error);
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {errorMessage && (
        <p className="text-red-600 mb-4">{errorMessage}</p>
      )}
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
              onClick={() => router.push('/order-history')}  // Navigate to Order History
              className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
            >
              Go to Orders
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
