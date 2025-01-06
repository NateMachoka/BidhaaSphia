'use client';

import { useParams, useRouter } from 'next/navigation';
import axiosInstance from '../../utils/axiosInstance';
import { useEffect, useState } from 'react';

const CategoryPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (id) {
      const fetchCategory = async () => {
        try {
          const categoryResponse = await axiosInstance.get(`/categories/${id}`);
          setCategory(categoryResponse.data);

          const productsResponse = await axiosInstance.get(`/products?categories=${id}`);
          setProducts(productsResponse.data);
        } catch (error) {
          console.error('Error fetching category or products:', error);
        }
      };

      fetchCategory();
    }
  }, [id]);

  const addToCart = async (productId) => {
    try {
      const response = await axiosInstance.post('/cart/add', {
        productId,
        quantity: 1,
      }, { withCredentials: true });

      if (response.status === 200) {
        alert('Product added to cart!');
        router.push('/cart'); // Navigate to the cart page
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  if (!category) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">{category.category}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white shadow-md rounded-lg p-6">
            <img
              src={`http://localhost:5000${product.image}`}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-lg font-bold mb-4">${product.price.toFixed(2)}</p>
            <button
              onClick={() => addToCart(product._id)}
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 flex items-center justify-center"
            >
              <span className="mr-2">Add to Cart</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-plus-circle"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8 0a8 8 0 1 0 8 8A8 8 0 0 0 8 0zM7.5 7h1v1.5h-1V7zm0 2h1v4h-1V9z"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
