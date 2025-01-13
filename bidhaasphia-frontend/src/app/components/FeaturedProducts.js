'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { ProductSkeleton } from '../components/ProductSkeleton';
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import axiosInstance from '../utils/axiosInstance';

export function FeaturedProducts() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await axiosInstance.get('/products/featured');
        setFeaturedProducts(response.data.featured || []);
      } catch (err) {
        console.error('Error fetching featured products:', err);
        setError('Failed to load featured products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  if (error) {
    return (
      <Alert variant="destructive" className="mb-8">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between px-4">
        <h2 className="text-2xl font-bold tracking-tight">Featured Products</h2>
        <Button variant="link" asChild>
          <a href="/featured">See all featured</a>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading
          ? Array.from({ length: 8 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))
          : featuredProducts.map((product) => (
              <Card key={product._id} className="flex-shrink-0 flex flex-col transition-transform hover:scale-105">
                <CardContent className="p-0 flex-grow flex flex-col">
                  <div className="relative h-48 w-full">
                    <Image
                      src={`http://localhost:5000${product.image || '/placeholder-image.jpg'}`}
                      alt={product.name || 'Product Image'}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-t-lg"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-sm text-gray-500 mt-1 flex-grow">
                      {product.description.slice(0, 50)}...
                    </p>
                  </div>
                  <div className="p-4 pt-0">
                    <span className="text-xl font-bold text-green-600">
                      ${product.price}
                    </span>
                    <Button asChild size="sm" className="w-full bg-purple-600 text-white hover:bg-purple-700 mt-2">
                      <Link href={`/products/${product._id}`}>View Product</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
      </div>
    </section>
  );
}
