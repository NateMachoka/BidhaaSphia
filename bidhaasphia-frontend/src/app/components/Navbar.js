'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { FaUserAlt, FaShoppingCart } from 'react-icons/fa';

export const Navbar = () => {
  const { data: session } = useSession();

  return (
    <header className="bg-gray-800 text-white flex items-center justify-between p-4">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-semibold">Bidhaa</h1>
        <p className="text-sm">Welcome, {session?.user?.name || 'Guest'}!</p>
      </div>
      
      <div className="flex items-center space-x-4">
        <FaUserAlt className="text-2xl" />
        <FaShoppingCart className="text-2xl" />
      </div>
    </header>
  );
};
