import type { Metadata } from 'next';
import { Suspense } from 'react';
import PageControls from '@/components/gallery/page-controls';
import ViewAs from '@/components/gallery/view-as';
import Form from '@/components/search-form';
import { keywords } from '@/lib/tcg';
import Gallery from '@/components/gallery';
import { FormProvider } from '@/context/search';
import SWRConfig from '@/components/swr-config';

export const metadata: Metadata = {
  title: 'Search',
  alternates: { canonical: '/search' },
  keywords: [
    'Pokemon card search',
    'Card lookup',
    'Card finder',
    'Card database',
    'Pokemon TCG search',
    'Find Pokemon cards',
    'Search for cards',
    'Card collection search',
    'Pokemon card inventory',
    'Card catalog',
    'Card exploration',
    'Pokemon card database',
    'Trading card search',
    'Card rarity search',
    'Card details lookup',
    ...keywords,
  ],
  description:
    'Discover and find your favorite Pokemon cards with ease. Our powerful search feature allows you to quickly locate specific cards, explore rarities, and build your perfect deck. Unleash your strategic skills in the Pokemon TCG and dominate the competition',
};

export default function Page() {
  return (
    <main className="my-6 md:my-10 flex flex-col gap-3">
      <Suspense>
        <SWRConfig>
          <FormProvider>
            <div className="flex items-center xs:justify-between gap-1 flex-wrap">
              <div className="flex gap-1 items-center">
                <Form />
                <ViewAs />
              </div>
              <PageControls />
            </div>
            <Gallery />
          </FormProvider>
        </SWRConfig>
      </Suspense>
    </main>
  );
}
