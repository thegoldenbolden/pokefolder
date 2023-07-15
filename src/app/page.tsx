import type { Metadata } from 'next';
import { Clock, Gem, Search } from '@/ui/icons';
import { Searchbar } from '@/components/searchbar';
import { cn } from '@/lib/utils';
import { Link } from '@/ui/link';

export const metadata: Metadata = {
  description:
    'Unleash your Pokemon TCG prowess with Pokefolder! Discover rare cards, build custom decks, and conquer opponents. Dive into a world of Pokemon battles.',
};

const pages = [
  { title: 'view sets', href: '/sets', icon: Gem },
  { title: 'search', href: '/search', icon: Search },
  { title: 'coming soon', href: '/', icon: Clock },
] as const;

export default function Page() {
  return (
    <main className="my-12 lg:my-36 flex flex-col gap-20 lg:gap-36">
      <section className="flex flex-col items-center justify-center gap-2 relative">
        <div className="flex text-center flex-col items-center justify-center gap-3 w-full sm:w-3/4">
          <h1 className="font-bungee select-none gradient-text break-words text-5xl md:text-6xl uppercase">
            Build the perfect deck
          </h1>
          <Searchbar id="search" to="/search" size="md" />
          <p className="w-4/5 md:w-3/5">
            Try searching&nbsp;
            <Link
              variant="primary"
              highlight="primary"
              focus="ring"
              className="focus-visible:px-1"
              size="bold"
              href="/search?cards=vikavolt"
            >
              vikavolt
            </Link>
            ,&nbsp;
            <Link
              variant="primary"
              highlight="primary"
              focus="ring"
              className="focus-visible:px-1"
              size="bold"
              href="/search?cards=mew,cynthia"
            >
              mew, cynthia
            </Link>
            &nbsp;or&nbsp;
            <Link
              prefetch={true}
              variant="primary"
              highlight="primary"
              focus="ring"
              className="focus-visible:px-1"
              size="bold"
              href="/sets"
            >
              browse by sets
            </Link>
          </p>
        </div>
      </section>
      <section className="flex items-center justify-evenly flex-wrap gap-6 lg:gap-3 relative after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-z-10 after:-translate-y-1/2 after:hidden lg:after:block after:content-[''] after:w-1/2 after:mx-auto after:h-8 after:bg-gradient-to-r after:from-foreground after:via-spotlight after:to-accent">
        {pages.map((page, i) => (
          <Link
            prefetch={page.href !== '/search'}
            key={page.href}
            href={page.href}
            highlight="none"
            className={cn(
              'relative w-full h-screen max-h-[9rem] xs:aspect-video xs:max-w-[16rem] overflow-hidden rounded-sm text-xl uppercase font-bold transition-transform hover:-translate-y-1 focus-visible:-translate-y-1 sm:last:col-span-2 sm:last:max-h-[9rem] lg:last:col-span-1 lg:last:max-h-auto',
              {
                'bg-foreground text-background': i == 0,
                'bg-spotlight text-foreground': i == 1,
                'bg-accent text-accent-foreground': i == 2,
              },
            )}
          >
            <span className="absolute bottom-3 right-3">{page.title}</span>
            <page.icon className="w-full h-full absolute top-0 -left-1/3 opacity-25" />
          </Link>
        ))}
      </section>
    </main>
  );
}
