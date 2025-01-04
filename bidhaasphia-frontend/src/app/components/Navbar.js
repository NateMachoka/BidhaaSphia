'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { FaUserAlt, FaTh, FaBoxOpen, FaStar, FaShoppingCart } from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';
import { logoutHandler } from '../utils/logoutHandler';
import axiosInstance from '../utils/axiosInstance';
import { Menu } from '@headlessui/react';
import HomeNavbar from './homeNavbar.js';


export const Navbar = () => {
  const { data: session, status } = useSession();
  const [categories, setCategories] = useState([]);
  const firstName = status === 'authenticated' ? session.user.name.split(' ')[0] : '';

  // Fetch categories when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get('/categories');
        if (response.data.categories) {
          setCategories(response.data.categories);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  // Close dropdown when clicking outside
  const dropdownRef = useRef();
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  return (
    <>
      {/* Conditionally render HomeNavbar or Navbar */}
      {status === 'authenticated' ? <HomeNavbar /> : null}

      <header className="bg-gray-800 text-white shadow-lg fixed top-0 left-0 w-full z-50">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <h1 className="text-2xl font-bold cursor-pointer">BidhaaSphia</h1>
            </Link>
            <p className="text-sm">
              {status === 'authenticated' ? `Welcome, ${firstName}` : 'Welcome, Guest!'}
            </p>
          </div>

          <div className="flex items-center space-x-6">
            <Link href="/cart" className="text-2xl cursor-pointer hover:text-gray-400">
              <FaShoppingCart />
            </Link>

            {status === 'authenticated' ? (
              <Menu as="div" className="relative">
                <Menu.Button className="text-2xl cursor-pointer hover:text-gray-400">
                  <FaUserAlt />
                </Menu.Button>
                <Menu.Items className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-lg">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/profile"
                        className={`block px-4 py-2 ${active ? 'bg-gray-100' : ''}`}
                      >
                        <FaUserAlt className="inline-block mr-2" /> Profile
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/orders"
                        className={`block px-4 py-2 ${active ? 'bg-gray-100' : ''}`}
                      >
                        <FaBoxOpen className="inline-block mr-2" /> Orders
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/popular-products"
                        className={`block px-4 py-2 ${active ? 'bg-gray-100' : ''}`}
                      >
                        <FaStar className="inline-block mr-2" /> Popular Products
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={logoutHandler}
                        className={`block w-full text-left px-4 py-2 ${
                          active ? 'bg-gray-100' : ''
                        }`}
                      >
                        Logout
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            ) : (
              <>
                <Link href="/login" className="text-white hover:text-gray-300">
                  Login
                </Link>
                <Link href="/register" className="text-white hover:text-gray-300">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="bg-gray-700 px-6 py-2 flex items-center justify-between">
          <Menu as="div" className="relative">
            <Menu.Button className="text-white font-semibold flex items-center">
              <FaTh className="mr-2" />
              Categories
            </Menu.Button>
            <Menu.Items className="absolute left-0 mt-2 w-48 bg-white text-black shadow-lg rounded-lg">
              {categories.map((category) => (
                <Menu.Item key={category._id}>
                  {({ active }) => (
                    <Link
                      href={`/category/${category._id}`}
                      className={`block px-4 py-2 ${active ? 'bg-gray-100' : ''}`}
                    >
                      {category.category}
                    </Link>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Menu>

          <div className="flex items-center space-x-4 text-sm">
            <span>🔥 Mega Sale - Up to 50% Off!</span>
            <span>🎉 Free Shipping on Orders Over $100</span>
          </div>
        </div>
      </header>
    </>
  );
};
