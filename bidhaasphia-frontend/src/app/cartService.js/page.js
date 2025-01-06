'use client'

import axiosInstance from '../../utils/axiosInstance'

export const fetchCartData = async () => {
  try {
    const response = await axiosInstance.get('/cart/view', {
      withCredentials: true,
    })
    return response.data.data
  } catch (error) {
    console.error('Error fetching cart data:', error)
    return []
  }
}

export const removeCartItem = async (productId: string) => {
  try {
    await axiosInstance.delete('/cart/remove', {
      data: { productId },
      withCredentials: true,
    })
  } catch (error) {
    console.error('Error removing item from cart:', error)
  }
}

export const clearCartItems = async () => {
  try {
    await axiosInstance.delete('/cart/removeAll', {
      withCredentials: true,
    })
  } catch (error) {
    console.error('Error clearing cart:', error)
  }
}

export const placeCartOrder = async () => {
  try {
    const response = await axiosInstance.post('/orders/place', {}, {
      withCredentials: true,
    })
    return response.data
  } catch (error) {
    console.error('Error placing order:', error)
  }
}
