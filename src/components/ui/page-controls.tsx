import type { TCard, TQueryParams } from '@tcg';
import Link from 'next/link';

import { ChevronRightIcon } from '@ui/icons';
import { queryParams } from '@lib/config';
import getData from '@lib/get-data';

type PageControlProps = {
  searchParams: TQueryParams;
  route: string;
};

export default async function PageControls(props: PageControlProps) {
  const cards = await getData<TCard>('cards', props.searchParams, null);
  if (!cards?.totalCount) return null;

  const params = new URLSearchParams();

  queryParams.forEach((key) => {
    if (key in props.searchParams) {
      params.set(key, props.searchParams[key]);
    }
  });

  const totalPages = Math.ceil(cards.totalCount / cards.pageSize);
  const lastPage = cards.page * cards.pageSize > cards.totalCount;

  params.set('page', `${cards.page - 1}`);
  const BackPage =
    cards.page !== 1 ? (
      <Link
        prefetch={false}
        aria-label="go to previous page"
        href={`${props.route}?${params}`}
        className="rounded-md p-2 flex w-7 h-7 items-center justify-center bg-tw-primary hover:brightness-90 focus:brightness-90"
      >
        <ChevronRightIcon className="w-5 h-5 rotate-180" />
      </Link>
    ) : (
      <span className="rounded-md p-2 flex w-7 h-7 items-center justify-center bg-tw-gray">
        <ChevronRightIcon className="w-5 h-5 rotate-180" />
      </span>
    );

  params.set('page', `${cards.page + 1}`);
  const NextPage = !lastPage ? (
    <Link
      prefetch={false}
      aria-label="go to next page"
      href={`${props.route}?${params}`}
      className="rounded-md p-2 flex w-7 h-7 items-center justify-center bg-tw-primary hover:brightness-90 focus:brightness-90"
    >
      <ChevronRightIcon className="w-5 h-5" />
    </Link>
  ) : (
    <span className="rounded-md p-2 flex w-7 h-7 items-center justify-center bg-tw-gray">
      <ChevronRightIcon className="w-5 h-5" />
    </span>
  );

  const PageInfo = (
    <div className="flex flex-col justify-center items-center">
      {`Page ${cards.page || 0} of ${totalPages || 0} • ${
        cards.totalCount || 0
      } Cards`}
    </div>
  );

  return (
    <div className="flex gap-2 items-center">
      {BackPage}
      {PageInfo}
      {NextPage}
    </div>
  );
}
