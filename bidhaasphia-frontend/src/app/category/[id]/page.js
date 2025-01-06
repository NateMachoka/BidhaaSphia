'use client';

import { useParams } from 'next/navigation';
import axiosInstance from '../../utils/axiosInstance';
import { useEffect, useState } from 'react';

const CategoryPage = () => {
  const { id } = useParams();
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

  if (!category) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <h1>{category.category}</h1>
      <div>
        <h2>Products</h2>
        <div className="grid grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product._id} className="bg-white p-3 rounded-lg shadow-sm">
              <img
                src={`http://localhost:5000${product.image}`}
                alt={product.name}
                className="w-full h-24 object-cover rounded-lg"
              />
              <h4 className="text-sm font-medium mt-2">{product.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryPage;
