'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axiosInstance from '../utils/axiosInstance';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Categories = () => {
  const [categories, setCategories] = useState([]);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesResponse = await axiosInstance.get('/categories');
        const categoriesWithProducts = await Promise.all(
          categoriesResponse.data.categories.map(async (category) => {
            const productsResponse = await axiosInstance.get(`/products?category=${category._id}`);
            return { ...category, products: productsResponse.data };
          })
        );
        setCategories(categoriesWithProducts);
      } catch (error) {
        console.error('Error fetching categories or products:', error);
      }
    };
    fetchCategories();
  }, []);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between px-4">
        <h2 className="text-2xl font-bold tracking-tight">Shop by Category</h2>
        <Link href="/all-categories">
          <button className="text-blue-500 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-md">
            See all categories
          </button>
        </Link>
      </div>

      {/* Categories Scrollable Container */}
      <div className="relative">
        {/* Left Scroll Button */}
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-3 rounded-full hidden lg:flex items-center justify-center"
          onClick={() => scroll('left')}
          aria-label="Scroll Left"
        >
          <ChevronLeft className="h-5 w-5 text-gray-700" />
        </button>

        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide px-4 snap-x scroll-smooth"
        >
          {categories.map((category) => (
            <div
              key={category._id}
              className="flex-shrink-0 bg-gray-50 hover:shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out rounded-lg shadow-sm w-[280px] snap-center flex flex-col justify-between"
            >
              {/* Category Header */}
              <h3 className="text-lg font-semibold text-center bg-gray-100 py-2 rounded-t-lg">
                {category.category}
              </h3>

              {/* Product Grid */}
              <div className="flex-grow">
                <div className="grid grid-cols-2 gap-2 p-4">
                  {category.products?.slice(0, 4).map((product) => (
                    <div
                      key={product._id}
                      className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    >
                      <Image
                        src={`http://localhost:5000${product.image}`}
                        alt={product.name}
                        width={100}
                        height={96}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <h4 className="text-sm font-medium mt-2">{product.name}</h4>
                    </div>
                  ))}
                </div>
              </div>

              {/* See More Link */}
              <Link
                href={`/category/${category._id}`}
                className="block bg-blue-100 text-blue-600 text-center py-2 rounded-b-lg hover:bg-blue-200 transition-colors"
              >
                See More
              </Link>
            </div>
          ))}
        </div>

        {/* Right Scroll Button */}
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-3 rounded-full hidden lg:flex items-center justify-center"
          onClick={() => scroll('right')}
          aria-label="Scroll Right"
        >
          <ChevronRight className="h-5 w-5 text-gray-700" />
        </button>
      </div>
    </section>
  );
};
