'use client'

import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import Image from 'next/image';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get('/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between px-4">
        <h2 className="text-2xl font-bold tracking-tight">All Products</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="flex-shrink-0 bg-white hover:shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out rounded-lg shadow-sm w-[250px]"
          >
            <Image
              src={`http://localhost:5000${product.image}`}
              alt={product.name}
              width={500} // Adjust the width
              height={200} // Adjust the height
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{product.description.slice(0, 50)}...</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-green-600 font-bold">${product.price}</span>
                <button className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
                  <Plus className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductsPage;
