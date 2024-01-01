import { FieldValues, InitialState } from '@/context/search';
import type { Legality, OrderBy, TQueryParams } from '@/types/tcg';
import type { ReadonlyURLSearchParams } from 'next/navigation';

export const MAX_PAGE_SIZE = 50;
export const MIN_PAGE_SIZE = 10;
export const DEFAULT_PAGE_SIZE = 30;
export const DEFAULT_HP = [10, 400];

export const keywords = [
  'Pokemon cards',
  'Pokemon TCG',
  'Card search',
  'Deck building',
  'Collectible card game',
  'Pokemon battles',
  'Strategy',
  'Rare cards',
  'Custom decks',
  'TCG app',
  'Pokemon card database',
  'Card collection',
  'Online deck builder',
  'Competitive play',
  'Trading card game',
];

export type Resource = 'types' | 'subtypes' | 'supertypes' | 'rarities';
export type Tags = Resource | 'sets';
export const revalidateTags: Tags[] = [
  'rarities',
  'sets',
  'subtypes',
  'supertypes',
  'types',
];

type LegalParam = [keyof Legality, string];
/**
 * Map search params to tcg params
 */
const qToTCGTable = {
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
    return `nationalPokedexNumber:[${value}]`;
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
} as const;
export type QToTCGTableKeys = keyof typeof qToTCGTable;

export const allowedTCGParams = [...Object.keys(qToTCGTable)];
export const defaultQueryParams = ['page', 'pageSize', 'orderBy', 'view'];

/**
 * Map orderBy param to TCG orderBy params
 */
export const orderByToTCG: Record<OrderBy, string> = {
  name: 'name',
  number: 'number',
  release: 'releaseDate',
  pokedex: 'nationalPokedexNumbers.0',
  cardmarket: 'cardmarket.prices.trendPrice',
  tcgplayer: 'tcgplayer.prices.holofoil.market',
  series: 'set.series',
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

export type AddToQuery = (x: QToTCGTableKeys, i: number, arr: string[]) => void;

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
  if (!includedSupertypes && !excludedSupertypes) return true;
  return (
    includedSupertypes?.includes('pokemon') ||
    !excludedSupertypes?.includes('pokemon')
  );
};

/**
 * Format search params to an accepted TCG param
 * @param params
 * @returns
 */
function formatTCGQueryParams(params: URLSearchParams) {
  const tcgQueryArgs: string[] = [];

  const addToQuery: AddToQuery = (q) => {
    const include = params.get(q);
    const exclude = params.get(`exclude_${q}`);
    if (!include && !exclude) return;

    const included = include?.split(/[,]+/g) ?? [];
    const excluded = exclude?.split(/[,]+/g) ?? [];
    const values = [...included, ...excluded];

    const args = values.map((value, i) => {
      const exclude = i > included.length - 1 ? '-' : '';
      value = value.trim();

      switch (q) {
        case 'legalities':
          return (
            exclude + qToTCGTable.legalities(value.split('_') as LegalParam)
          );
        case 'hp':
          if (!isHPCompatible(params)) return;
          return qToTCGTable.hp(params.get('hp')?.split('-'));
        case 'pokedex':
          return exclude + qToTCGTable.pokedex(value);
        default:
          return exclude + `${qToTCGTable[q]}:"${value}"`;
      }
    });

    const join = excluded.length ? ` AND ` : ` OR `;
    tcgQueryArgs.push(`(${args.join(join)})`);
  };

  allowedTCGParams.forEach(addToQuery);
  return tcgQueryArgs;
}

/**
 * Create TCG Query string from search params
 * @param params
 * @returns
 */
export function createTCGQueryString(params: URLSearchParams) {
  const q = new URLSearchParams();
  Object.entries({
    q: formatTCGQueryParams(params),
    orderBy: getOrderBy(params.get('orderBy') as TQueryParams['orderBy']),
    page: parseInt(params.get('page') || '1') || 1,
    pageSize: getNumberFromRange({
      min: MIN_PAGE_SIZE,
      max: MAX_PAGE_SIZE,
      round: 10,
      value: params.get('pageSize'),
      fallback: DEFAULT_PAGE_SIZE,
    }),
  }).forEach(([key, value]) => {
    if (!value) return;
    if (!Array.isArray(value)) return q.set(key, `${value}`);
    return q.set(key, value.join(key === 'q' ? ' ' : ','));
  });

  q.sort();
  return decodeURIComponent(q.toString());
}

/**
 * Create API Query String from form values
 * @param fields
 */
export function createQueryStringFromForm(
  fields: InitialState,
  searchParams: ReadonlyURLSearchParams,
) {
  const params = new URLSearchParams(searchParams.toString());
  params.set('page', '1');

  Object.entries(fields).forEach(([key, value]) => {
    if (!(value instanceof Array)) return;
    if (!value.length) return;

    if (key === 'hp') {
      if (!isHPCompatible(params)) return;
      const min = Math.min(...fields[key]);
      const max = Math.max(...fields[key]);
      if (min === DEFAULT_HP[0] && max === DEFAULT_HP[1]) return;
      params.set(`hp`, `${min}-${max}`);
      return;
    }

    if (key === 'orderBy') {
      params.set(
        'orderBy',
        (value as FieldValues)
          .map((v) => `${v.exclude ? '-' : ''}${v.id}`)
          .join(','),
      );
      return;
    }

    const exclude: string[] = [];
    const include: string[] = [];

    (value as FieldValues).forEach((r) => {
      if (!r.exclude) {
        include.push(key === 'sets' || key === 'legalities' ? r.id : r.name);
      } else {
        exclude.push(key === 'sets' || key === 'legalities' ? r.id : r.name);
      }
    });

    exclude.length && params.set(`exclude_${key}`, exclude.join(','));
    include.length && params.set(key, include.join(','));
  });

  addDefaultParams(params);
  params.sort();
  return decodeURIComponent(params.toString());
}

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
  if (!options.value) return options.fallback;
  let value = parseInt(options.value) || options.fallback;
  if (typeof options.round === 'number') {
			 // /cards/[id] uses 5 
				if (value === 5) return value;
    value = Math.round(value / options.round) * options.round;
  }
  return Math.min(Math.max(value, options.min), options.max);
}

/**
 * Get allowed orderBy param
 * @param value
 * @returns
 */
function getOrderBy(value: TQueryParams['orderBy'] | null = '-cardmarket') {
  if (!value) return '-cardmarket.prices.trendPrice';
  const values = value.split('-');
  const desc = values.length === 2;
  const lookup = orderByToTCG[values[desc ? 1 : 0]];
  if (!value || !lookup) return '-cardmarket.prices.trendPrice';
  return `${desc ? '-' : ''}` + lookup;
}

export function addDefaultParams(params: URLSearchParams) {
  const allowedParams = [...allowedTCGParams, ...defaultQueryParams];

  for (const [param, value] of params.entries()) {
    if (allowedParams.includes(param)) {
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
    params.set('orderBy', '-cardmarket');
  }

  params.sort();

  return params;
}