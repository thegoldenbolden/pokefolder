import type {
  TCGApiResponse,
  TCard,
  TCardFull,
  TSet,
  TSetFull,
} from '@/types/tcg';
import 'server-only';
import { type ApiParams, type Resource, createSearchParams } from './tcg';
import { cache } from 'react';

const API_URL = 'https://api.pokemontcg.io/v2/';
const headers: RequestInit['headers'] = {
  'content-type': 'application/json',
  'x-api-key': `${process.env.TCG_KEY}`,
};

type GetSets = () => Promise<TCGApiResponse<TSet> | null>;
export const getSets: GetSets = cache(async () => {
  const url = new URL('sets', API_URL);
  url.searchParams.set('orderBy', 'name');
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
    return {
      data: [],
      totalCount: 0,
      count: 0,
      page: 0,
      pageSize: 0,
    };
  }
});

type Search = <T extends TSet | TCard>(
  resource: T extends TSet ? 'sets' : 'cards',
  params: ApiParams,
) => Promise<TCGApiResponse<T>>;

export const search: Search = cache(async (resource, params) => {
  const searchParams = createSearchParams(params);
  const url = `${API_URL}${resource}?${searchParams}`;

  try {
    const response = await fetch(url, { headers, next: { revalidate: 86400 } });
    if (!response.ok) throw new Error('Failed to fetch');
    return response.json();
  } catch (error) {
    console.error(`${url} encountered an error`, error);
    return {
      data: [],
      page: 0,
      pageSize: 0,
      count: 0,
      totalCount: 0,
    };
  }
});

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
