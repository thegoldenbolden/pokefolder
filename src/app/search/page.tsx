import type { TQueryParams } from '@/types/tcg';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import PageControls from '@/components/gallery/page-controls';
import { ViewAs } from '@/components/gallery/view-as';
import Spinner from '@/components/ui/spinner';
import Form from '@/components/search-form';
import Table from '@/components/gallery/table';
import Images from '@/components/gallery/images';
import { keywords } from '@/lib/tcg';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Search',
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

type Params = { searchParams: TQueryParams };
export default function Page({ searchParams }: Params) {
  return (
    <main className="my-6 md:my-10 flex flex-col gap-2">
      <div className="flex items-center xs:justify-between gap-1 flex-wrap">
        <div className="flex gap-1 items-center">
          <Form />
          <ViewAs searchParams={searchParams} />
        </div>
        <PageControls searchParams={searchParams} route="/search" />
      </div>
      <section>
        <Suspense fallback={<Spinner />}>
          {searchParams.view === 'table' ? (
            <Table params={searchParams} />
          ) : (
            <Images params={searchParams} />
          )}
        </Suspense>
      </section>
    </main>
  );
}
