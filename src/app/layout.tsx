import type { Metadata } from 'next';
import { Lexend } from 'next/font/google';

import { cn } from '@/lib/utils';
import { Navbar } from '@/components/Navbar';
import { Providers } from '@/components/Providers';

import './globals.css';

const lexend = Lexend({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Learning Journey',
  description: 'Generate free course by AI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={cn(lexend.className, 'antialiased min-h-screen pt-16')}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
