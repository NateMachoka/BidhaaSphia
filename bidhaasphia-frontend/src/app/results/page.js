'use client';

import { useSearchParams } from 'next/navigation';
import React from 'react';
import Image from 'next/image';
import { Loader2, ShoppingBag } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-hot-toast';

const ResultsPage = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get('name') || '';

  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/products/search?name=${name}`);
        setProducts(response.data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to load products. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (name) {
      fetchProducts();
    }
  }, [name]);

  const addToCart = async (productId) => {
    try {
      const response = await axiosInstance.post('/cart/add', {
        productId,
        quantity: 1,
      }, { withCredentials: true });

      if (response.status === 200) {
        toast.success('Product added to cart!');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add product to cart. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-purple-600 text-center">
        Search Results for "{name}"
      </h1>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product._id}>
              <CardContent className="p-4">
                <div className="relative h-64 mb-4">
                  <Image
                    src={`http://localhost:5000${product.image}`}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
                <h2 className="text-xl font-semibold mb-2 text-center">{product.name}</h2>
                <p className="text-gray-600 mb-4 text-center h-12 overflow-hidden">{product.description}</p>
                <p className="text-lg font-bold text-purple-600 text-center mb-2">${product.price.toFixed(2)}</p>
                <p className="text-green-500 text-center mb-4">
                  {product.stock > 0 ? `In stock: ${product.stock}` : 'Out of stock'}
                </p>
                <Button
                  onClick={() => addToCart(product._id)}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  disabled={product.stock === 0}
                >
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-xl">No products found</p>
      )}
    </div>
  );
};

export default ResultsPage;
