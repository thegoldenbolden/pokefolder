import { search } from '@/lib/fetch';
import type { TCard, TQueryParams } from '@/types/tcg';
import Card from '@/components/card/link';
import PageControls from './page-controls';

export default async function Images({ params }: { params: TQueryParams }) {
  const cards = await search<TCard>('cards', { user: params });
  if (!cards?.data || cards.totalCount === 0) {
    return (
      <div className="h-96 text-2xl flex items-center justify-center">
        No Cards Found
      </div>
    );
  }
  return (
    <>
      <ul className="grid gap-3 justify-items-center items-center grid-cols-fluid-sm md:grid-cols-fluid">
        {cards.data.map((card) => (
          <li key={card.id}>
            <Card {...card} />
          </li>
        ))}
      </ul>
      <PageControls route="/search" searchParams={params} />
    </>
  );
}
