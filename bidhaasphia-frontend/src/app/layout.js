'use client';

import { SessionProvider } from 'next-auth/react';
import React from 'react';
import { Navbar } from './components/Navbar';
import HomeNavbar from './components/homeNavbar.js';
import { Footer } from './components/Footer';
import './global.css';
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }) {
    const pathname = usePathname();

    const isHomePage = pathname === '/';

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <SessionProvider>
          {isHomePage ? <HomeNavbar /> : <Navbar />}
          <main className="flex-grow pt-[100px]">{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
