"use client";

import { Images, ImagesFallback } from "@/components/gallery/images";
import { Table, TableFallback } from "@/components/gallery/table";
import { useCards } from "@/hooks/use-cards";
import { getQueryFallback, getQueryKey } from "@/lib/utils";
import type { QueryValues } from "@/types";
import { useSearchParams } from "next/navigation";

export function Gallery() {
  const { cards, isLoading, error } = useCards();
  const params = useSearchParams();
  const view = params.get(getQueryKey("view")) as QueryValues["view"];

  const size =
    parseInt(`${params.get(getQueryKey("limit"))}`) ||
    getQueryFallback("limit");

  const Fallback = view === "list" ? TableFallback : ImagesFallback;

  if (isLoading) {
    return <Fallback size={size} />;
  }

  if (error) {
    return (
      <div className="mx-auto flex h-full max-w-xs grow flex-col justify-center">
        <p className="text-3xl font-bold">Uh oh..</p>
        <p className="text-muted-fg">
          An error occurred while searching for cards.
        </p>
      </div>
    );
  }

  if (!cards?.count) {
    return (
      <div className="mx-auto flex h-full max-w-xs grow flex-col justify-center">
        <p className="text-3xl font-bold">No results found</p>
        <p className="text-muted-fg">Try searching for something else.</p>
      </div>
    );
  }

  const Display = view === "list" ? Table : Images;
  return <Display cards={cards.data} />;
}

export function GalleryFallback() {
  return (
    <ul
      role="status"
      className="grid grow grid-cols-2 items-center justify-items-center gap-3 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
    >
      {Array.from({ length: 30 }).map((_, i) => (
        <li
          key={`fallback-${i}`}
          className="aspect-card max-h-[350px] w-full rounded-lg bg-muted drop-shadow-lg motion-safe:animate-pulse"
        />
      ))}
    </ul>
  );
}
