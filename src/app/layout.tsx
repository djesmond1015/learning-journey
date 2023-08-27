import type { Metadata } from 'next';
import { Lexend } from 'next/font/google';

import './globals.css';
import { cn } from '@/lib/utils';

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
        {children}
      </body>
    </html>
  );
}
