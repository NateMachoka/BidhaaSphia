'use client';

import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { Button } from "../components/ui/button";

// List of services
const servicesList = [
  { name: 'Home Chef', icon: '/icons/homechef.svg', price: '$50/hr', description: 'Cook meals for you and your family.' },
  { name: 'Electrician', icon: '/icons/electrician.svg', price: '$70/hr', description: 'Fix electrical issues around your home.' },
  { name: 'Deep Cleaning', icon: '/icons/cleaning.svg', price: '$60/hr', description: 'Clean your home or office space deeply.' },
  { name: 'Nanny', icon: '/icons/nanny.svg', price: '$40/hr', description: 'Caring and nurturing for your children.' },
  { name: 'Nursing', icon: '/icons/nurse.svg', price: '$75/hr', description: 'Professional nursing services for home care.' },
  { name: 'Driver', icon: '/icons/driver.svg', price: '$25/hr', description: 'Safe and reliable transportation.' },
  { name: 'Plumber', icon: '/icons/plumber.svg', price: '$65/hr', description: 'Fix plumbing issues and installations.' },
  { name: 'Personal Shopper', icon: '/icons/shopper.svg', price: '$50/hr', description: 'Help with buying groceries or gifts.' },
  { name: 'Tile and Flooring', icon: '/icons/tile.svg', price: '$80/hr', description: 'Install or repair tiles and flooring.' },
  { name: 'Gardener', icon: '/icons/gardener.svg', price: '$30/hr', description: 'Maintain your garden and landscaping.' },
  { name: 'Pet Sitting', icon: '/icons/pet-sitting.svg', price: '$35/hr', description: 'Care for your pets while you’re away.' },
];

export const ProfessionalServices = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    // Simulate fetching services from a backend, for now using the static list
    setServices(servicesList.slice(0, 8)); // Adjust the number of services displayed
  }, []);

  return (
    <section className="space-y-6 px-4">
      <h2 className="text-2xl font-bold tracking-tight">Professional Services</h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service) => (
          <div
            key={service.name}
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transform hover:scale-105 transition-transform"
          >
            <div className="flex items-center mb-4">
              <img
                src={service.icon}
                alt={service.name}
                className="w-12 h-12 object-contain"
              />
              <h3 className="text-lg font-semibold ml-4">{service.name}</h3>
            </div>
            <p className="text-sm text-gray-500 mb-4">{service.description}</p>
            <p className="text-sm text-green-600 font-bold mb-4">{service.price}</p>
            <Button
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
              onClick={() => window.location.href = '/professionalServices'}
            >
              Book Now
            </Button>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <Button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          onClick={() => window.location.href = '/professionalServices'}
        >
          See All Services
        </Button>
      </div>
    </section>
  );
};
