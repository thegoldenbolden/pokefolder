"use client";

import { cn } from "@/lib/utils";
import { CardObject } from "@/types/pokemon-tcg";
import {
  ReadonlyURLSearchParams,
  usePathname,
  useSearchParams,
} from "next/navigation";
import { useMemo } from "react";
import { PokemonCard } from "../pokemon/card";
import { CardLink } from "../pokemon/link";
import { TypeImage } from "../pokemon/type";
import { Button } from "../ui/button";
import { ScrollArea, ScrollBar } from "../ui/scrollarea";

export type Filter = "types" | "subtypes" | "supertypes" | "rarities";
type View = "table" | "images";

type Params = Partial<Record<Filter, string>> & {
  view: "table" | "images";
  stat?: Filter;
};

type Stats = {
  cards: CardObject[];
  stats: {
    [P in Filter]: Map<string, number>;
  };
};

export function Stats({ cards, stats }: Stats) {
  const pathname = usePathname();
  const readonlySearchParams = useSearchParams();
  const currentFilter = (readonlySearchParams.get("stat") || "") as Filter;
  const currentFilterValue = readonlySearchParams.get(currentFilter || "");

  const searchParams = new URLSearchParams(readonlySearchParams.toString());

  const getClassName = (filter?: Filter) => {
    return cn(
      "px-3 py-1 relative rounded-md",
      readonlySearchParams.has(`${filter}`) && "bg-primary/30",
      readonlySearchParams.get("stat") === filter &&
        "bg-primary text-primary-fg",
    );
  };

  const goTo = (
    query: `&${Lowercase<keyof Params>}=${Filter | View}` | "" = "",
  ) => {
    if (!window) return;

    if (query.startsWith("&stat")) {
      searchParams.delete("stat");
    }

    window.history.replaceState(
      null,
      "",
      `${pathname}?${searchParams.toString()}${query}`,
    );
  };

  const clearAll = () => {
    if (!window) return;
    const view = readonlySearchParams.get("view") || "images";
    goTo(`&view=${view as View}`);
  };

  const clearFilter = (filter: string | null) => {
    if (!window || !filter) return;
    for (const key of searchParams.keys()) {
      searchParams.delete(key);
    }
    goTo();
  };

  const items: [string, number][] = [];
  if (currentFilter in stats) {
    items.push(...stats[currentFilter].entries());
  }

  return (
    <>
      <div className="rounded-xl border border-border bg-muted">
        <ScrollArea>
          <nav>
            <ul className="mx-auto flex w-full max-w-screen-xl gap-1 overflow-y-visible p-2">
              <li className={getClassName()}>
                <Button onClick={() => clearAll()}>Clear</Button>
              </li>
              <li className={getClassName("types")}>
                <Button onClick={() => goTo("&stat=types")}>Types</Button>
              </li>
              <li className={getClassName("subtypes")}>
                <Button onClick={() => goTo("&stat=subtypes")}>Subtypes</Button>
              </li>
              <li className={getClassName("supertypes")}>
                <Button onClick={() => goTo("&stat=supertypes")}>
                  Supertypes
                </Button>
              </li>
              <li className={getClassName("rarities")}>
                <Button onClick={() => goTo("&stat=rarities")}>Rarities</Button>
              </li>
            </ul>
          </nav>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      {!currentFilter ? null : (
        <div className="flex flex-col gap-2 rounded-xl border border-border bg-muted p-4">
          <Button
            variant="underline"
            onClick={() => clearFilter(currentFilter)}
            className="hover:text-destructive focus-visible:text-destructive self-start text-sm uppercase"
          >
            Clear {currentFilter}
          </Button>
          <ul className="flex flex-wrap gap-y-2">
            {items.map(([name, value]) => {
              return (
                <li
                  key={`${currentFilter}.${name}`}
                  className="lg:basis/9 xl:basis/12 basis-1/3 sm:basis-1/6 md:basis-1/6"
                >
                  <button
                    data-active={currentFilterValue === name}
                    onClick={() => {
                      searchParams.set(currentFilter, name);
                      window &&
                        window.history.replaceState(
                          null,
                          "",
                          `${pathname}?${searchParams.toString()}`,
                        );
                    }}
                  >
                    <Stat
                      filter={currentFilter as Filter}
                      name={name}
                      value={value}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}

const getFiltered = (data: CardObject[], params: ReadonlyURLSearchParams) => {
  return data.filter((card) => {
    const types = params.get("types") || "";
    const subtypes = params.get("subtypes") || "";
    const supertypes = params.get("supertypes") || "";
    const rarities = params.get("rarities") || "";

    if (!types && !subtypes && !supertypes && !rarities) {
      return true;
    }

    return (
      card.types?.includes(types) ||
      card.subtypes?.includes(subtypes) ||
      card.rarity === rarities ||
      card.supertype === supertypes
    );
  });
};

export function Cards({ cards }: { cards: CardObject[] }) {
  const params = useSearchParams();

  const items = useMemo(() => {
    return getFiltered(cards, params);
  }, [cards, params]);

  return (
    <ul className="grid w-full grid-cols-2 items-center gap-4 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {items.map((card) => {
        return (
          <li key={card.id}>
            <CardLink
              id={card.id}
              name={card.name}
              aria-label={`${card.name} from ${card.set.name}`}
            >
              <PokemonCard
                alt={`${card.name} from ${card.set.name}`}
                name={card.name}
                src={card.images.small}
                types={card.types}
              />
            </CardLink>
          </li>
        );
      })}
    </ul>
  );
}

type StatProps = {
  filter: Filter;
  name: string;
  value: number;
};

function Stat({ name, value, filter }: StatProps) {
  switch (filter) {
    default:
      return (
        <div className="flex flex-col items-start gap-1">
          <span className="text-start text-sm uppercase text-fg-soft decoration-2 group-hover:underline group-focus-visible:underline">
            {name}
          </span>
          <span>{value.toString()} cards</span>
        </div>
      );
    case "types":
      return (
        <div className="flex flex-col items-start gap-1">
          <div className="flex items-center gap-1">
            <TypeImage width={24} height={24} name={name} />
            <span className="text-start text-sm uppercase text-fg-soft decoration-2 group-hover:underline group-focus-visible:underline">
              {name}
            </span>
          </div>
          <span>{value.toString()} cards</span>
        </div>
      );
  }
}
