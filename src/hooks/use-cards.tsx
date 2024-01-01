'use client';
import type { TCGApiResponse, TCardFull } from '@/types/tcg';
import { useSearchParams } from 'next/navigation';
import { search } from '@/app/actions/search';
import useSWR from 'swr';

type Search = TCGApiResponse<TCardFull> | null;

export default function useCards() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  params.sort();

  const { data, error, isLoading } = useSWR<Search>(
    `/api/cards?${params.toString()}`,
    async () => {
      try {
        const data = await search(params);
        if (data.error) {
          throw data.error;
        }

        return data.cards ?? null;
      } catch (error) {
        return null;
      }
    },
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  );

  return {
    cards: data,
    error,
    isLoading,
  };
}
