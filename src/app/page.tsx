import type { Metadata } from 'next';
import { BookImage, ScanSearch, AlarmClock } from '@/components/icons';
import { Searchbar } from '@/components/searchbar';
import { Link } from '@/ui/link';

export const metadata: Metadata = {
  description:
    'Unleash your Pokemon TCG prowess with Pokefolder! Discover rare cards, build custom decks, and conquer opponents. Dive into a world of Pokemon battles.',
};

const pages = [
  { title: 'sets', href: '/sets', icon: BookImage },
  { title: 'search', href: '/search', icon: ScanSearch },
  { title: 'coming soon', href: '/', icon: AlarmClock },
];

export default function Page() {
  return (
    <main className="z-10 flex flex-col gap-12 lg:gap-20 py-16 max-w-screen-lg mx-auto">
      <section className="py-8 flex flex-col gap-6 items-center justify-center z-10">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bungee select-none gradient-text text-center uppercase">
          Build the perfect deck
        </h1>
        <Searchbar id="search" className="max-w-[80%] bg-muted w-full p-2" />
        <p className="max-w-[80%] w-full text-center">
          Try searching&nbsp;
          <Link
            className="text-primary hover:text-primary/80"
            href="/search?cards=vikavolt"
          >
            vikavolt
          </Link>
          ,&nbsp;
          <Link
            className="text-primary hover:text-primary/80"
            href="/search?cards=mew,cynthia"
          >
            mew, cynthia
          </Link>
          &nbsp;or&nbsp;
          <Link
            prefetch={true}
            className="text-primary hover:text-primary/80"
            href="/sets"
          >
            browse by sets
          </Link>
        </p>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-y-16 lg:grid-cols-3 sm:gap-16 rounded-sm items-center">
        {pages.map((page, i) => (
          <div
            key={page.href}
            className="group flex items-center flex-col-reverse gap-8 lg:last:col-span-1 last:col-span-full"
          >
            <Link
              variant={null}
              href={page.href}
              prefetch={page.href !== '/search'}
              className="peer shadow-2xl w-4/5 lg:w-full shadow-foreground group-first:shadow-primary group-last:shadow-accent block bg-foreground text-background group-first:text-primary-foreground group-first:bg-primary group-last:text-accent-foreground group-last:bg-accent border py-2 text-center border-border rounded-sm uppercase text-sm tracking-wide font-semibold"
            >
              {page.title}
            </Link>
            <div className="flex items-center opacity-25 peer-hover:opacity-100 peer-focus-visible:opacity-100 duration-200 peer-hover:text-foreground peer-focus-visible:text-foreground group-first:peer-hover:text-primary group-first:peer-focus-visible:text-primary group-last:peer-hover:text-accent group-last:peer-focus-visible:text-accent peer-hover:-translate-y-1 peer-focus-visible:-translate-y-1 lg:peer-hover:-translate-y-6 lg:peer-focus-visible:-translate-y-6">
              <page.icon className="transition-all size-24 text-inherit opacity-[inherit] lg:size-24 -rotate-12 translate-y-4 translate-x-2" />
              <page.icon className="transition-all size-24 text-inherit opacity-[inherit] lg:size-24 " />
              <page.icon className="transition-all size-24 text-inherit opacity-[inherit] lg:size-24 rotate-12 translate-y-4 -translate-x-2" />
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
