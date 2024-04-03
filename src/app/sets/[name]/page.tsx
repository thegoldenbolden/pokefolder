import { ChevronLeft } from "@/components/icons";
import { PokemonCard } from "@/components/pokemon/card";
import { CardLink } from "@/components/pokemon/link";
import { ScrollTop } from "@/components/scroll-top";
import { Cards, Filter, Stats } from "@/components/sets/stats";
import { SiteFooter } from "@/components/site-footer";
import { Image } from "@/components/ui/image";
import { Link } from "@/components/ui/link";
import { getAllCardsFromExpansion, getExpansion } from "@/lib/pokemon-tcg";
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

  const cards = await getAllCardsFromExpansion(expansion.id);

  if (!cards.length) {
    return <main>No cards found</main>;
  }

  const stats: Record<Filter, Map<string, number>> = {
    rarities: new Map(),
    subtypes: new Map(),
    supertypes: new Map(),
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
      stats.rarities.set(
        card.rarity,
        (stats.rarities.get(card.rarity) ?? 0) + 1,
      );
    card.supertype &&
      stats.supertypes.set(
        card.supertype,
        (stats.supertypes.get(card.supertype) ?? 0) + 1,
      );
  }

  return (
    <>
      <main className="mx-auto flex w-full max-w-screen-xl flex-col gap-8 px-3 py-6 xl:px-0">
        <Image
          height={768}
          width={768}
          className="fixed left-1/2 top-1/2 -z-[1] -translate-x-1/2 -translate-y-1/2 object-contain object-center p-3 opacity-50"
          src={expansion.images.logo.src}
          alt={expansion.images.logo.alt}
        />
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2 text-xl">
            <Image
              src={expansion.images.symbol.src}
              alt={expansion.images.symbol.alt}
              height={40}
              width={40}
              className="size-8"
            />
            <h1 className="font-bungee text-xl">{expansion.name}</h1>
          </div>
          <Link className="group self-start" variant={null} href="/sets">
            <ChevronLeft className="size-4" />
            <span className="decoration-2 group-hover:underline group-focus-visible:underline">
              Back to expansions
            </span>
          </Link>
        </div>
        <section className="flex flex-col gap-2">
          <Suspense
            fallback={
              <div className="h-12 w-full rounded-xl border border-border bg-muted motion-safe:animate-pulse" />
            }
          >
            <Stats cards={cards} stats={stats} />
          </Suspense>
        </section>
        <section>
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
