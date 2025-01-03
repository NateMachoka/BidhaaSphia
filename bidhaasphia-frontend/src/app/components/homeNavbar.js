'use client';

import Link from 'next/link';

export default function HomeNavbar() {
  return (
    <header className="bg-gray-800 text-white shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <h1 className="text-2xl font-bold cursor-pointer">BidhaaSphia</h1>
          </Link>
          <p className="text-sm">Welcome, Guest!</p>
        </div>

        <div className="flex items-center space-x-6">
          <Link href="/login" className="text-white hover:text-gray-300">
            Login
          </Link>
          <Link href="/register" className="text-white hover:text-gray-300">
            Register
          </Link>
        </div>
      </div>
    </header>
  );
}
