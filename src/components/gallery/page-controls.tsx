import type { TCard, TQueryParams } from '@/types/tcg';
import { Link } from '@/ui/link';
import { ChevronLeft, ChevronRight } from '@/ui/icons';
import { search } from '@/lib/fetch';
import { cn } from '@/lib/utils';
import { getPageSize } from '@/lib/tcg';
import { ItemsPerPage } from './per-page';

type PageControlProps = {
  searchParams: TQueryParams;
  route: string;
  showPageInfo?: boolean;
};

export default async function PageControls(props: PageControlProps) {
  const cards = await search<TCard>('cards', { user: props.searchParams });
  if (!cards?.totalCount) return null;
  const params = new URLSearchParams(props.searchParams);
  const totalPages = Math.ceil(cards.totalCount / cards.pageSize);
  const lastPage = cards.page * cards.pageSize > cards.totalCount;

  params.set('page', `${cards.page - 1}`);
  const BackPage =
    cards.page !== 1 ? (
      <Link
        highlight="none"
        aria-label="go to previous page"
        href={`${props.route}?${params}`}
        button="foreground"
        className="rounded-sm p-2 flex rounded-sm h-9 w-9 items-center justify-center"
      >
        <ChevronLeft className="w-6 h-6" />
      </Link>
    ) : (
      <span className="rounded-sm p-2 flex rounded-sm h-9 w-9 items-center justify-center cursor-not-allowed">
        <ChevronLeft className="w-6 h-6" />
      </span>
    );

  params.set('page', `${cards.page + 1}`);
  const NextPage = !lastPage ? (
    <Link
      highlight="none"
      aria-label="go to next page"
      href={`${props.route}?${params}`}
      button="foreground"
      className="rounded-sm p-2 flex rounded-sm h-9 w-9 items-center justify-center"
    >
      <ChevronRight className="w-6 h-6" />
    </Link>
  ) : (
    <span className="rounded-sm p-2 flex rounded-sm h-9 w-9 items-center justify-center cursor-not-allowed">
      <ChevronRight className="w-6 h-6" />
    </span>
  );

  const PageInfo = (
    <div
      className={cn(
        'hidden xs:flex text-sm sm:text-base flex-col justify-center items-center',
        { flex: !!props.showPageInfo },
      )}
    >
      {`Page ${cards.page || 0} of ${totalPages || 0} • ${
        cards.totalCount || 0
      } Cards`}
    </div>
  );

  return (
    <div className="flex items-center gap-1">
      <ItemsPerPage
        currentPage={cards.page}
        size={getPageSize(params.get('pageSize'))}
      />
      <div className="flex gap-2 items-center justify-center">
        {BackPage}
        {PageInfo}
        {NextPage}
      </div>
    </div>
  );
}
