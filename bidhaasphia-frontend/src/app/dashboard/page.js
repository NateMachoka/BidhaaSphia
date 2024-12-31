import React from 'react';
import { Navbar } from '../components/Navbar';
import { Categories } from '../components/Categories.js';
import SearchBar from '../components/searchBar';

export default function Dashboard() {
  return (
    <div>
      <Navbar />
      <SearchBar />
      <Categories />
    </div>
  );
}
