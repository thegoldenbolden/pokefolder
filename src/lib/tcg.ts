import type { OrderBy, TAPIParams, TQueryParams } from '@/types/tcg';

const MAX_PAGE_SIZE = 50;
const MIN_PAGE_SIZE = 10;
const DEFAULT_PAGE_SIZE = 30;

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

type Resource = 'types' | 'subtypes' | 'supertypes' | 'rarities';
type Tags = Resource | 'sets';

const revalidateTags: Tags[] = [
  'rarities',
  'sets',
  'subtypes',
  'supertypes',
  'types',
];

const query: QueryKeys[] = [
  'artists',
  'cards',
  'rarities',
  'sets',
  'types',
  'subtypes',
  'supertypes',
];

const tcgParamTable = {
  cards: 'name',
  artists: 'artist',
  sets: 'set.id',
  types: 'types',
  subtypes: 'subtypes',
  supertypes: 'supertype',
  rarities: 'rarity',
  marks: 'regulationMark',
  series: 'set.series',
  standard: 'legalities.standard',
  expanded: 'legalities.expanded',
  unlimited: 'legalities.unlimited',
  pokedex: 'nationalPokedexNumbers.0',
  traits: 'ancientTrait.name',
  abilities: '!abilities.name',
  attacks: '!attacks.name',
} as const;

const orderTable: Record<OrderBy, string> = {
  name: 'name',
  number: 'number',
  release: 'releaseDate',
  pokedex: 'nationalPokedexNumbers.0',
  cardmarket: 'cardmarket.prices.trendPrice',
  tcgplayer: 'tcgplayer.prices.holofoil.market',
  series: 'set.series',
};

const regionsTable = {
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

type QueryKeys =
  | Exclude<keyof typeof tcgParamTable, 'standard' | 'unlimited' | 'expanded'>
  | 'legalities';

type ApiParams = {
  user?: Partial<TQueryParams>;
  dev?: Partial<TAPIParams>;
};

function getQuery(params: ApiParams['user']) {
  if (!params) return [];
  const query: string[] = [];

  if (params.hp_low && params.hp_high) {
    query.push(`HP:[${params.hp_low} TO ${params.hp_high}]`);
  }

  Object.keys(tcgParamTable).forEach((key) => {
    const isLegality = ['standard', 'unlimited', 'expanded'].includes(key);
    key = isLegality ? 'legalities' : key;
    const include: string = params[key];
    const exclude: string = params[`exclude_${key}`];
    if (!include && !exclude) return;

    if (typeof include !== 'string' && typeof exclude !== 'string') {
      throw new Error(`${key}: Invalid parameters - "${include}"`);
    }

    const includedValues = include?.split(/[,]+/g) ?? [];
    const excludedValues = exclude?.split(/[,]+/g) ?? [];
    const values = [...includedValues, ...excludedValues];

    const args = values.map((value, i) => {
      const exclude = i > includedValues.length - 1 ? '-' : '';
      value = value.trim();

      if (isLegality) {
        const [legality, legal] = value.split('_');
        const param = `${exclude}${tcgParamTable[legality]}`;
        return `${param}:${legal}`;
      }

      const param = `${exclude}${tcgParamTable[key]}`;
      if (key === 'pokedex') {
        return `${param}:[${regionsTable[value]}]`;
      }

      return `${exclude}${tcgParamTable[key]}:"${value}"`;
    });

    const join = excludedValues.length ? ` AND ` : ` OR `;
    query.push(`(${args.join(join)})`);
  });

  return query;
}

function createApiQuery(params: ApiParams) {
  const page = parseInt(`${params.user?.page ?? 1}`) || 1;
  return {
    page,
    pageSize: getPageSize(params.user?.pageSize),
    orderBy: getOrderBy(params.user?.orderBy),
    ...params.dev,
    q: params.dev?.q ?? getQuery(params.user),
  };
}

function createSearchParams(params: ApiParams) {
  const searchParams = new URLSearchParams();
  const query = createApiQuery(params);
  Object.entries(query).forEach(([key, value]) => {
    if (!value) return;
    if (!Array.isArray(value)) return searchParams.set(key, `${value}`);
    const separator = key === 'q' ? ' ' : ',';
    return searchParams.set(key, value.join(separator));
  });
  searchParams.sort();
  return searchParams;
}

export function getPageSize(size: string | null = `${DEFAULT_PAGE_SIZE}`) {
  if (!size) return DEFAULT_PAGE_SIZE;
  let value = parseInt(size);
  value = isNaN(value) || value == 0 ? DEFAULT_PAGE_SIZE : value;
  value = Math.round(value / 10) * 10;
  return Math.min(Math.max(value, MIN_PAGE_SIZE), MAX_PAGE_SIZE);
}

function getOrderBy(value: TQueryParams['orderBy'] = '-cardmarket') {
  const values = value.split('-');
  const desc = values.length === 2;
  const lookup = orderTable[values[desc ? 1 : 0]];
  if (!value || !lookup) return '-cardmarket.prices.trendPrice';
  return `${desc ? '-' : ''}` + lookup;
}

export {
  MAX_PAGE_SIZE,
  revalidateTags,
  query,
  regionsTable,
  orderTable,
  createSearchParams,
  type ApiParams,
  type Resource,
  type Tags,
  type QueryKeys,
};
