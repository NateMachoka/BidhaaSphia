'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import axiosInstance from '../utils/axiosInstance';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

export const MostPopular = () => {
  const [popularProducts, setPopularProducts] = useState([]);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        const response = await axiosInstance.get('/products/most-popular');
        setPopularProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching popular products:', error);
      }
    };
    fetchPopularProducts();
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
      { productId },
      { withCredentials: true }
    );
    // Show a success message or update the UI
    alert('Product added to cart successfully!');
  } catch (error) {
    setErrorMessage('Unable to add the product to the cart. Please try again.');
  }
};

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between px-4">
        <h2 className="text-2xl font-bold tracking-tight">Most Popular</h2>
        <Button variant="link" asChild>
          <a href="/products">See all popular products</a>
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
          {popularProducts.map((product) => (
            <Card key={product._id} className="flex-shrink-0 w-[250px] snap-center">
              <CardContent className="p-0">
                <div className="relative h-40 w-full">
                  <Image
                    src={`http://localhost:5000${product.image}`}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{product.description.slice(0, 50)}...</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-green-600 font-bold">${product.price}</span>
                    <Button size="sm" onClick={() => addToCart(product._id)}>
                      <Plus className="h-4 w-4 mr-2" /> Add to Cart
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
