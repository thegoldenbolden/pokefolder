import type { TQueryKey } from '@tcg';
export const API_URL = 'https://api.pokemontcg.io/v2';
export const MAX_PAGE_SIZE = 25;
export const queryParams: TQueryKey[] = [
  'abilities',
  'ancient_trait',
  'artists',
  'attacks',
  'cards',
  'hp',
  'legalities_expanded',
  'legalities_standard',
  'legalities_unlimited',
  'marks',
  'rarities',
  'series',
  'sets',
  'subtypes',
  'supertypes',
  'types'
];
