import React from 'react';
import { Categories } from '../components/Categories.js';
import SearchBar from '../components/searchBar';

export default function Dashboard() {
  return (
    <div>
      <SearchBar />
      <Categories />
    </div>
  );
}
