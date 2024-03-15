"use client";
import { CardLink } from "@/components/card/link";
import { useCards } from "@/hooks/use-cards";
import { getQueryFallback, getQueryKey } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

export function Images() {
  const { cards, isLoading, error } = useCards();
  const params = useSearchParams();

  const size =
    parseInt(`${params.get(getQueryKey("limit"))}`) ||
    getQueryFallback("limit");

  if (isLoading) {
    return (
      <ul className="grid w-full grid-cols-2 items-center gap-4 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {Array.from({ length: size }).map((_, i) => (
          <li
            key={`fallback-${i}`}
            className="aspect-card max-h-[350px] w-full rounded-lg bg-muted drop-shadow-lg motion-safe:animate-pulse"
          />
        ))}
      </ul>
    );
  }

  if (error) {
    return (
      <div className="mx-auto flex h-full max-w-xs grow flex-col justify-center">
        <p className="text-3xl font-bold">Uh oh..</p>
        <p className="text-muted-foreground">
          An error occurred while searching for cards.
        </p>
      </div>
    );
  }

  if (!cards?.count) {
    return (
      <div className="mx-auto flex h-full max-w-xs grow flex-col justify-center">
        <p className="text-3xl font-bold">No results found</p>
        <p className="text-muted-foreground">
          Try searching for something else.
        </p>
      </div>
    );
  }

  return (
    <ul className="grid w-full grid-cols-2 items-center gap-4 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {cards.data.map((card) => (
        <li key={`${card.id}-list`}>
          <CardLink {...card} />
        </li>
      ))}
    </ul>
  );
}
