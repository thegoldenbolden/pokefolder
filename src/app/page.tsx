import { AlarmClock, BookImage, ScanSearch, Search } from "@/components/icons";
import { Searchbar } from "@/components/searchbar";
import { Input } from "@/components/ui/input";
import { Link } from "@/components/ui/link";
import { getQueryKey, getSearchUrl } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  description:
    "Unleash your Pokemon TCG prowess with Pokefolder! Discover rare cards, build custom decks, and conquer opponents. Dive into a world of Pokemon battles.",
};

const pages = [
  { title: "sets", href: "/sets", icon: BookImage },
  { title: "search", href: "/search", icon: ScanSearch },
  { title: "coming soon", href: "/", icon: AlarmClock },
];

export default function Page() {
  const cardKey = getQueryKey("cards");

  return (
    <main className="mx-auto flex max-w-screen-lg flex-col gap-12 py-16 lg:gap-20">
      <section className="flex flex-col items-center justify-center gap-6 py-8">
        <h1 className="gradient-text select-none text-center font-bungee text-4xl uppercase">
          Build the perfect deck
        </h1>
        <Searchbar
          id="search"
          className="group flex h-12 w-full max-w-[80%] items-center gap-2 rounded-lg border border-border bg-muted pl-2 text-sm focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-1 focus-within:ring-offset-background hover:bg-muted"
        >
          <label htmlFor="searchbar" className="sr-only">
            search cards
          </label>
          <Search className="hidden size-5 text-foreground/75 group-focus-within:text-foreground group-hover:text-foreground xs:inline xs:shrink-0" />
          <Input
            className="border-none bg-transparent px-2 py-1.5 outline-none"
            placeholder="Search cards"
            name="cards"
            id="searchbar"
            aria-label="Search cards"
            autoComplete="off"
          />
        </Searchbar>
        <p className="w-full max-w-[80%] text-center">
          Try searching&nbsp;
          <Link
            className="text-primary hover:text-primary/80"
            href={getSearchUrl(`${cardKey}=vikavolt`)}
          >
            vikavolt
          </Link>
          ,&nbsp;
          <Link
            className="text-primary hover:text-primary/80"
            href={getSearchUrl(`${cardKey}=mew,cynthia`)}
          >
            mew, cynthia
          </Link>
          &nbsp;or&nbsp;
          <Link className="text-primary hover:text-primary/80" href="/sets">
            browse by sets
          </Link>
        </p>
      </section>
      <section className="flex flex-wrap items-center justify-center gap-16">
        {pages.map((page) => (
          <div
            key={page.href}
            className="group flex aspect-video flex-col-reverse items-center gap-12"
          >
            <Link
              variant={null}
              href={page.href}
              prefetch={true}
              className="peer mx-auto block w-4/5 rounded-sm border border-border bg-foreground py-2 text-center text-sm font-semibold uppercase tracking-wide text-background shadow-2xl shadow-foreground group-first:bg-primary group-first:text-primary-foreground group-first:shadow-primary group-last:bg-accent group-last:text-accent-foreground group-last:shadow-accent"
            >
              {page.title}
            </Link>
            <div className="flex items-center opacity-25 duration-200 peer-hover:-translate-y-1 peer-hover:text-foreground peer-hover:opacity-100 group-first:peer-hover:text-primary group-last:peer-hover:text-accent peer-focus-visible:-translate-y-1 peer-focus-visible:text-foreground peer-focus-visible:opacity-100 group-first:peer-focus-visible:text-primary group-last:peer-focus-visible:text-accent lg:peer-hover:-translate-y-6 lg:peer-focus-visible:-translate-y-6">
              <page.icon className="size-24 translate-x-2 translate-y-4 -rotate-12 text-inherit opacity-[inherit] transition-all lg:size-24" />
              <page.icon className="size-24 text-inherit opacity-[inherit] transition-all lg:size-24 " />
              <page.icon className="size-24 -translate-x-2 translate-y-4 rotate-12 text-inherit opacity-[inherit] transition-all lg:size-24" />
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
