'use client'

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { ChefHat, Zap, SprayCan, Baby, Stethoscope, Car, Wrench, ShoppingBag, Grid, Flower2, Dog } from 'lucide-react';  // Import lucide-react icons
import axiosInstance from '../utils/axiosInstance';

export const ProfessionalServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch services from the backend
    const fetchServices = async () => {
      try {
        const response = await axiosInstance.get('/services');
        setServices(response.data); // Set the fetched services in state
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display a loading message or spinner
  }

  // Map icon names to components dynamically
  const iconMap = {
    'chefHat': ChefHat,
    'zap': Zap,
    'sprayCan': SprayCan,
    'baby': Baby,
    'stethoscope': Stethoscope,
    'car': Car,
    'wrench': Wrench,
    'shoppingBag': ShoppingBag,
    'grid': Grid,
    'flower2': Flower2,
    'dog': Dog,
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-purple-600">Professional Services</h2>
        <Button asChild variant="link">
          <Link href="/professionalServices">See All Services</Link>
        </Button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service) => {
          const IconComponent = iconMap[service.icon] || null;  // Map icon name to component

          return (
            <Card key={service._id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {/* Render the icon dynamically */}
                  {IconComponent && <IconComponent className="w-8 h-8 text-purple-600" />}
                  <h3 className="text-lg font-semibold ml-4">{service.name}</h3>
                </div>
                <p className="text-sm text-gray-500 mb-4">{service.description}</p>
                <p className="text-sm text-purple-600 font-bold mb-4">{service.price}</p>
                <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
                  <Link href="/professionalServices">Book Now</Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
};
