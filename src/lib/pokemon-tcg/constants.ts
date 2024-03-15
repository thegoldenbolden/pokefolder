import type { QueryKey, QueryValues } from "@/types";

/**
 * Map Pokemon Regions to Pokedex Number
 */
export const regions = {
  kanto: "1 TO 151",
  johto: "152 TO 251",
  hoenn: "252 TO 386",
  sinnoh: "387 TO 493",
  unova: "494 TO 649",
  kalos: "650 TO 721",
  alola: "722 TO 809",
  galar: "810 TO 905",
  paldea: "906 TO 1010",
};

/**
 * Map search params to tcg params
 */
export const externalApiQueryFields: Record<
  Exclude<QueryKey, "hp" | "order" | "view">,
  string
> = {
  abilities: "!abilities.name",
  artists: "artist",
  attacks: "!attacks.name",
  cards: "name",
  sets: "set.id",
  legalities: "",
  limit: "pageSize",
  marks: "regulationMark",
  page: "page",
  rarities: "rarity",
  region: "",
  series: "set.series",
  sort: "orderBy",
  subtypes: "subtypes",
  supertypes: "supertype",
  types: "types",
  traits: "ancientTrait.name",
};

/**
 * Map sort param to TCG orderBy params
 */
export const externalApiOrderBy: Record<QueryValues["sort"], string> = {
  name: "name",
  number: "number",
  release: "set.releaseDate",
  region: "nationalPokedexNumbers.0",
  cardmarket: "cardmarket.prices.trendPrice",
  tcgplayer: "tcgplayer.prices.holofoil.market",
  series: "set.series",
};
