import type { Metadata } from 'next';
import {
  // Geist, Geist_Mono,
  Plus_Jakarta_Sans,
} from 'next/font/google';
import './globals.css';
import Layout from '@/components/Layout';
import SmoothScroll from '@/components/SmoothScroll';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta-sans',
});

// const geistSans = Geist({
//   variable: '--font-geist-sans',
//   subsets: ['latin'],
// });

// const geistMono = Geist_Mono({
//   variable: '--font-geist-mono',
//   subsets: ['latin'],
// });

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'To Showcase Our Projects',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='scroll-smooth h-full w-full'>
      <SmoothScroll>
        <body
          className={`${plusJakartaSans.variable} {geistSans.variable} {geistMono.variable} antialiased`}
        >
          <Layout showSidebar={false}>{children}</Layout>
        </body>
      </SmoothScroll>
    </html>
  );
}
