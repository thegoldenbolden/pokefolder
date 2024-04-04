import { ChevronLeft, ChevronRight } from "@/components/icons";
import { PokemonCard } from "@/components/pokemon/card";
import { CardLink } from "@/components/pokemon/link";
import { ScrollTop } from "@/components/scroll-top";
import { Cards, Filter, Stats } from "@/components/sets/stats";
import { SiteFooter } from "@/components/site-footer";
import { Image } from "@/components/ui/image";
import { Link } from "@/components/ui/link";
import {
  getExpansion,
  getExpansionCards,
  groupBySeries,
} from "@/lib/pokemon-tcg";
import type { CardObject } from "@/types/pokemon-tcg";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type Segment = {
  params: { name: string };
};

export default async function Page({ params }: Segment) {
  const expansion = getExpansion(params.name);

  if (!expansion) {
    notFound();
  }

  const cards = await getExpansionCards(expansion);

  if (!cards.length) {
    return <main>No cards found</main>;
  }

  const stats: Record<Filter, Map<string, number>> = {
    rarity: new Map(),
    subtypes: new Map(),
    supertype: new Map(),
    types: new Map(),
  };

  for (const card of cards) {
    const types = card.types || [];
    const subtypes = card.subtypes || [];

    types.forEach((type) =>
      stats.types.set(type, (stats.types.get(type) || 0) + 1),
    );
    subtypes.forEach((type) =>
      stats.subtypes.set(type, (stats.subtypes.get(type) || 0) + 1),
    );
    card.rarity &&
      stats.rarity.set(card.rarity, (stats.rarity.get(card.rarity) ?? 0) + 1);
    card.supertype &&
      stats.supertype.set(
        card.supertype,
        (stats.supertype.get(card.supertype) ?? 0) + 1,
      );
  }

  const { series } = groupBySeries();
  const expansions =
    series.find((s) => s.name === expansion.series.name)?.expansions || [];
  let expansionIdx = expansions.findIndex((e) => e.id === expansion.id);
  expansionIdx = expansionIdx === -1 ? 0 : expansionIdx;
  const nextExpansion =
    expansions[expansions.length - 1 === expansionIdx ? 0 : expansionIdx + 1];
  const previousExpansion =
    expansions[expansionIdx <= 0 ? expansions.length - 1 : expansionIdx - 1];

  return (
    <>
      <main className="flex flex-col gap-8">
        <Image
          height={768}
          width={768}
          className="fixed left-1/2 top-1/2 -z-[1] -translate-x-1/2 -translate-y-1/2 object-contain object-center p-3 opacity-50"
          src={expansion.images.logo.src}
          alt={expansion.images.logo.alt}
        />
        <div className="sticky top-12 z-50 w-full self-start border-b border-b-border bg-canvas">
          <div className="mx-auto flex w-full max-w-screen-xl flex-wrap items-center justify-between gap-2 px-3 py-1">
            <h1 className="max-w-screen-xl truncate font-bungee text-xl">
              {expansion.name}
            </h1>
            <div className="flex grow flex-wrap text-sm sm:grow-0">
              <Link
                variant="ghost"
                className="basis-1/2 gap-2 overflow-hidden px-2 py-1 sm:basis-auto"
                href={`/sets/${previousExpansion.href}`}
              >
                <ChevronLeft className="mr-auto size-4 shrink-0" />
                <span className="grow truncate text-ellipsis text-center">
                  {previousExpansion.name}
                </span>
              </Link>
              <Link
                variant="ghost"
                className="basis-1/2 gap-2 overflow-hidden px-2 py-1 sm:basis-auto"
                href={`/sets/${nextExpansion.href}`}
              >
                <span className="grow truncate text-ellipsis text-center">
                  {nextExpansion.name}
                </span>
                <ChevronRight className="ml-auto size-4 shrink-0" />
              </Link>
            </div>
          </div>
        </div>
        <section className="mx-auto flex w-full max-w-screen-xl flex-col gap-1 px-3 xl:px-0">
          <Suspense
            fallback={
              <div className="h-12 w-full rounded-xl border border-border bg-muted motion-safe:animate-pulse" />
            }
          >
            <Stats tabs={stats} />
          </Suspense>
        </section>
        <section className="mx-auto w-full max-w-screen-xl px-3 xl:px-0">
          <Suspense fallback={<CardsFallback cards={cards} />}>
            <Cards cards={cards} />
          </Suspense>
        </section>
        <ScrollTop />
      </main>
      <SiteFooter />
    </>
  );
}

function CardsFallback({ cards }: { cards: CardObject[] }) {
  return (
    <ul className="grid w-full grid-cols-2 items-center gap-4 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {cards.map((card) => {
        return (
          <li key={card.id}>
            <CardLink
              id={card.id}
              name={card.name}
              aria-label={`${card.name} from ${card.set.name}`}
            >
              <PokemonCard
                name={card.name}
                alt={`${card.name} from ${card.set.name}`}
                src={card.images.small}
                types={card.types}
              />
            </CardLink>
          </li>
        );
      })}
    </ul>
  );
}
