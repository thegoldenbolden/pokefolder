'use client';
import type { TCGApiResponse, TCardFull } from '@/types/tcg';
import { useSearchParams } from 'next/navigation';
import useSWRImmutable from 'swr/immutable';

export default function useCards() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  // Removing invalid api param so two keys wont have same result
  params.delete('view');
  params.sort();

  const { data, error, isLoading } = useSWRImmutable<TCGApiResponse<TCardFull>>(
    `/api/cards?${params.toString()}`,
  );

  return {
    cards: data,
    error,
    isLoading,
  };
}
