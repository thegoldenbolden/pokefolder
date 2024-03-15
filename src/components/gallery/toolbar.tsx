"use client";

import { Grid, Table } from "@/components/icons";
import { Link } from "@/components/ui/link";
import { Select } from "@/components/ui/select";
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
        variant={!isListView ? "foreground" : "border"}
        size="icon"
        color={isListView ? "muted" : "primary"}
        href={imagesLink}
        aria-label="view as images"
        title="Images"
      >
        <Grid />
      </Link>
      <Link
        size="icon"
        variant={isListView ? "foreground" : "border"}
        href={listLink}
        aria-label="view as table"
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

export function SelectOrder({ id, fallback, ...props }: SelectProps<"order">) {
  const searchParams = useSearchParams();

  return (
    <Select
      {...props}
      onValueChange={(v) => {
        const params = new URLSearchParams(searchParams);
        params.set(id, v || fallback);
        window.history.replaceState(null, "", getSearchUrl(params));
      }}
    />
  );
}

export function SelectSort({ id, fallback, ...props }: SelectProps<"sort">) {
  const searchParams = useSearchParams();

  return (
    <Select
      {...props}
      onValueChange={(v) => {
        const params = new URLSearchParams(searchParams);
        params.set(id, v || fallback);
        window.history.pushState(null, "", getSearchUrl(params));
      }}
    />
  );
}
