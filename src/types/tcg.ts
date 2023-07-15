import type { QToTCGTableKeys } from '@/lib/tcg';

type Base = { id: string; name: string };
export type Legality = {
  standard: string;
  expanded: string;
  unlimited: string;
};
type CardImage = { small: string; large: string };
type Supertype = 'Pokémon' | 'Energy' | 'Trainer';
type Ability = { name: string; text: string; type: string };
type AncientTrait = { name: string; text: string };
type WeaknessResistance = { type: string; value: string };

export interface TSet extends Base {
  releaseDate: string;
  images: { symbol: string; logo: string };
  series?: string;
}
export interface TSetFull extends TSet {
  legalities: Partial<Legality>;
  series: string;
  ptcgoCode: string;
  updatedAt: string;
  printedTotal: number;
  total: number;
}

export interface TCard extends Base {
  images: Partial<CardImage>;
  set: TSet;
}

type Attack = {
  cost: string[];
  name: string;
  text: string;
  damage: string;
  convertedEnergyCost: string;
};
// prettier-ignore
type TCGPrice = "normal" | "holofoil" | "reverseHolofoil" | "1stEditionHolofoil" | "1stEditionNormal";
type TCGPriceTrend = 'low' | 'mid' | 'high' | 'market' | 'directLow';

export type TCGPlayer = {
  url: string;
  updatedAt: string;
  prices: Record<TCGPrice, Record<TCGPriceTrend, number | null>>;
};

// prettier-ignore
type CardmarketPrice = "trendPrice" | "avg1" | "avg7" | "avg30" | "reverseHoloAvg1" | "reverseHoloAvg7" | "reverseHoloAvg7";
export type CardMarket = {
  url: string;
  updatedAt: string;
  prices: Partial<Record<CardmarketPrice, number>>;
};

export interface TCardFull extends TCard {
  supertype: Supertype;
  set: TSetFull;
  number: number;
  subtypes?: string[];
  level?: string;
  hp?: string;
  types?: string[];
  evolvesFrom?: string;
  evolvesTo?: string[];
  rules?: string[];
  retreatCost?: string[];
  convertedRetreatCost?: number;
  artist?: string;
  rarity?: string;
  flavorText?: string;
  nationalPokedexNumbers?: number[];
  regulationMark?: string;
  ancientTrait?: Partial<AncientTrait>;
  legalities: Partial<Legality>;
  cardmarket?: Partial<CardMarket>;
  tcgplayer?: Partial<TCGPlayer>;
  abilities?: Ability[];
  attacks?: Attack[];
  weaknesses?: WeaknessResistance[];
  resistances?: WeaknessResistance[];
}

export type TQueryParams = Record<QToTCGTableKeys, string> & {
  page: string;
  pageSize: string;
  orderBy: OrderBy | `-${OrderBy}`;
  view: 'table' | 'grid';
};

export type TCGApiResponse<T> = {
  data: T[];
  page: number;
  pageSize: number;
  count: number;
  totalCount: number;
};

export type OrderBy =
  | 'release'
  | 'pokedex'
  | 'cardmarket'
  | 'name'
  | 'number'
  | 'series'
  | 'tcgplayer';
