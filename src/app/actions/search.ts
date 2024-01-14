'use server';

import { addDefaultParams } from '@/lib/tcg';
import { getCards } from '@/lib/fetch';

export async function search(searchParams: URLSearchParams) {
  const params = addDefaultParams(new URLSearchParams(searchParams));

  try {
    const cards = await getCards(params);
    return { cards };
  } catch (error) {
    console.error('An error occurred fetching cards\n\n', error);
    return {
      error: 'An error occurred',
    };
  }
}
