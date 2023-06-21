import type { TCard, TQueryParams, TSetFull } from '@tcg';
import { Suspense } from 'react';

import { formatSetName } from '@lib/format';
import PageControls from '@ui/page-controls';
import { API_URL } from '@lib/config';
import Skeleton from '@ui/skeleton';
import getData from '@lib/get-data';
import Card from '@card/link';
import Image, { blur } from '@ui/image';

type SetProps = {
  searchParams: TQueryParams;
  params: { name: string; id: string };
};

async function getSet(id: string): Promise<{ data: TSetFull } | null> {
  try {
    const response = await fetch(`${API_URL}/sets/${id}`);
    if (!response.ok) throw new Error('Failed to fetch set');
    return response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const revalidate = 86400;

export async function generateMetadata({ params }: SetProps) {
  const set = await getSet(params.id);
  if (!set?.data) return { title: 'No cards found.' };
  return {
    title: `${set.data.series} | ${set.data.name}`,
    keywords: `${set.data.series}, ${set.data.name}, pokemon, cards, trading card game`,
    description: `See cards from ${set.data.series}: ${set.data.name}`,
  };
}

export default async function Page({ params, searchParams }: SetProps) {
  const route = `/sets/${formatSetName(params.name)}/${params.id}`;
  searchParams = { ...searchParams, sets: params.id };

  return (
    <>
      <div id="top" className="space-y-6">
        <div className="flex flex-wrap gap-2 justify-center items-center sm:justify-between  z-50 py-4">
          <Suspense
            fallback={
              <div className="motion-safe:animate-pulse bg-tw-gray w-[14rem] h-[1rem]" />
            }
          >
            <SetHeading setId={params.id} />
          </Suspense>
          <Suspense fallback={<Skeleton height="h-[1rem]" width="w-[14rem]" />}>
            <PageControls route={route} searchParams={searchParams} />
          </Suspense>
        </div>
        <section className="min-h-screen">
          <Suspense fallback={<CardsFallback />}>
            <Cards searchParams={searchParams} />
          </Suspense>
        </section>
        <Suspense fallback={<Skeleton height="h-[1rem]" width="w-[14rem]" />}>
          <div className="flex justify-center items-center">
            <PageControls route={route} searchParams={searchParams} />
          </div>
        </Suspense>
      </div>
    </>
  );
}

async function SetHeading({ setId }: { setId: string }) {
  const set = await getSet(setId);
  if (!set?.data) return <h1 className="font-bold text-2xl">No Set Found</h1>;
  return (
    <h1 className="font-bold text-2xl">{`${set.data.series}: ${set.data.name}`}</h1>
  );
}

async function Cards({ searchParams }: { searchParams: TQueryParams }) {
  const cards = await getData<TCard>('cards', searchParams, null);
  if (!cards?.data || cards.totalCount === 0) {
    return (
      <div className="h-96 text-2xl flex items-center justify-center">
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
