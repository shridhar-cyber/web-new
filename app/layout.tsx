import './globals.css';
import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif', display: 'swap' });
const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });

export const metadata: Metadata = {
  title: 'Shrikrishna Pure Veg Restaurant · Baramati',
  description:
    'Pure vegetarian flavours made for every family. North Indian, South Indian, Chinese, biryani, snacks and more in Baramati, Maharashtra.',
  keywords: ['Shrikrishna Pure Veg', 'vegetarian restaurant Baramati', 'pure veg Baramati', 'Indian restaurant Maharashtra'],
  openGraph: {
    title: 'Shrikrishna Pure Veg Restaurant · Baramati',
    description: 'Pure vegetarian flavours made for every family in Baramati, Maharashtra.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${inter.variable} font-sans`}>{children}</body>
    </html>
  );
}
