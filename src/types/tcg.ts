type Base = { id: string; name: string };
type Legality = { standard: string; expanded: string; unlimited: string };
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
type TCGPlayer = {
  url: string;
  updatedAt: string;
  prices: Record<TCGPrice, number>;
};

// prettier-ignore
type CardmarketPrice = "trendPrice" | "avg1" | "avg7" | "avg30" | "reverseHoloAvg1" | "reverseHoloAvg7" | "reverseHoloAvg7";
type CardMarket = {
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

export type TQueryParams = TQueryKeys & {
  page: string;
  pageSize: string;
};

type TAPISelectParam =
  | 'name'
  | 'set'
  | 'id'
  | 'images'
  | 'releaseDate'
  | 'series'
  | 'cardmarket.prices';

type TAPIOrderByParam =
  | '-releaseDate'
  | '-cardmarket.prices.trendPrice'
  | 'series'
  | 'name';

export type TAPIParams = {
  select?: TAPISelectParam[];
  orderBy?: TAPIOrderByParam[];
  pageSize?: string;
  page?: string;
  q?: string[];
};

export type TQueryKey =
  | 'cards'
  | 'supertypes'
  | 'subtypes'
  | 'types'
  | 'rarities'
  | 'artists'
  | 'marks'
  | 'hp'
  | 'series'
  | 'legalities_expanded'
  | 'legalities_standard'
  | 'legalities_unlimited'
  | 'ancient_trait'
  | 'attacks'
  | 'abilities'
  | 'sets';

export type TQueryKeys = Record<TQueryKey, string>;
