import Link from 'next/link';
import Searchbar from '@inputs/searchbar';
import { passion } from '@lib/fonts';

export default function Header() {
  return (
    <header className="py-2 md:py-6 z-50 drop-shadow-md flex gap-3 items-center justify-between border-solid border-b-2 border-tw-secondary">
      <Link
        prefetch={false}
        className={`${passion.className} flex uppercase text-4xl`}
        href="/"
        aria-label="go to home"
      >
        <span className="text-tw-secondary">Poke</span>
        <span>Folder</span>
      </Link>
      <Searchbar
        id="searchbar-header"
        className="hidden sm:flex text-white p-2 border-solid border-2 border-tw-secondary bg-transparent rounded-md"
      />
    </header>
  );
}
