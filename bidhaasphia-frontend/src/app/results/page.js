'use client';

import { useSearchParams } from 'next/navigation';
import React from 'react';

const ResultsPage = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get('name') || ''; // Match the query param from SearchBar

  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/search?name=${name}`);
        const data = await response.json();
        setProducts(data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    if (name) {
      fetchProducts();
    }
  }, [name]);

  return (
    <div className="p-4">
      <h1 className="text-center text-2xl font-bold mb-6">
        Search Results for "{name}"
      </h1>
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product._id} className="border rounded-lg p-4 shadow-lg">
              <img
                src={`http://localhost:5000${product.image}`}
                alt={product.name}
                className="w-full h-64 object-cover rounded-md mb-4"
              />
              <h2 className="text-lg font-bold text-center">{product.name}</h2>
              <p className="text-gray-700 text-center">{product.description}</p>
              <p className="text-blue-500 font-bold text-center">${product.price}</p>
              <p className="text-green-500 text-center">
                {product.stock > 0 ? `In stock: ${product.stock}` : 'Out of stock'}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No products found</p>
      )}
    </div>
  );
};

export default ResultsPage;
