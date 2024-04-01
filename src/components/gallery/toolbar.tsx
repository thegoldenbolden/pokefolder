"use client";

import { Grid, Table } from "@/components/icons";
import { Link } from "@/components/ui/link";
import { Select } from "@/components/ui/select";
import { MAX_PAGE_LIMIT, MIN_PAGE_LIMIT } from "@/lib/constants";
import { getNumberFromRange } from "@/lib/pokemon-tcg/utils";
import { getQueryKey, getSearchUrl } from "@/lib/utils";
import type { QueryKey, QueryValues } from "@/types";
import { useSearchParams } from "next/navigation";
import * as React from "react";

export function ViewAs() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const viewKey = getQueryKey("view");
  const isListView =
    params.get(viewKey) === ("list" satisfies QueryValues["view"]);

  params.set(viewKey, "list" satisfies QueryValues["view"]);
  const listLink = getSearchUrl(params);

  params.set(viewKey, "images" satisfies QueryValues["view"]);
  const imagesLink = getSearchUrl(params);

  return (
    <>
      <Link
        variant={!isListView ? "primary" : "ghost"}
        size="icon"
        href={imagesLink}
        aria-label="view cards as images"
        title="Images"
      >
        <Grid />
      </Link>
      <Link
        size="icon"
        variant={isListView ? "primary" : "ghost"}
        href={listLink}
        aria-label="view cards as a table"
        title="Table"
      >
        <Table />
      </Link>
    </>
  );
}

type SelectProps<T extends QueryKey> = React.ComponentProps<typeof Select> & {
  id: Extract<QueryKey, T>;
  fallback: QueryValues[T];
};

export function SelectOrder({ fallback, ...props }: SelectProps<"order">) {
  const searchParams = useSearchParams();

  return (
    <Select
      {...props}
      onValueChange={(v) => {
        const params = new URLSearchParams(searchParams);
        params.set(props.id, v || fallback);
        window.history.replaceState(null, "", getSearchUrl(params));
      }}
    />
  );
}

export function SelectSort({ fallback, ...props }: SelectProps<"sort">) {
  const searchParams = useSearchParams();

  return (
    <Select
      {...props}
      onValueChange={(v) => {
        const params = new URLSearchParams(searchParams);
        params.set(props.id, v || fallback);
        window.history.pushState(null, "", getSearchUrl(params));
      }}
    />
  );
}

export function SelectPerPage({ fallback, ...props }: SelectProps<"limit">) {
  const searchParams = useSearchParams();
  const pageKey = getQueryKey("page");

  const pageSize = searchParams.get(props.id);

  const getPageSize = () => {
    return getNumberFromRange({
      min: MIN_PAGE_LIMIT,
      max: MAX_PAGE_LIMIT,
      round: 10,
      value: pageSize,
      fallback,
    });
  };

  return (
    <Select
      {...props}
      value={`${getPageSize()}`}
      onValueChange={(v) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(props.id, v);
        params.set(pageKey, "1");
        window.history.pushState(null, "", getSearchUrl(params));
      }}
    />
  );
}
