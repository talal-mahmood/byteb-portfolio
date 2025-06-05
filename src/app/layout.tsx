import type { Metadata } from 'next';
import {
  // Geist, Geist_Mono,
  Plus_Jakarta_Sans,
} from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import Layout from '@/components/Layout';
// import SmoothScroll from '@/components/SmoothScroll';
// import Head from 'next/head';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta-sans',
});

const crosstenSoft = localFont({
  src: [
    {
      path: '../fonts/CrosstenSoft Black.otf',
      style: 'black',
      weight: '900',
    },
    {
      path: '../fonts/CrosstenSoft Bold.otf',
      style: 'normal',
      weight: '700',
    },
    {
      path: '../fonts/CrosstenSoft Medium.otf',
      style: 'medium',
      weight: '500',
    },
    {
      path: '../fonts/CrosstenSoft Light.otf',
      style: 'light',
      weight: '300',
    },
    {
      path: '../fonts/CrosstenSoft Thin.otf',
      style: 'thin',
      weight: '100',
    },
  ],
  variable: '--font-crossten-soft',
});

export const metadata: Metadata = {
  title: 'Bytebricks | Portfolio',
  description: `AI.
Made Ethical.
Designed Beautifully.
Delivered Smartly.
From chatbots to automation and on-premise models, we craft AI that fits your business, protects your data, and accelerates your growth—with ethics and experience at the core.`,
  metadataBase: new URL('https://byteb.io/portfolio'),
  alternates: {
    canonical: 'https://byteb.io/portfolio',
  },
  openGraph: {
    title: 'Bytebricks | Portfolio',
    description: `AI.
Made Ethical.
Designed Beautifully.
Delivered Smartly.
From chatbots to automation and on-premise models, we craft AI that fits your business, protects your data, and accelerates your growth—with ethics and experience at the core.`,
    url: 'https://byteb.io/portfolio',
    siteName: 'Bytebricks | Portfolio',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Bytebricks - Generative AI Solutions & Development Services',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: [{ url: '/portfolio/favicon.png' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='scroll-smooth h-full w-full'>
      {/* <Head>
        <link rel='icon' href='/portfolio/logo.png' />
      </Head> */}
      {/* <SmoothScroll> */}
        <body
          className={`${plusJakartaSans.variable} ${crosstenSoft.variable} {geistSans.variable} {geistMono.variable} antialiased`}
        >
          <Layout>{children}</Layout>
        </body>
      {/* </SmoothScroll> */}
    </html>
  );
}
