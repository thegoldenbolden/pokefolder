"use client";
import { search } from "@/actions/search";
import { getQueryKey } from "@/lib/utils";
import type { CardObject, TCGApiResponse } from "@/types/pokemon-tcg";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

type Search = TCGApiResponse<CardObject> | null;

export function useCards() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  // Remove keys that do not change result of query
  const viewKey = getQueryKey("view");
  params.delete(viewKey);
  params.sort();

  const { data, error, isLoading } = useSWR<Search>(
    `/api/cards?${params.toString()}`,
    async () => {
      try {
        const data = await search(params.toString());

        if (data?.message) {
          throw data.message;
        }

        return data.data ?? null;
      } catch (error) {
        return null;
      }
    },
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  return {
    cards: data,
    error,
    isLoading,
  };
}
