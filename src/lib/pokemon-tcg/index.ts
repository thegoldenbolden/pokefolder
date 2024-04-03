import {
  expansions,
  legalities,
  marks,
  rarities,
  regions,
  subtypes,
  supertypes,
  types,
  type Expansion,
} from "@/lib/pokemon-tcg/constants";
import { fetcher } from "@/lib/utils";
import { env } from "@/schemas/valibot/env";
import type { CardObject, TCGApiResponse } from "@/types/pokemon-tcg";
import "server-only";

const headers: RequestInit["headers"] = {
  "content-type": "application/json",
  "x-api-key": env.TCG_API_KEY,
};

function createApiUrl(url: string) {
  return new URL(url, "https://api.pokemontcg.io/v2/");
}

export async function getCards(
  params: string,
): Promise<TCGApiResponse<CardObject>> {
  const url = createApiUrl(`cards?${params}`);
  return await fetcher(url, { headers });
}

export async function getCard(
  id: string,
): Promise<{ data: CardObject } | null> {
  const url = createApiUrl(`cards/${id}`);
  return await fetcher(url, { headers });
}

export async function getAllCardsFromExpansion(id: string) {
  const searchParams = new URLSearchParams(
    `q=set.id:${id}&orderBy=name&page=1&pageSize=250`,
  );
  const pageSize = 250;

  const initial = await getCards(searchParams.toString());
  const cards = initial.data;

  if (initial.totalCount <= 250) {
    return cards;
  }

  const totalPages = Math.ceil(initial.totalCount / pageSize);

  const pages: string[] = [];
  /** start at 2nd page */
  for (let i = 2; i <= totalPages; i++) {
    searchParams.set("page", i.toString());
    pages.push(searchParams.toString());
  }

  const data = await Promise.all(pages.map((params) => getCards(params)));

  data.forEach((data) => {
    cards.push(...data.data);
  });

  return cards;
}

export function getExpansion(string: string) {
  return expansions.get(string);
}

export function groupBySeries() {
  type Series = {
    name: string;
    href: string;
    expansions: Expansion[];
  };

  const groups = new Map<string, Series>();

  for (const value of expansions.values()) {
    const group = groups.get(value.series.name);

    if (group) {
      groups.set(value.series.name, {
        ...group,
        expansions: [value, ...group.expansions],
      });
    } else {
      groups.set(value.series.name, {
        name: value.series.name,
        href: value.series.href,
        expansions: [value],
      });
    }
  }

  return {
    series: [...groups.values()],
    total: {
      expansions: expansions.size.toString(),
      series: groups.size.toString(),
    },
  };
}

export function getExpansions() {
  return [...expansions.values()];
}

type Field =
  | "types"
  | "subtypes"
  | "supertypes"
  | "rarities"
  | "marks"
  | "regions"
  | "legalities";

export function getField(field: Field) {
  switch (field) {
    default:
      throw new Error("Invalid field");
    case "types":
      return types;
    case "subtypes":
      return subtypes;
    case "supertypes":
      return supertypes;
    case "regions":
      // figure out how to make ts happy
      return Object.entries(regions);
    case "rarities":
      return rarities;
    case "legalities":
      return legalities;
    case "marks":
      return marks;
  }
}
