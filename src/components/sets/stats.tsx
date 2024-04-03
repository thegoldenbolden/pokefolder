"use client";

import { cn } from "@/lib/utils";
import { CardObject } from "@/types/pokemon-tcg";
import { usePathname, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { PokemonCard } from "../pokemon/card";
import { CardLink } from "../pokemon/link";
import { Button } from "../ui/button";
import { ScrollArea, ScrollBar } from "../ui/scrollarea";

export type Filter = "types" | "subtypes" | "supertype" | "rarity";

type Stats = {
  tabs: {
    [P in Filter]: Map<string, number>;
  };
};

export function Stats({ tabs }: Stats) {
  const pathname = usePathname();
  const readonlySearchParams = useSearchParams();
  const currentTab = readonlySearchParams.get("tab") as Filter;
  const q = readonlySearchParams.get("q") as Filter;
  const searchParams = new URLSearchParams(readonlySearchParams);

  const getClassName = (tab?: Filter) => {
    return cn(
      "px-3 py-1 relative rounded-md",
      currentTab === tab
        ? "bg-primary/70"
        : "hover:bg-border focus-visible:bg-border",
    );
  };

  const goTo = (init: string[][] = []) => {
    if (!window) return;
    init.forEach(([name, value]) => searchParams.set(name, value));
    window.history.replaceState(null, "", `${pathname}?${searchParams}`);
  };

  const items: [string, number][] = [];
  if (currentTab in tabs) {
    items.push(...tabs[currentTab].entries());
  }

  return (
    <>
      <div className="rounded-xl border border-border bg-muted">
        <ScrollArea>
          <nav>
            <ul className="mx-auto flex w-full max-w-screen-xl gap-1 overflow-y-visible p-2">
              <li className={getClassName()}>
                <Button
                  onClick={() =>
                    goTo([
                      ["q", ""],
                      ["tab", ""],
                    ])
                  }
                >
                  Clear
                </Button>
              </li>
              <li className={getClassName("types")}>
                <Button
                  onClick={() =>
                    goTo([
                      ["q", ""],
                      ["tab", "types"],
                    ])
                  }
                >
                  Types
                </Button>
              </li>
              <li className={getClassName("subtypes")}>
                <Button
                  onClick={() =>
                    goTo([
                      ["q", ""],
                      ["tab", "subtypes"],
                    ])
                  }
                >
                  Subtypes
                </Button>
              </li>
              <li className={getClassName("supertype")}>
                <Button
                  onClick={() =>
                    goTo([
                      ["q", ""],
                      ["tab", "supertype"],
                    ])
                  }
                >
                  Supertypes
                </Button>
              </li>
              <li className={getClassName("rarity")}>
                <Button
                  onClick={() =>
                    goTo([
                      ["q", ""],
                      ["tab", "rarity"],
                    ])
                  }
                >
                  Rarities
                </Button>
              </li>
            </ul>
          </nav>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      {!currentTab ? null : (
        <div className="flex flex-col gap-2 rounded-xl border border-border bg-muted p-4">
          <ul className="flex flex-wrap gap-y-2">
            {items.map(([name, value]) => {
              return (
                <li
                  key={`${currentTab}.${name}`}
                  className="lg:basis-1/9 basis-1/3 sm:basis-1/6 md:basis-1/6"
                >
                  <Button
                    variant={null}
                    size={null}
                    data-active={currentTab === name}
                    className="group"
                    onClick={() => goTo([["q", name]])}
                  >
                    <div className="flex flex-col items-start gap-1">
                      <span className="text-start text-sm uppercase text-fg-soft decoration-2 group-hover:underline group-focus-visible:underline">
                        {name}
                      </span>
                      <span>{value.toString()} cards</span>
                    </div>
                  </Button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}

export function Cards({ cards }: { cards: CardObject[] }) {
  const readonlySearchParams = useSearchParams();
  const tab = readonlySearchParams.get("tab") as Filter;
  const q = readonlySearchParams.get("q") as Filter;

  const items = useMemo(() => {
    return cards.filter((card) => {
      if (!q) return true;
      const value = card[tab];

      if (Array.isArray(value)) {
        return value.includes(q);
      }

      if (typeof value === "string") {
        return value === q;
      }
    });
  }, [cards, q, tab]);

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
