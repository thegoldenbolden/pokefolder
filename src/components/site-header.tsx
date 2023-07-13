import { Link } from '@/ui/link';
import { Searchbar } from './searchbar';

export default function Header() {
  return (
    <header className="py-2 md:py-6 z-50 flex gap-3 items-center justify-between">
      <Link
        highlight="none"
        className="font-bungee flex uppercase text-3xl rounded-sm outline-none px-1 focus-visible:ring focus-visible:ring-primary"
        href="/"
        aria-label="go to home"
      >
        <span className="hidden sm:block">Pokefolder</span>
        <span className="sm:hidden">PF</span>
      </Link>
      <Searchbar id="search" />
    </header>
  );
}
