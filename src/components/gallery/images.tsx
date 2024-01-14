'use client';
import { CardLink } from '@/components/card/link';
import { useCards } from '@/hooks/use-cards';
import { blur, Image } from '@/ui/image';
import { DEFAULT_PAGE_SIZE } from '@/lib/tcg';
import { useSearchParams } from 'next/navigation';

export function Images() {
  const { cards, isLoading, error } = useCards();
  const params = useSearchParams();
  const size = parseInt(`${params.get('pageSize')}`) || DEFAULT_PAGE_SIZE;

  if (isLoading) {
    return (
      <ul className="grid gap-3 justify-items-center items-center grid-cols-fluid-sm md:grid-cols-fluid">
        {Array.from({ length: size }).map((_, i) => (
          <li key={`fallback-${i}`}>
            <Image
              alt="card image fallback"
              src={blur}
              width={250}
              height={350}
              className="w-[250px] h-[350px]"
            />
          </li>
        ))}
      </ul>
    );
  }

  if (error) {
    return (
      <div className="grow flex items-center justify-center">
        An error occurred
      </div>
    );
  }

  if (!cards?.count) {
    return (
      <div className="grow flex items-center justify-center">
        No cards found
      </div>
    );
  }

  return (
    <ul className="grid gap-3 mb-2 justify-items-center items-center grid-cols-fluid-sm md:grid-cols-fluid">
      {cards.data.map((card) => (
        <li key={`${card.id}-list`}>
          <CardLink {...card} />
        </li>
      ))}
    </ul>
  );
}
