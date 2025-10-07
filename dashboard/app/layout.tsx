import React from 'react';
import './globals.css';  // Add this import!

export default function RootLayout({  // Also consider renaming to RootLayout
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gray-50">
          {children}
        </div>
      </body>
    </html>
  );
}