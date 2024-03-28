import type {
  CardObject,
  SimpleSet,
  TCGApiResponse,
} from "@/types/api/pokemon-tcg";
import "server-only";

const headers: RequestInit["headers"] = {
  "content-type": "application/json",
  "x-api-key": `${process.env.TCG_KEY}`,
};

function createApiUrl(url: string) {
  return new URL(url, "https://api.pokemontcg.io/v2/");
}

async function fetcher<T>(url: URL, init: RequestInit = {}): Promise<T> {
  const response = await fetch(url, { headers, ...init });

  if (!response.ok || response.status !== 200) {
    console.error(
      `${response.headers.get("date")}: ${decodeURIComponent(url.href)}\n\n`,
      response,
    );
    throw new Error("Failed to fetch");
  }

  return await response.json();
}

async function getCards(params: string): Promise<TCGApiResponse<CardObject>> {
  const url = createApiUrl(`cards?${params}`);
  return await fetcher(url);
}

async function getCard(id: string): Promise<{ data: CardObject } | null> {
  const url = createApiUrl(`cards/${id}`);
  return await fetcher(url);
}

async function getSets<T = TCGApiResponse<SimpleSet> | null>(): Promise<T> {
  const url = createApiUrl("sets");
  url.searchParams.set("orderBy", "-releaseDate");
  url.searchParams.set("select", "id,name,series,releaseDate,images");

  const response = await fetcher<T>(url, {
    next: {
      revalidate: 86400,
    },
  });

  return response;
}

type Endpoint = "types" | "subtypes" | "supertypes" | "rarities";

async function getTypes<T = TCGApiResponse<string> | null>(
  endpoint: Endpoint,
): Promise<T> {
  const url = createApiUrl(endpoint);

  const fetchCache: RequestInit = {
    next: {
      revalidate: endpoint === "types" ? Infinity : 86400,
    },
  };

  return await fetcher<T>(url, fetchCache);
}

export { createApiUrl, getCard, getCards, getSets, getTypes };
