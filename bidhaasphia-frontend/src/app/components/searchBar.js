'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
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
        router.push(`/results?query=${encodeURIComponent(query)}`);
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
    </div>
  );
};

export default SearchBar;
