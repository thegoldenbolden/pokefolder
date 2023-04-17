import type { TSet } from '@tcg';
import Link from 'next/link';
import Image from '@ui/image';
import format from '@lib/format';

export default function Set(set: React.PropsWithChildren & TSet) {
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
      className="group snap-center md:snap-end flex flex-col rounded-md bg-tw-gray/25"
    >
      <div className="relative h-40 px-16 aspect-video">
        <Image
          fill
          src={set.images.logo}
          alt={set.name ?? 'a pokemon card'}
          placeholder="blur"
          blurDataURL={set.images.logo}
          className="p-3 object-contain object-center group-hover:scale-105 group-focus:scale-105 transition-transform"
          sizes="(max-width: 1280px) 16rem, 16rem"
        />
      </div>
      <div className="relative">
        <span className="aspect-square absolute flex items-center justify-center -top-5 right-2 rounded-full p-2 bg-tw-gray">
          <Image
            height={24}
            width={24}
            sizes="1.5rem"
            className="drop-shadow-md w-6 h-6 group-hover:scale-105 object-center object-contain group-focus:scale-105 transition-transform"
            src={set.images.symbol}
            alt={`${set.name} symbol`}
          />
        </span>
        <div className="px-5 pt-5 pb-3 border-solid border-t-2 border-tw-gray">
          <span className="font-bold block group-hover:text-tw-primary group-focus:text-tw-primary">
            {set.name}
          </span>
          <span className="text-sm">{set.releaseDate}</span>
        </div>
      </div>
    </Link>
  );
}
