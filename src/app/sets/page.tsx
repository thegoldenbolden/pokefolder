import type { Metadata } from 'next';
import { Suspense } from 'react';
import { groupSetsBySeries } from '@/lib/utils';
import SetCard from '@/ui/set-card';
import { getSets } from '@/lib/fetch';
import SeriesCombobox from '@/components/series-combobox';
import { keywords } from '@/lib/tcg';

export const revalidate = 86400;
export const metadata: Metadata = {
  title: 'Sets',
  description:
    'Explore a comprehensive collection of Pokemon TCG card sets. From classic expansions to the latest releases, dive into the world of Pokemon cards. Discover the unique themes, artwork, and gameplay mechanics of each set. Complete your card collection and become a true Pokemon TCG connoisseur',
  keywords: [
    'Pokemon card sets',
    'TCG expansions',
    'Complete card sets',
    'Set collection',
    'All card sets',
    'Set catalog',
    'Pokemon TCG releases',
    'Card set archive',
    'Complete card list',
    'Set checklist',
    'Expansion packs',
    'Set gallery',
    'Card set database',
    'Set details',
    'Set history',
    ...keywords,
  ],
};

export default async function Page() {
  return (
    <main className="my-6 md:my-10 flex flex-col gap-2">
      <Suspense fallback={<SetsFallback />}>
        <Sets />
      </Suspense>
    </main>
  );
}

async function SetsFallback() {
  return (
    <div className="grid gap-2 grid-cols-fluid lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={`sets-fallback-${i}`} className="h-40 aspect-video" />
      ))}
    </div>
  );
}

async function Sets() {
  const sets = await getSets();
  if (!sets?.count) return <div>No sets found</div>;
  const { series: seriesNames, setsBySeries: series } = groupSetsBySeries(
    sets.data,
  );

  return (
    <>
      <SeriesCombobox series={seriesNames} />
      <section className="flex flex-col gap-4 divide-y divide-spotlight">
        {series.map(([series, sets]) => {
          return (
            <div key={series} className="py-2 space-y-2">
              <h2 id={series} className="text-2xl">
                <span>{series}</span>&nbsp;
                <sub className="text-sm">[{sets.length}]</sub>
              </h2>
              <div className="grid gap-2 grid-cols-fluid lg:grid-cols-3 xl:grid-cols-4">
                {sets.map((set) => (
                  <SetCard {...set} key={set.id} />
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
}
