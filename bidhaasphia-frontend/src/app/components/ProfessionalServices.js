'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { ChefHat, Zap, SprayCanIcon as Spray, Baby, Stethoscope, Car, Wrench, ShoppingBag, Grid, Flower2, Dog } from 'lucide-react';

const servicesList = [
  { name: 'Home Chef', icon: ChefHat, price: '$50/hr', description: 'Cook meals for you and your family.' },
  { name: 'Electrician', icon: Zap, price: '$70/hr', description: 'Fix electrical issues around your home.' },
  { name: 'Deep Cleaning', icon: Spray, price: '$60/hr', description: 'Clean your home or office space deeply.' },
  { name: 'Nanny', icon: Baby, price: '$40/hr', description: 'Caring and nurturing for your children.' },
  { name: 'Nursing', icon: Stethoscope, price: '$75/hr', description: 'Professional nursing services for home care.' },
  { name: 'Driver', icon: Car, price: '$25/hr', description: 'Safe and reliable transportation.' },
  { name: 'Plumber', icon: Wrench, price: '$65/hr', description: 'Fix plumbing issues and installations.' },
  { name: 'Personal Shopper', icon: ShoppingBag, price: '$50/hr', description: 'Help with buying groceries or gifts.' },
  { name: 'Tile and Flooring', icon: Grid, price: '$80/hr', description: 'Install or repair tiles and flooring.' },
  { name: 'Gardener', icon: Flower2, price: '$30/hr', description: 'Maintain your garden and landscaping.' },
  { name: 'Pet Sitting', icon: Dog, price: '$35/hr', description: 'Care for your pets while you\'re away.' }  // Fixed typo and added missing quote here
];

export const ProfessionalServices = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    setServices(servicesList.slice(0, 8));
  }, []);

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-purple-600">Professional Services</h2>
        <Button asChild variant="link">
          <Link href="/professionalServices">See All Services</Link>
        </Button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service) => (
          <Card key={service.name} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <service.icon className="w-8 h-8 text-purple-600" />
                <h3 className="text-lg font-semibold ml-4">{service.name}</h3>
              </div>
              <p className="text-sm text-gray-500 mb-4">{service.description}</p>
              <p className="text-sm text-purple-600 font-bold mb-4">{service.price}</p>
              <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
                <Link href="/professionalServices">Book Now</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
