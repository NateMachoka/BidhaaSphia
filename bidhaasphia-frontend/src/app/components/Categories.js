"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axiosInstance from '../utils/axiosInstance';

export const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get('/categories');
        setCategories(response.data.categories); // Access the categories key
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {categories.map((category) => (
        <Link key={category._id} href={`/category/${category._id}`}>
          <div className="bg-gray-200 p-6 rounded-lg text-center">
            <h2 className="text-lg font-semibold">{category.name}</h2>
          </div>
        </Link>
      ))}
    </div>
  );
};
