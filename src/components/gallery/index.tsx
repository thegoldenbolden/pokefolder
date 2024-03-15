"use client";

import { getQueryKey } from "@/lib/utils";
import type { QueryValues } from "@/types";
import { useSearchParams } from "next/navigation";
import { Images } from "./images";
import { Table } from "./table";

export function Gallery() {
  const params = useSearchParams();
  const view = params.get(getQueryKey("view")) as QueryValues["view"];
  return view === "list" ? <Table /> : <Images />;
}
