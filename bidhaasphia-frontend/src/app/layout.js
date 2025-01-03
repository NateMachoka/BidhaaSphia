'use client';

import { SessionProvider } from 'next-auth/react';
import React from 'react';
import { Navbar } from './components/Navbar';
import HomeNavbar from './components/homeNavbar.js';
import './global.css';
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // Render HomeNavbar only on the homepage ("/"), else render Navbar
  const isHomePage = pathname === '/';

  return (
    <html lang="en">
      <body>
        <SessionProvider>
          {isHomePage ? <HomeNavbar /> : <Navbar />}
          <main className="pt-[100px]">{children}</main> {/* Ensures no overlap with the header */}
        </SessionProvider>
      </body>
    </html>
  );
}
