import { fetcher } from "@/lib/utils";
import { env } from "@/schemas/valibot/env";
import type {
  CardObject,
  SimpleSet,
  TCGApiResponse,
} from "@/types/api/pokemon-tcg";
import "server-only";

const headers: RequestInit["headers"] = {
  "content-type": "application/json",
  "x-api-key": env.TCG_API_KEY,
};

function createApiUrl(url: string) {
  return new URL(url, "https://api.pokemontcg.io/v2/");
}

async function getCards(params: string): Promise<TCGApiResponse<CardObject>> {
  const url = createApiUrl(`cards?${params}`);
  return await fetcher(url, { headers });
}

async function getCard(id: string): Promise<{ data: CardObject } | null> {
  const url = createApiUrl(`cards/${id}`);
  return await fetcher(url, { headers });
}

async function getSets<T = TCGApiResponse<SimpleSet> | null>(): Promise<T> {
  const url = createApiUrl("sets");
  url.searchParams.set("orderBy", "-releaseDate");
  url.searchParams.set("select", "id,name,series,releaseDate,images,total");
  return await fetcher<T>(url, { headers });
}

async function getTypes<T = TCGApiResponse<string> | null>(
  endpoint: "types" | "subtypes" | "supertypes" | "rarities",
): Promise<T> {
  const url = createApiUrl(endpoint);
  return await fetcher<T>(url, { headers });
}

export { createApiUrl, getCard, getCards, getSets, getTypes };
