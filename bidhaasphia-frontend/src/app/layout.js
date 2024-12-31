'use client';

import { SessionProvider } from 'next-auth/react';
import React from 'react';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <div>{children}</div>
        </SessionProvider>
      </body>
    </html>
  );
}
