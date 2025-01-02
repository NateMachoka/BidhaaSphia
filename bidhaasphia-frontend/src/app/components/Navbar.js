'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { FaUserAlt, FaShoppingCart, FaTh } from 'react-icons/fa'; // Added FaTh for categories
import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance'; // Importing the Axios instance for API requests

export const Navbar = () => {
  const { data: session, status } = useSession();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [categories, setCategories] = useState([]);

  const toggleDropdown = () => setDropdownVisible(!dropdownVisible);

  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get('/categories');
        if (response.data.categories) {
          setCategories(response.data.categories); // Assuming the response contains an array of categories
        } else {
          console.error('No categories found in the response.');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Extract first name if user is authenticated
  const firstName = status === 'authenticated' ? session.user.name.split(' ')[0] : '';

  return (
    <header className="bg-gray-800 text-white shadow-lg fixed top-0 left-0 w-full z-50">
      {/* Top section with branding and user info */}
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">BidhaaSphia</h1>
          <p className="text-sm">
            {status === 'authenticated'
              ? `Welcome, ${firstName}` // Display only the first name
              : 'Welcome, Guest!'}
          </p>
        </div>

        <div className="flex items-center space-x-6">
          <Link href="/profile">
            <FaUserAlt className="text-2xl cursor-pointer hover:text-gray-400" />
          </Link>
          <Link href="/cart">
            <FaShoppingCart className="text-2xl cursor-pointer hover:text-gray-400" />
          </Link>
        </div>
      </div>

      {/* Bottom section with dropdown and announcements */}
      <div className="bg-gray-700 px-6 py-2 flex items-center justify-between">
        {/* Categories Dropdown */}
        <div className="relative">
          <button
            className="text-white font-semibold hover:text-gray-300 flex items-center"
            onClick={toggleDropdown}
          >
            <FaTh className="mr-2" /> {/* Categories icon */}
            Categories
          </button>
          {dropdownVisible && categories.length > 0 && (
            <div className="absolute left-0 top-full mt-2 bg-white text-gray-800 rounded shadow-lg w-48">
              {categories.map((category) => (
                <Link
                  key={category._id}
                  href={`/category/${category._id}`}
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  {category.name} {/* Assuming `category.name` is the correct property */}
                </Link>
              ))}
            </div>
          )}
          {dropdownVisible && categories.length === 0 && (
            <div className="absolute left-0 top-full mt-2 bg-white text-gray-800 rounded shadow-lg w-48">
              <p className="px-4 py-2">No categories available</p>
            </div>
          )}
        </div>

        {/* Announcements */}
        <div className="flex items-center space-x-4 text-sm">
          <span>🔥 Mega Sale - Up to 50% Off!</span>
          <span>🎉 Free Shipping on Orders Over $100</span>
        </div>
      </div>
    </header>
  );
};
