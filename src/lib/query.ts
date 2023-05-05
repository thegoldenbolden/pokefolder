import type { TAPIParams, TQueryKeys, TQueryParams } from '@tcg';
import { MAX_PAGE_SIZE } from './config';

// PokeFolder search params
export const queryParamsToApiParams: TQueryKeys = {
  cards: 'name',
  artists: 'artist',
  sets: 'set.id',
  types: 'types',
  subtypes: 'subtypes',
  supertypes: 'supertype',
  rarities: 'rarity',
  marks: 'regulationMark',
  series: 'set.series',
  legalities_standard: 'legalities.standard',
  legalities_expanded: 'legalities.expanded',
  legalities_unlimited: 'legalities.unlimited',
  ancient_trait: '!ancientTrait.name',
  abilities: '!abilities.name',
  attacks: '!attacks.name',
  hp: 'hp',
};

// Lookup valid keys for https://api.pokemontcg.io and format params
export function formatApiQuery(params: Partial<TQueryParams> | null) {
  if (!params) return [];
  const format: string[] = [];
  const sorted = Object.keys(queryParamsToApiParams).sort();

  sorted.forEach((key) => {
    let value: string = params[key];
    if (!value) return;

    if (typeof value !== 'string') {
      throw new Error(`${key}: Invalid parameters - "${value}"`);
    }

    const values = value.split(/[,]+/g);
    const args = values.sort().map((value) => {
      value = value.trim();
      if (key === 'sets') return `set.id:"${value}" OR set.name:"${value}"`;
      return `${queryParamsToApiParams[key]}:"${value}"`;
    });

    format.push(`(${args.join(` OR `)})`);
  });

  return format;
}

export function createApiQuery(
  searchParams: Partial<TQueryParams> | null,
  apiParams: Partial<TAPIParams> | null,
): TAPIParams {
  const page = parseInt(`${searchParams?.page ?? 1}`) || 1;
  return {
    page: page.toString(),
    pageSize: MAX_PAGE_SIZE.toString(),
    select: ['cardmarket.prices', 'id', 'images', 'name', 'set'],
    orderBy: ['-cardmarket.prices.trendPrice'],
    ...apiParams,
    q: apiParams?.q ?? formatApiQuery(searchParams),
  };
}

export function createSearchParams(
  searchParams: TQueryParams | null,
  apiParams: TAPIParams | null,
) {
  let params = new URLSearchParams();
  const query = createApiQuery(searchParams, apiParams);
  Object.entries(query).forEach(([key, value]) => {
    if (!value) return;
    if (!Array.isArray(value)) return params.set(key, value);
    const separator = key === 'q' ? ' ' : ',';
    return params.set(key, value.join(separator));
  });
  params.sort();
  return params;
}
