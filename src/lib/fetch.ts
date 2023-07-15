import type { TCGApiResponse, TCardFull, TSet, TSetFull } from '@/types/tcg';
import { type Resource, createTCGQueryString } from './tcg';
import { cache } from 'react';
import 'server-only';

const API_URL = 'https://api.pokemontcg.io/v2/';
const headers: RequestInit['headers'] = {
  'content-type': 'application/json',
  'x-api-key': `${process.env.TCG_KEY}`,
};

type GetSets = () => Promise<TCGApiResponse<TSet> | null>;
export const getSets: GetSets = cache(async () => {
  const url = new URL('sets', API_URL);
  url.searchParams.set('orderBy', 'series');
  url.searchParams.set('select', 'id,name,series,releaseDate,images');

  try {
    const response = await fetch(url, { next: { revalidate: 86400 }, headers });
    if (!response.ok) throw new Error('failed to fetch');
    return response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
});

type GetTypes = (r: Resource) => Promise<TCGApiResponse<string>>;
export const getTypes: GetTypes = cache(async (resource) => {
  const url = new URL(resource, API_URL);

  try {
    const response = await fetch(url, {
      cache: 'force-cache',
      next: { tags: [resource] },
      headers,
    });
    if (!response.ok) throw new Error('Failed to fetch');

    return response.json();
  } catch (error) {
    console.error({ error, url });
    return null;
  }
});

type Search = (params: URLSearchParams) => Promise<TCGApiResponse<TCardFull>>;

export const getCards: Search = async (params) => {
  const searchParams = createTCGQueryString(params);
  const url = decodeURIComponent(`${API_URL}cards?${searchParams}`);
  const response = await fetch(url, { headers, next: { revalidate: 86400 } });
  if (!response.ok) throw response;
  return response.json();
};

type GetItem<T> = (id: string) => Promise<{ data: T } | null>;
export const getCard: GetItem<TCardFull> = cache(async (id) => {
  const url = new URL(`cards/${id}`, API_URL);
  try {
    const response = await fetch(url, { headers, next: { revalidate: 86400 } });
    if (!response.ok) throw new Error('Failed to fetch');
    return response.json();
  } catch (error) {
    console.error(`Failed to fetch card with id ${id}`, error);
    return null;
  }
});

export const getSet: GetItem<TSetFull> = cache(async (id) => {
  const url = new URL(`sets/${id}`, API_URL);
  try {
    const response = await fetch(url, { headers, next: { tags: ['sets'] } });
    if (!response.ok) throw new Error('Failed to fetch set');
    return response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
});
