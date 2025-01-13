'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import axiosInstance from '../utils/axiosInstance';
import { ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react';
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

export const TopDeals = () => {
  const [deals, setDeals] = useState([]);
  const [cartItems, setCartItems] = useState({});
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

  const addToCart = async (productId) => {
    try {
      await axiosInstance.post(
        '/cart/add',
        { productId, quantity: 1 },
        { withCredentials: true }
      );
      setCartItems(prev => ({
        ...prev,
        [productId]: (prev[productId] || 0) + 1
      }));
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await axiosInstance.post(
        '/cart/remove',
        { productId, quantity: 1 },
        { withCredentials: true }
      );
      setCartItems(prev => ({
        ...prev,
        [productId]: Math.max((prev[productId] || 0) - 1, 0)
      }));
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between px-4">
        <h2 className="text-2xl font-bold tracking-tight">Top Deals</h2>
        <Button variant="link" asChild>
          <a href="/deals">See all deals</a>
        </Button>
      </div>

      <div className="relative">
        <Button
          variant="outline"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden lg:flex"
          onClick={() => scroll('left')}
          aria-label="Scroll Left"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide px-4 snap-x scroll-smooth"
        >
          {deals.map((deal) => (
            <Card key={deal._id} className="flex-shrink-0 w-[250px] snap-center flex flex-col">
              <CardContent className="p-0 flex-grow flex flex-col">
                <div className="relative h-40 w-full">
                  <Image
                    src={`http://localhost:5000${deal.image}`}
                    alt={deal.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold">{deal.name}</h3>
                  <p className="text-sm text-gray-500 mt-1 flex-grow">{deal.description.slice(0, 50)}...</p>
                </div>
                <div className="px-4 pb-2">
                  <span className="text-xl font-bold text-green-600">${deal.price}</span>
                  <span className="text-sm line-through text-gray-400 ml-2">${deal.originalPrice}</span>
                </div>
                <div className="p-4 pt-0">
                  <div className="flex items-center justify-between mt-2 bg-gray-100 rounded-md">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => removeFromCart(deal._id)} 
                      disabled={!cartItems[deal._id]}
                      className="rounded-l-md"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="flex-grow text-center">Add to Cart</span>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => addToCart(deal._id)}
                      className="rounded-r-md"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden lg:flex"
          onClick={() => scroll('right')}
          aria-label="Scroll Right"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </section>
  );
};
