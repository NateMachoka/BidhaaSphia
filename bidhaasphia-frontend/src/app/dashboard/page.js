import React from 'react';
import { Categories } from '../components/Categories.js';
import { TopDeals } from '../components/TopDeals';
import { MostPopular } from '../components/MostPopular';
import { ProfessionalServices } from '../components/ProfessionalServices';
import SearchBar from '../components/searchBar';
import { Banner } from '../components/Banner';

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <SearchBar className="max-w-3xl mx-auto" />
      </header>

      <section className="mb-12">
        <Banner />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-purple-600">Shop by Category</h2>
        <Categories />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-purple-600">Top Deals Today</h2>
        <TopDeals />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-purple-600">Explore Our Most Popular</h2>
        <MostPopular />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-purple-600">Professional Services</h2>
        <ProfessionalServices />
      </section>
    </div>
  );
}
