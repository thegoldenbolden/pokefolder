import {
  CARDS_PER_SET,
  MAX_PAGE_LIMIT,
  MIN_PAGE_LIMIT,
  fallbacks,
} from "@/lib/constants";
import {
  externalApiOrderBy,
  externalApiQueryFields,
  regions,
} from "@/lib/pokemon-tcg/constants";
import {
  getQueryFallback,
  getQueryFallbackKeys,
  getQueryKeys,
} from "@/lib/utils";
import type { QueryKey, QueryValues } from "@/types";
import type { Legality } from "@/types/api/pokemon-tcg";
import type { ReadonlyURLSearchParams } from "next/navigation";

type LegalParam = [keyof Legality, string];

export function getRegionalQuery(region: keyof typeof regions) {
  const pokedexRange = regions[region];
  if (!pokedexRange) throw new Error("Bad request");
  return `nationalPokedexNumbers:[${pokedexRange}]`;
}

export function getHPQuery(values: string[] | undefined) {
  const fallback = getQueryFallback("hp");

  let low = getNumberFromRange({
    value: values?.[0],
    min: fallback[0],
    max: fallback[1],
    fallback: fallback[0],
  });

  let high = getNumberFromRange({
    value: values?.[1],
    min: fallback[0],
    max: fallback[1],
    fallback: fallback[1],
  });

  (low = Math.min(low, high)), (high = Math.max(low, high));
  return `HP:[${low ?? "*"} TO ${high ?? "*"}]`;
}

export function getLegalityQuery([type, legal]: LegalParam) {
  return `legalities.${type}:${legal}`;
}

/**
 * Create TCG Query string from search params
 */
export function createTCGQueryString(searchParams: URLSearchParams) {
  const page = parseInt(getQueryValue("page", searchParams) ?? "1");
  const limit = getQueryValue("limit", searchParams) ?? "";
  const order = getQueryValue("order", searchParams) ?? "";
  const sort = getQueryValue("sort", searchParams) ?? "";

  const unusedByExternalApi: QueryKey[] = ["view", "sort"];
  unusedByExternalApi.forEach((key) => searchParams.delete(key));

  // Query Parameters - https://docs.pokemontcg.io/api-reference/cards/search-cards
  type ApiQueryParameter = "q" | "page" | "pageSize" | "orderBy" | "select";
  const schema: Partial<Record<ApiQueryParameter, unknown>> = {
    q: getTCGFieldsFromParams(searchParams),
    orderBy: getTCGOrderByField(order as QueryValues["order"], sort),
    page: isNaN(page) ? 1 : page,
    pageSize: getNumberFromRange({
      min: MIN_PAGE_LIMIT,
      max: MAX_PAGE_LIMIT,
      round: 10,
      value: limit,
      fallback: getQueryFallback("limit"),
    }),
  };

  const q = new URLSearchParams();
  // Format query into a Lucene-like syntax - https://docs.pokemontcg.io/api-reference/cards/search-cards
  Object.entries(schema).forEach(([key, value]) => {
    if (!value) return;
    if (!Array.isArray(value)) {
      q.set(key, `${value}`);
      return;
    }
    q.set(key, value.join(key === "q" ? " " : ","));
    return;
  });

  q.sort();
  return decodeURIComponent(q.toString());
}

/**
 * Format search parameters to an accepted parameter from api
 * @param searchParams
 * @returns
 */
function getTCGFieldsFromParams(searchParams: URLSearchParams) {
  const params: string[] = [];
  const skip: QueryKey[] = ["limit", "order", "page", "sort", "series", "view"];

  const keys = getQueryKeys();
  keys.forEach((key) => {
    if (skip.includes(key as QueryKey)) return;

    const value = searchParams.get(key);
    if (!value) return;

    const values = value.split(/[,]+/g) ?? [];

    const args = values.map((value) => {
      value = value.trim();
      switch (key) {
        case "legalities":
          return getLegalityQuery(value.split("_") as LegalParam);
        case "hp":
          if (!isHPCompatible(searchParams)) return;
          return getHPQuery(searchParams.get("hp")?.split("-"));
        case "region":
          return getRegionalQuery(value as keyof typeof regions);
        default:
          return `${externalApiQueryFields[key]}:"${value}"`;
      }
    });

    params.push(`(${args.join(" OR ")})`);
  });
  return params;
}

/**
 * Check if supertypes allows for HP filtering
 * @param params
 * @returns
 */
export const isHPCompatible = (
  params: URLSearchParams | ReadonlyURLSearchParams,
) => {
  const supertypes = params.get("supertypes");
  if (!supertypes) return true;
  return !supertypes.includes("pokemon");
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
  if (!options.value) return options.fallback;

  let value = parseInt(options.value) || options.fallback;
  if (typeof options.round === "number") {
    if (value === CARDS_PER_SET) {
      return value;
    }
    value = Math.round(value / options.round) * options.round;
  }
  return Math.min(Math.max(value, options.min), options.max);
}

export function setQueryParams(params: URLSearchParams) {
  const keys = getQueryKeys();

  // Remove invalid parameters
  for (const [param, value] of params.entries()) {
    if (keys.includes(param as QueryKey)) {
      params.set(param, value);
    } else {
      params.delete(param);
    }
  }

  // Add missing default parameters
  const fallbackKeys = getQueryFallbackKeys();
  fallbackKeys.forEach((key) => {
    if (key === "hp") return;

    if (!params.get(key)) {
      params.set(key, fallbacks[key].toString());
    }
  });

  params.sort();
  return params;
}

/**
 * Get allowed sort parameters
 * @param value
 * @returns
 */
function getTCGOrderByField(
  order: QueryValues["order"] = "asc",
  value: string = "name",
) {
  const prefix = order === "desc" ? "-" : "";
  if (!value) return `${prefix}${value}`;
  const field = externalApiOrderBy[value];
  if (!field) return `${prefix}${value}`;
  return `${prefix}${field}`;
}

export function getQueryValue(key: QueryKey, searchParams: URLSearchParams) {
  return searchParams.get(key);
}

/**
 * Get the background color based on the card's type
 */
export function getBackgroundColor(type?: string) {
  switch (type?.toLowerCase()) {
    default:
      return "linear-gradient(to bottom right, hsl(var(--background-light)), hsl(var(--background-lighter))";
    case "colorless":
      return "hsl(240 1.9% 59.6%)";
    case "darkness":
      return "hsl(207.8, 33.3%, 11.8%)";
    case "dragon":
      return "hsl(45.8, 44.9%, 14.9%)";
    case "fairy":
      return "hsl(322.9, 32.8%, 25.5%)";
    case "fighting":
      return "hsl(9.9, 57.4%, 13.1%)";
    case "fire":
      return "hsl(357.9, 71.8%, 25.9%)";
    case "grass":
      return "hsl(137.1, 51.9%, 11.8%)";
    case "lightning":
      return "hsl(45.5, 67.4%, 33.1%)";
    case "metal":
      return "hsl(213.3, 3.9%, 25.3%)";
    case "psychic":
      return "hsl(300, 31.2%, 16.5%)";
    case "water":
      return "hsl(195.7, 66.8%, 26.1%)";
  }
}
