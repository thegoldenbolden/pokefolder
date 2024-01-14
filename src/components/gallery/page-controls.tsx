'use client';

import { Link } from '@/ui/link';
import { ChevronLeft, ChevronRight, Icon } from '@/components/icons';
import { ItemsPerPage } from './per-page';
import { useCards } from '@/hooks/use-cards';
import { useSearchParams } from 'next/navigation';

export function PageControls() {
  const { cards, isLoading } = useCards();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  if (isLoading || !cards?.count) {
    return (
      <div className="flex gap-2 items-center justify-center">
        <DisabledLink icon={ChevronLeft} />
        <DisabledLink icon={ChevronRight} />
      </div>
    );
  }

  const totalPages = Math.ceil(cards.totalCount / cards.pageSize);
  const lastPage = cards.page * cards.pageSize > cards.totalCount;
  params.set('page', `${cards.count ? cards.page - 1 : totalPages}`);

  const BackPage =
    cards.page !== 1 ? (
      <Link
        aria-label="go to previous page"
        href={`/search?${params}`}
        className="rounded-sm p-2 flex h-9 w-9 items-center justify-center bg-muted border border-border hover:bg-foreground/10"
      >
        <ChevronLeft className="w-6 h-6" />
      </Link>
    ) : (
      <DisabledLink icon={ChevronLeft} />
    );

  params.set('page', `${cards.page + 1}`);
  const NextPage = !lastPage ? (
    <Link
      aria-label="go to next page"
      href={`/search?${params}`}
      className="rounded-sm p-2 flex h-9 w-9 items-center justify-center bg-muted border border-border hover:bg-foreground/10"
    >
      <ChevronRight className="w-6 h-6" />
    </Link>
  ) : (
    <DisabledLink icon={ChevronRight} />
  );

  return (
    <div className="flex items-center gap-1">
      <ItemsPerPage />
      <div className="flex gap-1 items-center justify-center">
        {BackPage}
        {NextPage}
      </div>
    </div>
  );
}

function DisabledLink(props: { icon: Icon }) {
  return (
    <span className="rounded-sm p-2 flex h-9 w-9 items-center justify-center cursor-not-allowed">
      <props.icon className="w-6 h-6" />
    </span>
  );
}
