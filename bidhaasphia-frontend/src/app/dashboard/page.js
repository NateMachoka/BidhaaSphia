import React from 'react';
import { Categories } from '../components/Categories.js';
import { TopDeals } from '../components/TopDeals';
import { MostPopular } from '../components/MostPopular';
import { ProfessionalServices } from '../components/ProfessionalServices';
import SearchBar from '../components/searchBar';

export default function Dashboard() {
  return (
    <div>
      <SearchBar />
      <Categories />
      <TopDeals />
      <MostPopular />
    </div>
  );
}
