'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setError('Please enter a search term.');
      return;
    }
    setError('');
    router.push(`/results?name=${encodeURIComponent(query)}`); // Ensure the query param matches the results page
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
