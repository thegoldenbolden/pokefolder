import type { ResolvingMetadata } from 'next';
import { Suspense } from 'react';
import { getSets } from '@/lib/fetch';
import { Link } from '@/components/ui/link';
import { Image } from '@/components/ui/image';
import type { TSet } from '@/types/tcg';

export async function generateMetadata(_, parent: ResolvingMetadata) {
  const keywords = (await parent)?.keywords || [];
  return {
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
}

export default function Page() {
  return (
    <main className="py-16 flex flex-col gap-2">
      <Suspense fallback={<SetsFallback />}>
        <Sets />
      </Suspense>
    </main>
  );
}

function SetsFallback() {
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

  const group: { [key: string]: TSet[] } = {};

  sets.data.forEach((set) => {
    if (!set.series) return;
    group[set.series] ??= [];
    group[set.series].push(set);
  });

  const series = Object.entries(group);

  return (
    <section className="flex flex-col gap-4 z-0">
      {series.map(([series, sets]) => {
        return (
          <div key={series} className="py-2 space-y-2">
            <h2
              id={series}
              className="flex relative items-center justify-between gap-2 border-y border-border p-2"
            >
              {series}
            </h2>
            <div className="grid py-6 gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {sets.map((set) => (
                <Link
                  key={set.id}
                  href={`/search?sets=${set.id}`}
                  aria-labelledby="setname"
                  className="group flex flex-col p-2 gap-4 items-center"
                >
                  <Image
                    src={set.images.logo}
                    alt={set.name ?? 'a pokemon card'}
                    placeholder="blur"
                    width={192}
                    height={128}
                    blurDataURL={set.images.logo}
                    className="h-40 object-contain object-center motion-safe:transition-transform group-hover:scale-105 group-focus-visible:scale-105"
                  />
                  <div className="flex flex-col gap-2 w-full justify-center motion-safe:transition-shadow group-focus-visible:shadow-[0_-25px_50px_-12px_var(--tw-shadow-color)] group-hover:shadow-[0_-25px_50px_-12px_var(--tw-shadow-color)] items-center py-2 px-4 rounded-sm shadow-border bg-muted border border-border">
                    <span id="setname" className="group-hover:text-primary">
                      {set.name}
                    </span>
                    <span className="text-xs">{set.releaseDate}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
