"use server";

import { getCards } from "@/lib/pokemon-tcg";
import { createTCGQueryString, setQueryParams } from "@/lib/pokemon-tcg/utils";

export async function search(searchParams: string) {
  const params = setQueryParams(new URLSearchParams(searchParams));
  const query = createTCGQueryString(params);

  try {
    const data = await getCards(query);
    return { data };
  } catch (error) {
    console.error("Failed to fetch cards", { params, error });
    return {
      message: "Failed to fetch cards",
    };
  }
}
