"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useCards } from "@/hooks/use-cards";
import { getQueryKey, getSearchUrl } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

export function GalleryFooter() {
  const searchParams = useSearchParams();
  const { cards, isLoading } = useCards();

  if (isLoading || !cards?.count) {
    return null;
  }

  const pageKey = getQueryKey("page");
  const page = searchParams.get(pageKey) || "1";

  const getPage = () => {
    const number = parseInt(page);
    return isNaN(number) ? 1 : number <= 1 ? 1 : number;
  };

  const currentPage = getPage();
  const currentHref = getSearchUrl(searchParams);

  const params = new URLSearchParams(searchParams);
  params.set(pageKey, `${currentPage <= 1 ? 1 : currentPage - 1}`);
  const previousHref = getSearchUrl(params);

  params.set(pageKey, `${currentPage + 1}`);
  const nextHref = getSearchUrl(params);

  const totalPages = Math.ceil(cards.totalCount / cards.pageSize);

  return (
    <div className="flex flex-wrap items-center gap-4">
      <Pagination className="grow justify-center">
        <PaginationContent>
          {cards.page <= 1 ? null : (
            <PaginationItem>
              <PaginationPrevious variant="ghost" href={previousHref} />
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationLink variant="fg" href={currentHref}>
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
      <p className="w-full text-center text-sm text-fg-soft">
        {cards.totalCount.toString()} total • Page {cards.page} of {totalPages}
      </p>
    </div>
  );
}
