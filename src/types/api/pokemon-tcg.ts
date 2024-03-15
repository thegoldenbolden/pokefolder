// Pokémon TCG API https://docs.pokemontcg.io/

// https://docs.pokemontcg.io/api-reference/sets/set-object

export type SimpleSet = {
  id: string;
  name: string;
  releaseDate: string;
  images: { symbol: string; logo: string };
  series?: string;
};

export type SetObject = {
  id: string;
  name: string;
  series: string;
  printedTotal: number;
  total: number;
  legalities: Partial<Legality>;
  releaseDate: string;
  updatedAt: string;
  ptcgoCode?: string;
  images: { symbol: string; logo: string };
};

// https://docs.pokemontcg.io/api-reference/cards/card-object#regulationmark-string

export type SimpleCard = {
  id: string;
  name: string;
  images: Partial<CardImage>;
  set: SimpleSet;
};

export type CardObject = {
  id: string;
  name: string;
  images: Partial<CardImage>;
  supertype: "Pokémon" | "Energy" | "Trainer";
  number: number;
  legalities: Partial<Legality>;
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
  abilities?: Ability[];
  attacks?: Attack[];
  weaknesses?: WeaknessOrResistance[];
  resistances?: WeaknessOrResistance[];
  cardmarket?: Partial<Cardmarket>;
  tcgplayer?: Partial<TCGPlayer>;
  set: SetObject;
};

export type Legality = {
  standard: string;
  expanded: string;
  unlimited: string;
};

type CardImage = {
  small: string;
  large: string;
};

type Ability = {
  name: string;
  text: string;
  type: string;
};

type AncientTrait = {
  name: string;
  text: string;
};

type WeaknessOrResistance = {
  type: string;
  value: string;
};

type Attack = {
  cost: string[];
  name: string;
  text: string;
  damage: string;
  convertedEnergyCost: string;
};

export type TCGPlayer = {
  url: string;
  updatedAt: string;
  prices: Record<string, Record<string, number | null>>;
};

export type Cardmarket = {
  url: string;
  updatedAt: string;
  prices: Partial<Record<string, number | null>>;
};

export type TCGApiResponse<T> = {
  data: T[];
  page: number;
  pageSize: number;
  count: number;
  totalCount: number;
};
