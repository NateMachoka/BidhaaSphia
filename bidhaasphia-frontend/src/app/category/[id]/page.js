'use client';

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { Loader2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const CategoryPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState({});

  useEffect(() => {
    if (id) {
      fetchCategoryAndProducts();
    }
  }, [id]);

  const fetchCategoryAndProducts = async () => {
    try {
      setLoading(true);
      const [categoryResponse, productsResponse] = await Promise.all([
        axiosInstance.get(`/categories/${id}`),
        axiosInstance.get(`/products?categories=${id}`),
      ]);
      setCategory(categoryResponse.data);
      setProducts(productsResponse.data);
    } catch (error) {
      console.error('Error fetching category or products:', error);
      toast.error('Failed to load category and products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId) => {
    try {
      setAddingToCart((prev) => ({ ...prev, [productId]: true }));
      const response = await axiosInstance.post('/cart/add', {
        productId,
        quantity: 1,
      }, { withCredentials: true });

      if (response.status === 200) {
        toast.success('Product added to cart!');
        router.push('/cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add product to cart. Please try again.');
    } finally {
      setAddingToCart((prev) => ({ ...prev, [productId]: false }));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Category not found</h1>
        <Button asChild variant="outline">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Return to homepage
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-purple-600">{category.category}</h1>
      {products.length === 0 ? (
        <p className="text-gray-600 text-center">No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product._id}>
              <CardContent className="p-4">
                <div className="relative h-48 mb-4">
                  <Image
                    src={`http://localhost:5000${product.image}`}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-4 h-12 overflow-hidden">{product.description}</p>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold text-purple-600">${product.price.toFixed(2)}</p>
                  <Button
                    onClick={() => addToCart(product._id)}
                    disabled={addingToCart[product._id]}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    {addingToCart[product._id] ? (
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    ) : (
                      <ShoppingBag className="h-5 w-5 mr-2" />
                    )}
                    <span>{addingToCart[product._id] ? 'Adding...' : 'Add to Cart'}</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      <div className="mt-12 flex justify-between items-center">
        <Button asChild variant="outline">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to homepage
          </Link>
        </Button>
        <Button asChild className="bg-purple-600 hover:bg-purple-700">
          <Link href="/cart">
            <ShoppingBag className="mr-2 h-4 w-4" /> View Cart
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default CategoryPage;
