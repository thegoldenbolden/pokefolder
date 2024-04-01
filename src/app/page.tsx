import { Search } from "@/components/icons";
import { PokemonCard } from "@/components/pokemon/card";
import {
  PokemonCarousel,
  PokemonCarouselContent,
  PokemonCarouselEmpty,
  PokemonCarouselHeader,
  PokemonCarouselItem,
} from "@/components/pokemon/carousel";
import { CardLink } from "@/components/pokemon/link";
import { Searchbar } from "@/components/searchbar";
import { SiteFooter } from "@/components/site-footer";
import { Input } from "@/components/ui/input";
import { Link } from "@/components/ui/link";
import { getCards } from "@/lib/pokemon-tcg";
import { getQueryKey, getSearchUrl } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  description:
    "Unleash your Pokemon TCG prowess with Pokefolder! Discover rare cards, build custom decks, and conquer opponents. Dive into a world of Pokemon battles.",
};

export const revalidate = 604800;

export default async function Page() {
  const cards = await getCards(
    "pageSize=20&orderBy=-set.releaseDate,-cardmarket.prices.trendPrice",
  );
  const lastUpdated = new Date().toISOString().split("T")[0];
  const cardKey = getQueryKey("cards");

  return (
    <>
      <main className="mt-16 flex flex-col gap-12 lg:gap-20">
        <section className="mx-auto flex w-full max-w-screen-lg flex-col items-center justify-center gap-6 py-8">
          <h1 className="gradient-text select-none text-center font-bungee text-4xl uppercase">
            Build the perfect deck
          </h1>
          <Searchbar
            id="search"
            className="motion-safe:transform-colors group flex w-full max-w-[80%] items-center gap-1 rounded-md border border-border bg-input py-1 pl-2 focus-within:ring focus-within:ring-ring focus-within:ring-offset-1 focus-within:ring-offset-canvas"
          >
            <label htmlFor="searchbar" className="sr-only">
              search cards
            </label>
            <Search className="size-5 opacity-50 group-focus-within:opacity-100 group-hover:text-fg xs:inline xs:shrink-0" />
            <Input
              className="h-auto rounded-none border-none bg-transparent px-2 py-1.5 text-base outline-none placeholder:text-fg/50 focus-visible:placeholder:text-fg"
              placeholder="Search for a card"
              name="cards"
              id="searchbar"
              aria-label="search for a card"
              autoComplete="off"
            />
          </Searchbar>
          <p className="w-full max-w-[80%] text-center">
            Try searching&nbsp;
            <Link
              className="underline decoration-primary underline-offset-2 hover:text-fg/80"
              href={getSearchUrl(`${cardKey}=vikavolt`)}
            >
              vikavolt
            </Link>
            ,&nbsp;
            <Link
              className="underline decoration-primary underline-offset-2 hover:text-fg/80"
              href={getSearchUrl(`${cardKey}=mew,cynthia`)}
            >
              mew, cynthia
            </Link>
            &nbsp;or&nbsp;
            <Link
              className="underline decoration-primary underline-offset-2 hover:text-fg/80"
              href="/sets"
            >
              browse by sets
            </Link>
          </p>
        </section>
        <section className="mx-auto w-full max-w-screen-xl py-8">
          <PokemonCarousel>
            <PokemonCarouselHeader>
              <h2 className="text-xl font-semibold">Newest Cards</h2>
            </PokemonCarouselHeader>
            <PokemonCarouselContent>
              {!cards.count || !cards.data.length ? (
                <PokemonCarouselEmpty />
              ) : (
                <>
                  {cards.data.map((card, i) => (
                    <PokemonCarouselItem key={card.id}>
                      <CardLink
                        id={card.id}
                        name={card.name}
                        setName={card.set.name}
                      >
                        <PokemonCard
                          name={card.name}
                          priorityImg={card.images.small}
                          priorityImgFallback={card.images.large}
                          types={card.types}
                        />
                      </CardLink>
                    </PokemonCarouselItem>
                  ))}
                </>
              )}
            </PokemonCarouselContent>
            <footer className="px-3 text-end text-sm text-fg-soft">
              Updated at {lastUpdated}
            </footer>
          </PokemonCarousel>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
