import type { TSet } from '@tcg';
import type { Metadata } from 'next';
import { Suspense } from 'react';

import ScrollToSeries from '@inputs/scroll-to-series';
import groupSetsBySeries from '@lib/group-sets';
import getData from '@lib/get-data';
import SetCard from '@ui/set-card';

export const revalidate = 86400;
export const metadata: Metadata = {
  title: 'Sets',
  description: `See Pokemon cards based on their sets.`,
  keywords: 'pokemon cards, card sets, trading card game, tcg',
};

export default async function Page() {
  return (
    <Suspense fallback={<span>Loading..</span>}>
      {/** @ts-expect-error Server Component */}
      <Sets />
    </Suspense>
  );
}

async function Sets() {
  const sets = await getData<TSet>('sets', null, {
    page: '1',
    pageSize: '250',
    select: ['set', 'id', 'images', 'name', 'series', 'releaseDate'],
    orderBy: ['series'],
  });

  if (!sets?.totalCount) return <div>No sets found</div>;
  const { series: seriesNames, setsBySeries: series } = groupSetsBySeries(
    sets.data,
  );

  return (
    <>
      <div className="flex flex-col self-end gap-px sticky top-2 z-50">
        <ScrollToSeries options={seriesNames} />
      </div>
      <section className="flex flex-col gap-4 divide-y divide-tw-gray">
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
