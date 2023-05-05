import type { TCard, TQueryParams } from '@tcg';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Suspense } from 'react';

import AdvancedSearch from '@forms/advanced-search';
import PageControls from '@ui/page-controls';
import SearchModal from '@modals/search';
import getData from '@lib/get-data';
import Skeleton from '@ui/skeleton';
import Card from '@card/link';
import { blur } from '@ui/image';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Search',
  keywords: 'search, pokemon, trading card game, tcg',
  description:
    'Search for Pokémon cards and get detailed information such as current prices, artists, and more.',
};

type Params = { searchParams: TQueryParams };
export default function Page({ searchParams }: Params) {
  return (
    <div id="top" className="space-y-6">
      <div className="flex flex-wrap gap-2 justify-center items-center sm:justify-between  z-50 py-4">
        <SearchModal>
          {/** @ts-expect-error Server Component */}
          <AdvancedSearch />
        </SearchModal>
        <Suspense fallback={<Skeleton height="h-[1rem]" width="w-[14rem]" />}>
          {/** @ts-expect-error Server Component */}
          <PageControls route="/search" searchParams={searchParams} />
        </Suspense>
      </div>
      <section className="min-h-screen">
        <Suspense fallback={<CardsFallback />}>
          {/** @ts-expect-error Server Component */}
          <Cards params={searchParams} />
        </Suspense>
      </section>
      <Suspense fallback={<Skeleton height="h-[1rem]" width="w-[14rem]" />}>
        <div className="flex justify-center items-center">
          {/** @ts-expect-error Server Component */}
          <PageControls route="/search" searchParams={searchParams} />
        </div>
      </Suspense>
    </div>
  );
}

async function Cards({ params }: { params: TQueryParams }) {
  const cards = await getData<TCard>('cards', params, null);
  if (!cards?.data || cards.totalCount === 0) {
    return (
      <div className="h-96 flex text-2xl items-center justify-center">
        No Cards Found
      </div>
    );
  }
  return (
    <ul className="grid gap-3 justify-items-center items-center grid-cols-fluid-sm md:grid-cols-fluid">
      {cards.data.map((card) => (
        <li key={card.id}>
          <Card {...card} />
        </li>
      ))}
    </ul>
  );
}

function CardsFallback() {
  return (
    <ul className="grid gap-3 justify-items-center items-center grid-cols-fluid-sm md:grid-cols-fluid">
      {Array.from({ length: 25 }).map((_, i) => (
        <li key={`fallback-${i}`}>
          <Image
            alt="card image fallback"
            src={blur}
            width={250}
            height={350}
            className="w-[250px] h-[350px]"
          />
        </li>
      ))}
    </ul>
  );
}
