'use client';

import React, { useEffect, useState, useRef } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

export const TopDeals = () => {
  const [deals, setDeals] = useState([]);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await axiosInstance.get('/products/top-deals');
        setDeals(response.data.deals);
      } catch (error) {
        console.error('Error fetching top deals:', error);
      }
    };
    fetchDeals();
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
        <h2 className="text-2xl font-bold tracking-tight">Top Deals</h2>
        <button className="text-blue-500 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-md">
          See all deals
        </button>
      </div>

      {/* Scrollable Container */}
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
          {deals.map((deal) => (
            <div
              key={deal._id}
              className="flex-shrink-0 bg-white hover:shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out rounded-lg shadow-sm w-[250px] snap-center"
            >
              <img
                src={deal.image}
                alt={deal.name}
                className="w-full h-40 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{deal.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{deal.description}</p>
                <div className="flex items-center justify-between mt-2">
                  <div>
                    <span className="text-xl font-bold text-green-600">
                      ${deal.price}
                    </span>
                    <span className="text-sm line-through text-gray-400 ml-2">
                      ${deal.originalPrice}
                    </span>
                  </div>
                  <button
                    className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                    aria-label="Add to Cart"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>
              </div>
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