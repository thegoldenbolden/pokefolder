import { fallbacks, params } from "@/lib/constants";
import type { QueryKey } from "@/types";
import type { SimpleCard } from "@/types/api/pokemon-tcg";
import { cx, type CxOptions } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: CxOptions) {
  return twMerge(cx(inputs));
}

export function getURL(pathname: `/${string}` = "/") {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ??
    process?.env?.NEXT_PUBLIC_VERCEL_URL ??
    "http://localhost:3000";
  url = url.includes("http") ? url : `https://${url}`;
  return url + pathname;
}

export function getSearchUrl(query: URLSearchParams | string) {
  const params = new URLSearchParams(query);
  return decodeURIComponent(`/search?${params.toString().toLowerCase()}`);
}

export function createParameter(key: string, name: string | undefined) {
  const params = new URLSearchParams();
  name && params.set(key, name);
  return params;
}

export function getCardUrl(card: SimpleCard) {
  let name = decodeURIComponent(card.name);
  const matches = name.match(/[a-zA-Z0-9é'&]+/gi) || [];
  name = matches.length ? matches.join("-") : name;

  name = name
    .replaceAll("&", "and")
    .replaceAll("'s", "s")
    .replaceAll("lv.", "lv");

  return `/cards/${name.toLowerCase()}/${card.id}`;
}

export function getCardPrice(currency: "EUR" | "USD", value?: number | null) {
  if (typeof value !== "number") return "--";
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(value);
}

export function getQueryKey(param: QueryKey) {
  const key = params[param];
  if (!key) throw new Error("Bad query parameter");
  return key;
}

export function getQueryKeys() {
  return Object.keys(params) as QueryKey[];
}

export function getQueryFallback(param: QueryKey) {
  const value = fallbacks[param];
  if (!value) throw new Error("Bad query parameter");
  return value;
}

export function getQueryFallbackKeys() {
  return Object.keys(fallbacks) as (keyof typeof fallbacks)[];
}
