import type { TAPIParams, TQueryParams } from '@tcg';
import { createSearchParams } from './query';
import { API_URL } from './config';
import { init } from './server-only';

export type Data<T> = {
  data: T[];
  page: number;
  pageSize: number;
  count: number;
  totalCount: number;
};

type Slug = 'cards' | 'sets';
export default async function getData<T>(
  endpoint: Slug,
  searchParams: TQueryParams | null,
  apiParams: TAPIParams | null
): Promise<Data<T>> {
  const params = createSearchParams(searchParams, apiParams);
  const url = `${API_URL}/${endpoint}?${params}`;

  try {
    const response = await fetch(url, init);
    if (!response.ok) throw new Error('Failed to fetch');
    return response.json();
  } catch (error) {
    console.error(`${url} encountered an error`, error);
    return {
      data: [],
      page: 0,
      pageSize: 0,
      count: 0,
      totalCount: 0
    };
  }
}
