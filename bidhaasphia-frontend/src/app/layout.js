'use client';

import { SessionProvider } from 'next-auth/react';
import React from 'react';
import { Navbar } from './components/Navbar';
import './global.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Navbar />
          <main className="pt-[100px]">{children}</main> {/* Ensures no overlap with the header */}
        </SessionProvider>
      </body>
    </html>
  );
}
