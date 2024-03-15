"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCards } from "@/hooks/use-cards";
import { MAX_PAGE_LIMIT, MIN_PAGE_LIMIT } from "@/lib/constants";
import { getNumberFromRange } from "@/lib/pokemon-tcg/utils";
import { getQueryFallback, getQueryKey, getSearchUrl } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

export function GalleryFooter() {
  const searchParams = useSearchParams();

  const pageKey = getQueryKey("page");
  const pageSizeKey = getQueryKey("limit");

  const page = searchParams.get(pageKey) || "1";
  const pageSize = searchParams.get(pageSizeKey);

  const DEFAULT_PAGE_SIZE = getQueryFallback("limit");

  const getPage = () => {
    const number = parseInt(page);
    return isNaN(number) ? 1 : number <= 1 ? 1 : number;
  };

  const getPageSize = () => {
    return getNumberFromRange({
      min: MIN_PAGE_LIMIT,
      max: MAX_PAGE_LIMIT,
      round: 10,
      value: pageSize,
      fallback: DEFAULT_PAGE_SIZE,
    });
  };

  const currentPage = getPage();

  const getPreviousLink = () => {
    const params = new URLSearchParams(searchParams);
    params.set(pageKey, `${currentPage <= 1 ? 1 : currentPage - 1}`);
    return getSearchUrl(params);
  };

  const getNextLink = () => {
    const params = new URLSearchParams(searchParams);
    params.set(pageKey, `${currentPage + 1}`);
    return getSearchUrl(params);
  };

  const getCurrentLink = () => {
    return getSearchUrl(searchParams);
  };

  return (
    <div className="flex flex-wrap items-center gap-4">
      <Select
        defaultValue={`${getPageSize()}`}
        onValueChange={(v) => {
          const params = new URLSearchParams(searchParams.toString());
          params.set(pageSizeKey, v);
          params.set(pageKey, "1");
          window.history.pushState(null, "", getSearchUrl(params));
        }}
      >
        <SelectTrigger variant="border">
          <SelectValue placeholder="Items Per Page" />
        </SelectTrigger>
        <SelectContent>
          {[10, 20, 30, 40, 50, 60].map((size) => {
            return (
              <SelectItem key={`items-per-${size}`} value={`${size}`}>
                {`${size}`}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>

      <PageInfo
        previousHref={getPreviousLink()}
        currentHref={getCurrentLink()}
        nextHref={getNextLink()}
      />
    </div>
  );
}

type PageInfo = {
  previousHref: string;
  currentHref: string;
  nextHref: string;
};

function PageInfo({ previousHref, currentHref, nextHref }: PageInfo) {
  const { cards, isLoading } = useCards();
  if (isLoading || !cards?.count) return null;

  const totalPages = Math.ceil(cards.totalCount / cards.pageSize);

  return (
    <>
      <Pagination className="grow justify-end">
        <PaginationContent>
          {cards.page <= 1 ? null : (
            <PaginationItem>
              <PaginationPrevious variant="ghost" href={previousHref} />
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationLink variant="foreground" href={currentHref}>
              {cards.page}
            </PaginationLink>
          </PaginationItem>
          {cards.page >= totalPages ? null : (
            <PaginationItem>
              <PaginationNext variant="ghost" href={nextHref} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
      <p className="w-full text-center">
        {cards.totalCount.toString()} total - Page {cards.page} of {totalPages}
      </p>
    </>
  );
}
