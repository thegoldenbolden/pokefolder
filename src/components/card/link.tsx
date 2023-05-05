import type { TCard } from '@tcg';
import Link from 'next/link';

import ClientImage from '@ui/image';
import format from '@lib/format';

export default function Card(card: TCard) {
  const name = format(card.name, {
    case: 'lowercase',
    '&': { from: '&', to: 'and' },
    "'s": { from: "'s", to: 's' },
    'lv.': { from: 'lv.', to: 'lv-' },
  });

  return (
    <Link prefetch={false} href={`/cards/${name}/${card.id}`}>
      <ClientImage
        src={card.images.large || card.images.small || '/back.png'}
        alt={card.name}
        width={250}
        height={350}
        sizes="(max-width: 768px) 12rem, (max-width: 1280px) 16rem, 16rem"
        className="drop-shadow-md transition-transform hover:scale-105 focus:scale-105"
        placeholder="blur"
      />
    </Link>
  );
}
