import { Gallery } from "@/components/gallery";
import { GalleryFooter } from "@/components/gallery/footer";
import {
  SelectOrder,
  SelectPerPage,
  SelectSort,
  ViewAs,
} from "@/components/gallery/toolbar";
import {
  Combobox,
  type DefaultMultiComboboxValue,
} from "@/components/search/combobox";
import { Form } from "@/components/search/form";
import { Input } from "@/components/search/input";
import { Slider } from "@/components/search/slider";
import { SiteFooter } from "@/components/site-footer";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormProvider } from "@/hooks/use-form";
import { getSets, getTypes } from "@/lib/pokemon-tcg";
import { regions as pokedex } from "@/lib/pokemon-tcg/constants";
import { getQueryFallback } from "@/lib/utils";
import type { QueryValues } from "@/types";
import type { SimpleSet } from "@/types/api/pokemon-tcg";
import type { Metadata, ResolvingMetadata } from "next";
import { Suspense } from "react";

export async function generateMetadata(
  _,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const keywords = (await parent)?.keywords || [];
  keywords.push(
    "Pokemon card search",
    "Card lookup",
    "Card finder",
    "Card database",
    "Pokemon TCG search",
    "Find Pokemon cards",
    "Search for cards",
    "Card collection search",
    "Pokemon card inventory",
    "Card catalog",
    "Card exploration",
    "Pokemon card database",
    "Trading card search",
    "Card rarity search",
    "Card details lookup",
  );

  return {
    keywords,
    alternates: { canonical: "/search" },
    description:
      "Discover and find your favorite Pokemon cards with ease. Our powerful search feature allows you to quickly locate specific cards, explore rarities, and build your perfect deck. Unleash your strategic skills in the Pokemon TCG and dominate the competition",
  };
}

export const revalidate = 604800;

export default async function Page() {
  const order: QueryValues["order"][] = ["asc", "desc"];
  const orderFallback = getQueryFallback("order");
  const sortFallback = getQueryFallback("sort");
  const limitFallback = getQueryFallback("limit");

  type Sort = {
    id: QueryValues["sort"];
    name: string;
  };

  const sort: Sort[] = [
    { id: "name", name: "Card Name" },
    { id: "number", name: "Card Number" },
    { id: "region", name: "Region" },
    { id: "release", name: "Release Date" },
    { id: "cardmarket", name: "Cardmarket Prices" },
    { id: "tcgplayer", name: "TCGPlayer Prices" },
  ];

  const [setsRes, typesRes, subtypesRes, supertypesRes, raritiesRes] =
    await Promise.all([
      getSets(),
      getTypes("types"),
      getTypes("subtypes"),
      getTypes("supertypes"),
      getTypes("rarities"),
    ]);

  const sets = setsRes?.data ?? [];
  const types = typesRes?.data ?? [];
  const subtypes = subtypesRes?.data ?? [];
  const supertypes = supertypesRes?.data ?? [];
  const rarities = raritiesRes?.data ?? [];
  const hpFallback = getQueryFallback("hp");
  const regions = Object.entries(pokedex);

  const marks = [
    { id: "d", name: "D" },
    { id: "e", name: "E" },
    { id: "f", name: "F" },
    { id: "g", name: "G" },
    { id: "h", name: "H" },
  ];

  const legalities = [
    { id: "expanded_legal", name: "Expanded: Legal" },
    { id: "standard_legal", name: "Standard: Legal" },
    { id: "unlimited_legal", name: "Unlimited: Legal" },
    { id: "expanded_banned", name: "Expanded: Banned" },
    { id: "standard_banned", name: "Standard: Banned" },
    { id: "unlimited_banned", name: "Unlimited: Banned" },
  ];

  return (
    <>
      <main className="mx-auto flex w-full max-w-screen-xl flex-col gap-6 p-2">
        <div className="flex flex-wrap items-stretch gap-1">
          <Suspense fallback={<ControlsFallback />}>
            <div className="flex flex-wrap items-stretch gap-1 md:grow-0">
              <SelectPerPage
                id="limit"
                defaultValue={limitFallback}
                fallback={limitFallback}
              >
                <SelectTrigger aria-label="items per page" variant="muted">
                  <SelectValue placeholder="Items per page" />
                </SelectTrigger>
                <SelectContent>
                  {[10, 20, 30, 40, 50, 60].map((size) => {
                    return (
                      <SelectItem key={`items-per-${size}`} value={`${size}`}>
                        {`${size}`}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </SelectPerPage>
              <SelectSort
                id="sort"
                defaultValue={sortFallback}
                fallback={sortFallback}
              >
                <SelectTrigger aria-label="sort cards" variant="muted">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sort.map((sort) => {
                    return (
                      <SelectItem
                        key={`sort-by-${sort.id}`}
                        value={`${sort.id}`}
                      >
                        {sort.name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </SelectSort>
              <SelectOrder
                id="order"
                defaultValue={orderFallback}
                fallback={orderFallback}
              >
                <SelectTrigger aria-label="order cards" variant="muted">
                  <SelectValue placeholder="Order" />
                </SelectTrigger>
                <SelectContent>
                  {order.map((order) => {
                    return (
                      <SelectItem key={`order-${order}`} value={order}>
                        {order === "asc" ? "Ascending" : "Descending"}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </SelectOrder>
            </div>
            <div className="flex flex-wrap items-stretch gap-1">
              <ViewAs />
              <FormProvider sets={sets}>
                <Form>
                  <Input
                    id="cards"
                    name="Cards"
                    placeholder="vikavolt, cynthia, gengar"
                  />
                  <Input
                    id="artists"
                    name="Artists"
                    placeholder="5ban graphics, kirisAki, tetsuya koizumi"
                  />
                  <Input
                    id="abilities"
                    name="Abilities"
                    placeholder="solid shell, snap trap, poisonous puddle"
                  />
                  <Input
                    id="attacks"
                    name="Attacks"
                    placeholder="bite, tackle, damage rush"
                  />
                  <Combobox
                    id="sets"
                    name="Sets"
                    placeholder="vivid voltage, 151, paradox rift"
                    data={sets.map((expansion) => setComboboxValues(expansion))}
                  />
                  <Combobox
                    id="rarities"
                    name="Rarities"
                    placeholder="rare prime, legend, amazing rare"
                    data={rarities.map((name) => setComboboxValues({ name }))}
                  />
                  <Combobox
                    id="subtypes"
                    name="Subtypes"
                    placeholder="ancient, fusion strike, break"
                    data={subtypes.map((name) => setComboboxValues({ name }))}
                  />
                  <Combobox
                    id="supertypes"
                    name="Supertypes"
                    placeholder="pokemon, trainer, energy"
                    data={supertypes.map((name) => setComboboxValues({ name }))}
                  />
                  <Combobox
                    id="types"
                    name="Types"
                    placeholder="colorless, grass, lightning"
                    data={types.map((name) => setComboboxValues({ name }))}
                  />
                  <Combobox
                    id="region"
                    name="Regions"
                    placeholder="hoenn, sinnoh, unova"
                    data={regions.map(([name, id]) =>
                      setComboboxValues({ name, id }),
                    )}
                  />
                  <Combobox
                    id="legalities"
                    name="Legalities"
                    placeholder="standard, unlimited"
                    data={legalities.map((legality) =>
                      setComboboxValues(legality),
                    )}
                  />
                  <Combobox
                    name="Regulation Marks"
                    placeholder="d, e, f"
                    id="marks"
                    data={marks}
                  />
                  <Slider
                    id="hp"
                    name="HP"
                    step={10}
                    max={hpFallback[1]}
                    min={hpFallback[0]}
                    minStepsBetweenThumbs={1}
                    defaultValue={hpFallback}
                  />
                </Form>
              </FormProvider>
            </div>
          </Suspense>
        </div>
        <Suspense fallback={<GalleryFallback />}>
          <Gallery />
          <GalleryFooter />
        </Suspense>
      </main>
      <SiteFooter />
    </>
  );
}

function setComboboxValues({
  id,
  name,
  series = undefined,
  images = undefined,
}: Partial<SimpleSet> & Pick<DefaultMultiComboboxValue, "name">) {
  return { id: id ? id : name.toLowerCase(), name, series, images };
}

function ControlsFallback() {
  return (
    <div
      role="status"
      className="h-9 w-full max-w-72 rounded-xl bg-muted motion-safe:animate-pulse"
    />
  );
}

function GalleryFallback() {
  return (
    <ul
      role="status"
      className="grid grow grid-cols-2 items-center justify-items-center gap-3 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
    >
      {Array.from({ length: 30 }).map((_, i) => (
        <li
          key={`fallback-${i}`}
          className="aspect-card max-h-[350px] w-full rounded-lg bg-muted drop-shadow-lg motion-safe:animate-pulse"
        />
      ))}
    </ul>
  );
}
