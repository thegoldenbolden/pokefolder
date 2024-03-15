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

async function fetcher<T>(url: URL): Promise<T> {
  const response = await fetch(url, { headers });

  if (!response.ok || response.status !== 200) {
    console.error({
      response,
      url: decodeURIComponent(url.href),
    });
    throw new Error("Failed to fetch");
  }

  return await response.json();
}

async function getCards(params: string): Promise<TCGApiResponse<CardObject>> {
  return await fetcher(createApiUrl(`cards?${params}`));
}

async function getCard(id: string): Promise<{ data: CardObject } | null> {
  return await fetcher(createApiUrl(`cards/${id}`));
}

async function getSets(): Promise<TCGApiResponse<SimpleSet> | null> {
  const url = createApiUrl("sets");
  url.searchParams.set("orderBy", "-releaseDate");
  url.searchParams.set("select", "id,name,series,releaseDate,images");

  return await fetcher(url);
}

async function getTraits(): Promise<{ data: string[] }> {
  const data = await fetcher<TCGApiResponse<CardObject>>(
    createApiUrl(`cards?q=ancientTrait.name:*&orderBy=ancientTrait.name`),
  );

  if (!data.data.length) {
    return {
      data: [],
    };
  }

  const filtered = data.data
    .map((card) => card.ancientTrait?.name ?? "")
    .filter((name) => name.length);

  const traits = Array.from(new Set(filtered));

  return { data: traits };
}

type Endpoint = "types" | "subtypes" | "supertypes" | "rarities";

async function getTypes(
  endpoint: Endpoint,
): Promise<TCGApiResponse<string> | null> {
  return await fetcher(createApiUrl(endpoint));
}

export { createApiUrl, getCard, getCards, getSets, getTraits, getTypes };
