import type { Metadata } from 'next';
import { bungee, rubik } from '@/lib/fonts';
import { getURL } from '@/lib/utils';
import { SWRConfig } from '@/components/swr-config';
import { Link } from '@/components/ui/link';
import { Searchbar } from '@/components/searchbar';
import { getSets, getTypes } from '@/lib/fetch';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(getURL()),
  applicationName: 'Pokefolder',
  title: {
    default: 'Pokefolder',
    template: '%s • Pokefolder',
  },
  keywords: [
    'Pokemon cards',
    'Pokemon TCG',
    'Card search',
    'Deck building',
    'Collectible card game',
    'Pokemon battles',
    'Strategy',
    'Rare cards',
    'Custom decks',
    'TCG app',
    'Pokemon card database',
    'Card collection',
    'Online deck builder',
    'Competitive play',
    'Trading card game',
  ],
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

export default async function RootLayout(props: React.PropsWithChildren) {
  getTypes('rarities');
  getTypes('types');
  getTypes('subtypes');
  getTypes('supertypes');
  getSets();

  return (
    <html lang="en" className={`${bungee.variable} ${rubik.variable}`}>
      <body className="font-rubik bg-background text-foreground">
        <div className="bg-image" />
        <SWRConfig>
          <div className="px-3 max-w-screen-xl min-h-svh mx-auto flex flex-col gap-6">
            <header className="py-2 md:py-6 z-50 flex gap-3 items-center justify-between">
              <Link
                className="font-bungee flex uppercase text-3xl rounded-sm outline-none px-1 focus-visible:px-1 focus-visible:ring focus-visible:ring-primary"
                href="/"
                aria-label="go to home"
              >
                <span className="hidden sm:block">Pokefolder</span>
                <span className="sm:hidden">PF</span>
              </Link>
              <Searchbar id="search" />
            </header>
            {props.children}
            <footer className="text-xs text-center max-w-screen-lg mx-auto py-6">
              The literal and graphical information presented on this site about
              Pokemon, including card data, Pokemon, The Pokemon TCG, and The
              Pokemon TCG Online and its trademarks are ©1995- 2023 Nintendo,
              The Pokémon Company International, Inc, and GAMEFREAK. This
              website is not produced, endorsed, supported, or affiliated with
              Nintendo, The Pokémon Company International, Inc, or GAMEFREAK.
              All other content © 2023 PokeFolder.
            </footer>
          </div>
        </SWRConfig>
      </body>
    </html>
  );
}
