import React from 'react';
import { Categories } from '../components/Categories.js';
import { TopDeals } from '../components/TopDeals';
import { MostPopular } from '../components/MostPopular';
import { ProfessionalServices } from '../components/ProfessionalServices';
import SearchBar from '../components/searchBar';

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-purple-600">Welcome to BidhaaSphia</h1>
      
      <section className="mb-12">
        <SearchBar />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-purple-600">Shop by Category</h2>
        <Categories />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-purple-600">Top Deals</h2>
        <TopDeals />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-purple-600">Most Popular</h2>
        <MostPopular />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-purple-600">Professional Services</h2>
        <ProfessionalServices />
      </section>
    </div>
  );
}
