import type { Metadata } from 'next';
import { bungee, rubik } from '@/lib/fonts';
import Footer from '@/components/site-footer';
import Header from '@/components/site-header';
import { getURL } from '@/lib/utils';
import { keywords } from '@/lib/tcg';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(getURL()),
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
  colorScheme: 'dark',
  themeColor: 'black',
  title: {
    default: 'Pokefolder',
    template: '%s • Pokefolder',
  },
  applicationName: 'Pokefolder',
  keywords,
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

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <html lang="en" className={`${bungee.variable} ${rubik.variable}`}>
      <body className="font-rubik bg-background text-foreground">
        <div className="bg-image" />
        <div className="px-3 max-w-screen-xl mx-auto ">
          <Header />
          {props.children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
