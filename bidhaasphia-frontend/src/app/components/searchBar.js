'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const [products, setProducts] = useState([]); // State to hold the fetched products
  const router = useRouter();

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/api/products/search?name=${query}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();

      if (Array.isArray(data)) {
        setError('');
        setProducts(data); // Set the fetched products to state
      } else {
        setError('Unexpected response format.');
      }
    } catch (error) {
      console.error(error.message);
      setError('Error fetching products. Please try again.');
    }
  };

  return (
    <div className="p-4">
      <p className="text-gray-600 text-center mb-4">
        What would you like to buy?
      </p>
      <form
        onSubmit={handleSearch}
        className="flex items-center p-2 bg-white rounded-lg shadow-lg max-w-lg mx-auto"
      >
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-2 border rounded-l-lg"
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded-r-lg">
          Search
        </button>
      </form>

      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

      {/* Display the products after successful search */}
      {products.length > 0 && (
        <div className="mt-4">
          <h3 className="text-center text-lg font-bold">Search Results:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {products.map((product) => (
              <div key={product._id} className="border rounded-lg p-4 shadow-lg">
                <img
                  src={`http://localhost:5000${product.image}`} // Make sure the image is displayed
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-md"
                />
                <h4 className="mt-2 text-center font-semibold">{product.name}</h4>
                <p className="mt-1 text-center">{product.description}</p>
                <p className="mt-2 text-center text-lg font-bold">${product.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
