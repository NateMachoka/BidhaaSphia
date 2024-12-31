'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { FaUserAlt, FaShoppingCart } from 'react-icons/fa';

export const Navbar = () => {
  const { data: session, status } = useSession();

  return (
    <header className="bg-gray-800 text-white flex items-center justify-between p-4">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-semibold">BidhaaSphia</h1>
        <p className="text-sm">
          {status === 'authenticated' ? `Welcome, ${session.user.name}` : 'Welcome, Guest!'}
        </p>
      </div>

      <div className="flex items-center space-x-6 relative">
        {/* User Profile Icon with Tooltip */}
        <div className="relative group">
          <Link href="/profile">
            <FaUserAlt className="text-2xl cursor-pointer hover:text-gray-400 transition-colors duration-200" />
          </Link>
          <div className="absolute left-1/2 transform -translate-x-1/2 mt-1 px-2 py-1 bg-gray-700 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Profile
          </div>
        </div>

        {/* Cart Icon with Tooltip */}
        <div className="relative group">
          <Link href="/cart">
            <FaShoppingCart className="text-2xl cursor-pointer hover:text-gray-400 transition-colors duration-200" />
          </Link>
          <div className="absolute left-1/2 transform -translate-x-1/2 mt-1 px-2 py-1 bg-gray-700 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Cart
          </div>
        </div>
      </div>
    </header>
  );
};
