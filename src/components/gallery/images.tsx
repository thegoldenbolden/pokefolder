'use client';
import Card from '@/components/card/link';
import PageControls from './page-controls';
import useCards from '@/hooks/use-cards';
import Image, { blur } from '@/ui/image';
import { DEFAULT_PAGE_SIZE } from '@/lib/tcg';
import { useSearchParams } from 'next/navigation';

export default function Images() {
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
    return <span>An error occurred</span>;
  }

  if (!cards?.count) {
    return <span>No cards found</span>;
  }

  return (
    <>
      <ul className="grid gap-3 mb-2 justify-items-center items-center grid-cols-fluid-sm md:grid-cols-fluid">
        {cards.data.map((card) => (
          <li key={`${card.id}-list`}>
            <Card {...card} />
          </li>
        ))}
      </ul>
      <PageControls />
    </>
  );
}
