import type { Metadata } from 'next';
import type { TSet } from '@tcg';
import NextImage from 'next/image';

import Searchbar from '@inputs/searchbar';
import StyledLink from '@link/styled';
import getData from '@lib/get-data';
import ClientImage from '@ui/image';
import format from '@lib/format';
import Link from 'next/link';

export const metadata: Metadata = {
  description: 'Find the best prices for you pokemon collector dreams.',
  keywords: 'pokemon, cards, collect, trading card game, tcg'
};

export default function Page() {
  return (
    <>
      <section className="flex order-2 sm:order-0 flex-col items-center justify-center gap-2 relative min-h-[36rem]">
        <div className="flex text-center flex-col gap-3 w-full sm:w-3/4">
          <h1 className="font-passion break-words text-5xl md:text-6xl uppercase">
            Find the best prices for your&nbsp;
            <span className="text-tw-secondary">collector</span> dreams
          </h1>
          <p className="text-lg text-white/75">{`Find your favorite Pokémon cards quickly and easily.`}</p>
          <div className="flex ml-auto mr-auto flex-col text-center gap-3 w-full sm:w-4/5 xl:w-3/5">
            <Searchbar
              id="searchbar-hero"
              placeholder="vikavolt, mew, cynthia"
              className="flex p-2 border-tw-secondary overflow-hidden text-white bg-transparent border-2 border-solid rounded-md"
            />
            <p className="break-words">
              Try&nbsp;
              <StyledLink
                className="font-bold lowercase"
                aria-label="vikavolt"
                href="/search?cards=vikavolt"
              >
                vikavolt
              </StyledLink>
              &nbsp;or&nbsp;
              <StyledLink
                className="font-bold lowercase"
                aria-label="mew, cynthia"
                href="/search?cards=mew,cynthia"
              >
                mew, cynthia
              </StyledLink>
              &nbsp;or&nbsp;
              <StyledLink
                className="font-bold lowercase"
                aria-label="browse by set"
                href="/sets"
              >
                Browse by Sets
              </StyledLink>
            </p>
          </div>
        </div>
      </section>
      <section>
        <div className="flex flex-wrap gap-2 justify-between items-baseline">
          <h2 className="font-bold text-2xl">Most Recent Sets</h2>
          <StyledLink
            href="/sets"
            aria-label="view all sets"
            className="hover:underline focus:underline font-bold uppercase"
          >
            View all sets
          </StyledLink>
        </div>
        <div className="flex relative items-center gap-4 py-4 px-3 snap-mandatory snap-x overflow-x-scroll">
          {/** @ts-expect-error Server Component */}
          <RecentSets />
        </div>
      </section>
    </>
  );
}

async function RecentSets() {
  const sets = await getData<TSet>('sets', null, {
    page: '1',
    select: ['id', 'images', 'name', 'releaseDate'],
    orderBy: ['-releaseDate'],
    pageSize: '15'
  });

  return sets.data.map((set) => {
    const name = format(set.name, {
      case: 'lowercase',
      '&': { from: '&', to: 'and' },
      "'s": { from: "'s", to: 's' }
    });

    return (
      <Link
        key={set.id}
        href={`/sets/${name}/${set.id}`}
        aria-label={set.name}
        className="group snap-end flex flex-col rounded-md bg-tw-gray/25"
      >
        <div className="relative h-40 px-16 aspect-video w-full">
          <ClientImage
            fill
            src={set.images.logo}
            alt={set.name ?? 'a pokemon card'}
            placeholder="blur"
            blurDataURL={set.images.logo}
            className="px-3 py-2 object-contain object-center rounded-md group-hover:scale-105 group-focus:scale-105 transition-transform"
            sizes="(max-width: 1280px) 16rem, 16rem"
          />
        </div>
        <div className="relative">
          <span className="absolute -top-5 right-2 rounded-full p-2 bg-tw-gray">
            <NextImage
              height={20}
              width={20}
              className="drop-shadow-md group-hover:scale-105 group-focus:scale-105 transition-transform"
              src={set.images.symbol}
              alt={`${set.name} symbol`}
            />
          </span>
          <div className="px-5 pt-5 pb-3 border-solid border-t-2 border-tw-gray">
            <span className="font-bold block w-max group-hover:text-tw-primary group-focus:text-tw-primary">
              {set.name}
            </span>
            <time className="text-sm">{set.releaseDate}</time>
          </div>
        </div>
      </Link>
    );
  });
}
