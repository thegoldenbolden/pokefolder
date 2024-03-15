import type { QueryKeys, QueryValues } from "@/types";

export const MAX_PAGE_LIMIT = 60;
export const MIN_PAGE_LIMIT = 10;

export const CARDS_PER_SET = 25;
export const DAILY_S = 86400;
export const WEEKLY_S = 604800;

export const params: QueryKeys = {
  abilities: "abilities",
  artists: "artists",
  attacks: "attacks",
  cards: "cards",
  sets: "sets",
  hp: "hp",
  legalities: "legalities",
  limit: "limit",
  marks: "marks",
  order: "order",
  page: "page",
  rarities: "rarities",
  region: "region",
  series: "series",
  sort: "sort",
  subtypes: "subtypes",
  supertypes: "supertypes",
  traits: "traits",
  types: "types",
  view: "view",
};

export const fallbacks = {
  order: "asc",
  sort: "name",
  view: "images",
  hp: [10, 400],
  limit: 20,
} satisfies Partial<QueryValues>;
