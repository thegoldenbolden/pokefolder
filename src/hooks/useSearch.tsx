'use client';
import { queryParams } from '@lib/config';
import { useSearchParams as useNextSearchParams } from 'next/navigation';

type Params = {
  cards: string;
  artists: string;
  types: string[];
  subtypes: string[];
  supertypes: string[];
  rarities: string[];
  sets: string[];
};

export default function useSearch(): Partial<Params> {
  const params = useNextSearchParams();

  const obj: Partial<Params> = {};
  queryParams.forEach((param) => {
    let value = params[param];
    if (!value) return;
    obj[param] =
      param === 'cards' || param === 'artists'
        ? value.replaceAll(',', ', ')
        : value.split(',');
  });

  return obj;
}
