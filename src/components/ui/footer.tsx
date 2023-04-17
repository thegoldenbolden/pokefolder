import Link from '@link/styled';
import { GithubIcon, GlobeIcon } from './icons';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="flex items-center justify-center flex-col gap-2 py-2 md:py-6 border-t-2 border-solid border-tw-secondary">
      <div className="flex flex-wrap gap-4 items-center justify-center sm:justify-between w-full text-white mb-2">
        <div>
          Powered by&nbsp;
          <Link
            className="font-bold"
            href="https://vercel.com"
            target="_blank"
            rel="noreferrer noopener"
          >
            Vercel
          </Link>
          ,&nbsp;
          <Link
            className="font-bold"
            href="https://pokemontcg.io"
            target="_blank"
            rel="noreferrer noopener"
          >{`Pokémon TCG API`}</Link>
        </div>
        <div className="flex gap-6 items-center flex-wrap">
          <Link target="_blank" href="https://jacobbolden.com" rel="noopener">
            <GlobeIcon className="w-6 h-6" />
          </Link>
          <Link
            target="_blank"
            rel="noopener"
            href="https://github.com/thegoldenbolden/pokefolder"
          >
            <GithubIcon className="w-6 h-6" />
          </Link>
        </div>
      </div>
      <div className="text-center text-sm">
        The literal and graphical information presented on this site about
        Pokemon, including card data, Pokemon, The Pokemon TCG, and The Pokemon
        TCG Online and its trademarks are ©1995-
        {year} Nintendo, The Pokémon Company International, Inc, and GAMEFREAK.
        This website is not produced, endorsed, supported, or affiliated with
        Nintendo, The Pokémon Company International, Inc, or GAMEFREAK. All
        other content © {year} PokeFolder.
      </div>
    </footer>
  );
}
