'use client';

import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

export const MostPopular = () => {
  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        const response = await axiosInstance.get('/most-popular');
        setPopularProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching popular products:', error);
      }
    };
    fetchPopularProducts();
  }, []);

  return (
    <section className="space-y-6 px-4">
      <h2 className="text-2xl font-bold tracking-tight">Most Popular</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {popularProducts.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-lg shadow hover:shadow-lg transform hover:scale-105 transition-transform"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-500 mt-1">
                {product.description.slice(0, 50)}...
              </p>
              <span className="text-green-600 font-bold">${product.price}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
