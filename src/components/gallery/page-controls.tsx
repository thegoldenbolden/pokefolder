'use client';

import { Link } from '@/ui/link';
import { ChevronLeft, ChevronRight, Icon } from '@/ui/icons';
import { ItemsPerPage } from './per-page';
import useCards from '@/hooks/use-cards';
import { useSearchParams } from 'next/navigation';

export default function PageControls() {
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
        highlight="none"
        aria-label="go to previous page"
        href={`/search?${params}`}
        button="foreground"
        className="rounded-sm p-2 flex h-9 w-9 items-center justify-center"
      >
        <ChevronLeft className="w-6 h-6" />
      </Link>
    ) : (
      <DisabledLink icon={ChevronLeft} />
    );

  params.set('page', `${cards.page + 1}`);
  const NextPage = !lastPage ? (
    <Link
      highlight="none"
      aria-label="go to next page"
      href={`/search?${params}`}
      button="foreground"
      className="rounded-sm p-2 flex h-9 w-9 items-center justify-center"
    >
      <ChevronRight className="w-6 h-6" />
    </Link>
  ) : (
    <DisabledLink icon={ChevronRight} />
  );

  return (
    <div className="flex items-center gap-1">
      <ItemsPerPage />
      <div className="flex gap-2 items-center justify-center">
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
