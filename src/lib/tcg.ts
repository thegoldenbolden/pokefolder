import type { ReadonlyURLSearchParams } from 'next/navigation';
import type { OrderBy } from '@/types/tcg';

export const MAX_PAGE_SIZE = 60;
export const MIN_PAGE_SIZE = 12;
export const DEFAULT_PAGE_SIZE = 24;
export const DEFAULT_HP = [10, 400];
export const DEFAULT_ORDER_BY: OrderBy = 'name';
export const CARDS_PER_SET = 25; /* /cards/[id] page */
export const DEFAULT_QUERY_PARAMS = [
  'page',
  'pageSize',
  'orderBy',
  'view',
] as const;
export const QUERY_PARAMS = [
  'cards',
  'artists',
  'sets',
  'types',
  'subtypes',
  'supertypes',
  'rarities',
  'marks',
  'traits',
  'series',
  'abilities',
  'attacks',
  'pokedex',
  'hp',
  'legalities',
] as const;

export type QueryParams = (typeof QUERY_PARAMS)[number];

export type Resource = 'types' | 'subtypes' | 'supertypes' | 'rarities';
export type Tags = Resource | 'sets';

export const revalidateTags: Tags[] = [
  'rarities',
  'sets',
  'subtypes',
  'supertypes',
  'types',
];

/**
 * Check if supertypes allows for HP filtering
 * @param params
 * @returns
 */
export const isHPCompatible = (
  params: URLSearchParams | ReadonlyURLSearchParams,
) => {
  const includedSupertypes = params.get('supertypes');
  const excludedSupertypes = params.get('exclude_supertypes');

  if (!includedSupertypes && !excludedSupertypes) {
    return true;
  }

  if (includedSupertypes?.includes('pokemon')) {
    return true;
  }

  if (!excludedSupertypes?.includes('pokemon')) {
    return true;
  }

  return false;
};

type NumberRangeOptions = {
  min: number;
  max: number;
  fallback: number;
  value: string | null | undefined;
  round?: number;
};

/**
 * Ensures a number is within specified range
 * @param options
 * @returns
 */
export function getNumberFromRange(options: NumberRangeOptions) {
  if (!options.value) {
    return options.fallback;
  }

  let value = parseInt(options.value) || options.fallback;
  if (typeof options.round === 'number') {
    if (value === CARDS_PER_SET) {
      return value;
    }
    value = Math.round(value / options.round) * options.round;
  }
  return Math.min(Math.max(value, options.min), options.max);
}

export function addDefaultParams(params: URLSearchParams) {
  const allowedParams = [...QUERY_PARAMS, ...DEFAULT_QUERY_PARAMS] as string[];

  for (const [param, value] of params.entries()) {
    const splitName = param.split('_');
    const name = splitName[splitName.length - 1];

    if (allowedParams.includes(name)) {
      params.set(param, value);
    } else {
      params.delete(param);
    }
  }

  if (!params.get('page')) {
    params.set('page', '1');
  }

  if (!params.get('pageSize')) {
    params.set('pageSize', `${DEFAULT_PAGE_SIZE}`);
  }

  if (!params.get('view')) {
    params.set('view', 'grid');
  }

  if (!params.get('orderBy')) {
    params.set('orderBy', 'name');
  }

  params.sort();

  return params;
}
