import type {
  Legality,
  OrderBy,
  TCGApiResponse,
  TCardFull,
  TQueryParams,
  TSet,
} from '@/types/tcg';
import {
  DEFAULT_HP,
  DEFAULT_ORDER_BY,
  DEFAULT_PAGE_SIZE,
  getNumberFromRange,
  isHPCompatible,
  MAX_PAGE_SIZE,
  MIN_PAGE_SIZE,
  QUERY_PARAMS,
  QueryParams,
  type Resource,
} from './tcg';
import { cache } from 'react';
import 'server-only';

type LegalParam = [keyof Legality, string];

export const DAILY = 86400;
export const WEEKLY = 604800;

const API_URL = 'https://api.pokemontcg.io/v2/';
const headers: RequestInit['headers'] = {
  'content-type': 'application/json',
  'x-api-key': `${process.env.TCG_KEY}`,
};

/**
 * Map search params to tcg params
 */

type HPQueryFn = (values: string[] | undefined) => string;
type PokedexQueryFn = (value: string) => string;
type LegalitiesQueryFn = (value: LegalParam) => string;

type TCGQueryTable<T extends QueryParams = QueryParams> = {
  [K in T]: K extends 'hp'
    ? HPQueryFn
    : K extends 'legalities'
      ? LegalitiesQueryFn
      : K extends 'pokedex'
        ? PokedexQueryFn
        : string;
};

const tcgQueryTable: TCGQueryTable = {
  cards: 'name',
  artists: 'artist',
  sets: 'set.id',
  types: 'types',
  subtypes: 'subtypes',
  supertypes: 'supertype',
  rarities: 'rarity',
  marks: 'regulationMark',
  series: 'set.series',
  traits: 'ancientTrait.name',
  abilities: '!abilities.name',
  attacks: '!attacks.name',
  pokedex: (value: string) => {
    return `nationalPokedexNumbers:[${regionsToHPTable[value]}]`;
  },
  hp: (values: string[] | undefined) => {
    let low = getNumberFromRange({
      value: values?.[0],
      min: DEFAULT_HP[0],
      max: DEFAULT_HP[1],
      fallback: DEFAULT_HP[0],
    });

    let high = getNumberFromRange({
      value: values?.[1],
      min: DEFAULT_HP[0],
      max: DEFAULT_HP[1],
      fallback: DEFAULT_HP[1],
    });

    (low = Math.min(low, high)), (high = Math.max(low, high));
    return `HP:[${low ?? '*'} TO ${high ?? '*'}]`;
  },
  legalities: ([type, legal]: LegalParam) => {
    return `legalities.${type}:${legal}`;
  },
};

/**
 * Map Pokemon Regions to Pokedex Number
 */
export const regionsToHPTable = {
  kanto: '1 TO 151',
  johto: '152 TO 251',
  hoenn: '252 TO 386',
  sinnoh: '387 TO 493',
  unova: '494 TO 649',
  kalos: '650 TO 721',
  alola: '722 TO 809',
  galar: '810 TO 905',
  paldea: '906 TO 1010',
};

/**
 * Map orderBy param to TCG orderBy params
 */
export const orderByToTCG: Record<OrderBy, string> = {
  name: 'name',
  number: 'number',
  release: 'set.releaseDate',
  pokedex: 'nationalPokedexNumbers.0',
  cardmarket: 'cardmarket.prices.trendPrice',
  tcgplayer: 'tcgplayer.prices.holofoil.market',
  series: 'set.series',
};

type GetSets = () => Promise<TCGApiResponse<TSet> | null>;
export const getSets: GetSets = cache(async () => {
  const url = new URL('sets', API_URL);

  url.searchParams.set('orderBy', 'series');
  url.searchParams.set('select', 'id,name,series,releaseDate,images');

  const options: RequestInit = {
    headers,
    next: {
      revalidate: DAILY,
    },
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error('failed to fetch sets');
    }

    return response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
});

type GetTypes = (r: Resource) => Promise<TCGApiResponse<string>>;
export const getTypes: GetTypes = cache(async (resource) => {
  const url = new URL(resource, API_URL);

  const options: RequestInit = {
    headers,
    next: {
      revalidate: WEEKLY,
      tags: [resource],
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Failed to fetch');
    }

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

  const options: RequestInit = {
    headers,
    next: {
      revalidate: DAILY,
    },
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw response;
    }

    return response.json();
  } catch (error) {
    console.error(error);
    return {
      count: 0,
      totalCount: 0,
      data: [],
      page: 0,
      pageSize: 0,
    };
  }
};

type GetItem<T> = (id: string) => Promise<{ data: T } | null>;
export const getCard: GetItem<TCardFull> = cache(async (id) => {
  const url = new URL(`cards/${id}`, API_URL);

  const options: RequestInit = {
    headers,
    next: {
      revalidate: DAILY,
    },
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error('Failed to fetch');
    }

    return response.json();
  } catch (error) {
    console.error(`Failed to fetch card with id ${id}`, error);
    return null;
  }
});

/**
 * Create TCG Query string from search params
 * @param searchParams
 * @returns
 */
function createTCGQueryString(searchParams: URLSearchParams) {
  const q = new URLSearchParams();

  const entries = Object.entries({
    q: formatTCGQueryParams(searchParams),
    orderBy: getOrderBy(searchParams.get('orderBy') as TQueryParams['orderBy']),
    page: parseInt(searchParams.get('page') || '1') || 1,
    pageSize: getNumberFromRange({
      min: MIN_PAGE_SIZE,
      max: MAX_PAGE_SIZE,
      round: 12,
      value: searchParams.get('pageSize'),
      fallback: DEFAULT_PAGE_SIZE,
    }),
  });

  entries.forEach(([key, value]) => {
    if (!value) return;
    if (!Array.isArray(value)) {
      q.set(key, `${value}`);
      return;
    }
    q.set(key, value.join(key === 'q' ? ' ' : ','));
    return;
  });

  q.sort();
  return decodeURIComponent(q.toString());
}

/**
 * Format search params to an accepted TCG param
 * @param params
 * @returns
 */
function formatTCGQueryParams(params: URLSearchParams) {
  const tcgQueryArgs: string[] = [];

  // Add allowed params to query
  QUERY_PARAMS.forEach((param) => {
    const include = params.get(param);
    const exclude = params.get(`exclude_${param}`);
    if (!include && !exclude) return;

    const included = include?.split(/[,]+/g) ?? [];
    const excluded = exclude?.split(/[,]+/g) ?? [];
    const values = [...included, ...excluded];

    const args = values.map((value, i) => {
      const exclude = i > included.length - 1 ? '-' : '';
      value = value.trim();

      switch (param) {
        case 'legalities':
          return (
            exclude + tcgQueryTable.legalities(value.split('_') as LegalParam)
          );
        case 'hp':
          if (!isHPCompatible(params)) return;
          return tcgQueryTable.hp(params.get('hp')?.split('-'));
        case 'pokedex':
          return exclude + tcgQueryTable.pokedex(value);
        default:
          return exclude + `${tcgQueryTable[param]}:"${value}"`;
      }
    });

    const join = excluded.length ? ` AND ` : ` OR `;
    tcgQueryArgs.push(`(${args.join(join)})`);
  });
  return tcgQueryArgs;
}

/**
 * Get allowed orderBy param
 * @param value
 * @returns
 */
function getOrderBy(value: TQueryParams['orderBy'] | null = '-cardmarket') {
  if (!value) {
    return DEFAULT_ORDER_BY;
  }

  const values = value.split('-');
  const desc = values.length === 2;
  const lookup = orderByToTCG[values[desc ? 1 : 0]];
  if (!value || !lookup) {
    return DEFAULT_ORDER_BY;
  }
  return `${desc ? '-' : ''}` + lookup;
}
