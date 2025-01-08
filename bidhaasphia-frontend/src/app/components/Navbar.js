'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaUserAlt, FaTh, FaBoxOpen, FaStar, FaShoppingCart } from 'react-icons/fa';
import { logoutHandler } from '../utils/logoutHandler';
import axiosInstance from '../utils/axiosInstance';
import { Menu } from '@headlessui/react';
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import OrderHistory from './OrderHistory';
import { toast } from 'react-hot-toast';

export const Navbar = () => {
  const { data: session, status } = useSession();
  const [categories, setCategories] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [promotions, setPromotions] = useState([
    { id: 1, text: "🔥 Mega Sale - Up to 50% Off!", link: "/sale" },
    { id: 2, text: "🎉 Free Shipping on Orders Over $100", link: "/shipping" },
    { id: 3, text: "🎁 New User? Get 10% Off Your First Order!", link: "/new-user-discount" }
  ]);
  const [currentPromotionIndex, setCurrentPromotionIndex] = useState(0);

  const firstName = status === 'authenticated' ? session.user.name.split(' ')[0] : '';

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get('/categories');
        if (response.data.categories) {
          setCategories(response.data.categories);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast.error('Failed to load categories. Please try again.');
      }
    };

    const fetchCartItemCount = async () => {
      try {
        const response = await axiosInstance.get('/cart', { withCredentials: true });
        setCartItemCount(response.data.items.length);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCategories();
    if (status === 'authenticated') {
      fetchCartItemCount();
    }

    // Rotate promotions every 5 seconds
    const intervalId = setInterval(() => {
      setCurrentPromotionIndex((prevIndex) => (prevIndex + 1) % promotions.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [status]);

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/dashboard" className="text-2xl font-bold text-purple-600">BidhaaSphia</Link>
        <div className="flex items-center space-x-4">
          {status === 'authenticated' ? (
            <>
              <span className="text-sm">Welcome, {firstName}</span>
              <Menu as="div" className="relative">
                <Menu.Button as={Button} variant="ghost" size="sm">
                  <FaUserAlt className="mr-2" /> Account
                </Menu.Button>
                <Menu.Items className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-10">
                  <Menu.Item>
                    {({ active }) => (
                      <Link href="/profile" className={`block px-4 py-2 ${active ? 'bg-purple-100' : ''}`}>
                        <FaUserAlt className="inline-block mr-2" /> Profile
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Popover>
                        <PopoverTrigger asChild>
                          <button className={`w-full text-left px-4 py-2 ${active ? 'bg-purple-100' : ''}`}>
                            <FaBoxOpen className="inline-block mr-2" /> Orders
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                          <OrderHistory />
                        </PopoverContent>
                      </Popover>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link href="/popular-products" className={`block px-4 py-2 ${active ? 'bg-purple-100' : ''}`}>
                        <FaStar className="inline-block mr-2" /> Popular Products
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button onClick={logoutHandler} className={`block w-full text-left px-4 py-2 ${active ? 'bg-purple-100' : ''}`}>
                        Logout
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            </>
          ) : (
            <>
              <Button asChild variant="outline" size="sm">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/register">Register</Link>
              </Button>
            </>
          )}
          <Link href="/cart">
            <Button variant="outline" size="sm">
              <FaShoppingCart className="mr-2" /> Cart
              {cartItemCount > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {cartItemCount}
                </Badge>
              )}
            </Button>
          </Link>
        </div>
      </div>
      <div className="bg-purple-600 px-6 py-2 flex items-center justify-between text-white">
        <Menu as="div" className="relative">
          <Menu.Button as={Button} variant="ghost" size="sm" className="text-white">
            <FaTh className="mr-2" /> Categories
          </Menu.Button>
          <Menu.Items className="absolute left-0 mt-2 w-48 bg-white text-black shadow-lg rounded-lg z-10">
            {categories.map((category) => (
              <Menu.Item key={category._id}>
                {({ active }) => (
                  <Link href={`/category/${category._id}`} className={`block px-4 py-2 ${active ? 'bg-purple-100' : ''}`}>
                    {category.category}
                  </Link>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Menu>
        <div className="flex items-center space-x-4 text-sm overflow-hidden">
          <Link href={promotions[currentPromotionIndex].link} className="animate-marquee whitespace-nowrap">
            {promotions[currentPromotionIndex].text}
          </Link>
        </div>
      </div>
    </header>
  );
};
