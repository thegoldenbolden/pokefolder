import type { TCard } from '@/types/tcg';
import { Link } from '@/ui/link';
import { Image } from '@/ui/image';
import { getCardUrl } from '@/lib/utils';

export function CardLink(card: TCard) {
  return (
    <Link
      className="focus-visible:outline-1 focus-visible:outline-primary group self-start inline"
      href={getCardUrl(card)}
    >
      <Image
        referrerPolicy="no-referrer"
        src={card.images.small || card.images.large || '/back.png'}
        alt={card.name}
        width={250}
        height={350}
        sizes="(max-width: 768px) 12rem, (max-width: 1280px) 16rem, 16rem"
        className="transition-transform group-hover:scale-105 group-focus-visible:scale-105"
        placeholder="blur"
      />
    </Link>
  );
}
