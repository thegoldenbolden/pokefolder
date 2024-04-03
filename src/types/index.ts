export type QueryKey =
  | "order"
  | "sort"
  | "view"
  | "page"
  | "limit"
  | "cards"
  | "artists"
  | "rarities"
  | "hp"
  | "series"
  | "sets"
  | "region"
  | "traits"
  | "abilities"
  | "marks"
  | "supertypes"
  | "subtypes"
  | "types"
  | "attacks"
  | "legalities";

type Order = "asc" | "desc";

type Sort =
  | "release"
  | "region"
  | "cardmarket"
  | "name"
  | "number"
  | "tcgplayer"
  | "series";

type View = "images" | "list";

export type QueryValues = {
  readonly [P in QueryKey]: P extends "order"
    ? Order
    : P extends "sort"
      ? Sort
      : P extends "view"
        ? View
        : P extends "hp"
          ? number[]
          : P extends "limit"
            ? number
            : string;
};

export type QueryKeys = {
  readonly [P in QueryKey]: P;
};

export type TODO = any;
