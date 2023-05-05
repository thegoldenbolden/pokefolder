import type { Metadata } from 'next';
import { passion, montserrat } from '@lib/fonts';
import Footer from '@ui/footer';
import Header from '@ui/header';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Pokefolder',
    template: '%s | Pokefolder',
  },
  applicationName: 'Pokefolder',
  keywords: 'pokemon, trading card game, tcg',
  robots: {
    index: true,
    follow: false,
    nocache: true,
    noimageindex: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${passion.variable} ${montserrat.variable}`}>
      <body className="px-3 max-w-screen-xl mx-auto font-montserrat bg-tw-black text-white">
        <div className="bg-image" />
        <Header />
        <main className="py-3">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
