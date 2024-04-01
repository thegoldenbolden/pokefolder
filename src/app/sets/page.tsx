import { SiteFooter } from "@/components/site-footer";
import { Image } from "@/components/ui/image";
import { Link } from "@/components/ui/link";
import { ScrollArea, ScrollBar } from "@/components/ui/scrollarea";
import { getSets } from "@/lib/pokemon-tcg";
import { getQueryKey, getSearchUrl } from "@/lib/utils";
import type { SimpleSet } from "@/types/api/pokemon-tcg";
import type { ResolvingMetadata } from "next";

export async function generateMetadata(_, parent: ResolvingMetadata) {
  const keywords = (await parent)?.keywords || [];
  keywords.push(
    "Pokemon card expansions",
    "TCG expansions",
    "Complete card expansions",
    "Set collection",
    "All card expansions",
    "Set catalog",
    "Pokemon TCG releases",
    "Card set archive",
    "Complete card list",
    "Set checklist",
    "Expansion packs",
    "Set gallery",
    "Card set database",
    "Set details",
    "Set history",
  );
  return {
    keywords,
    title: "Expansions",
    description:
      "Explore a comprehensive collection of Pokemon TCG card expansions. From classic expansions to the latest releases, dive into the world of Pokemon cards. Discover the unique themes, artwork, and gameplay mechanics of each set. Complete your card collection and become a true Pokemon TCG connoisseur",
  };
}

export default async function Page() {
  const sets = await getSets();

  if (!sets?.count || !sets?.data) {
    return (
      <main className="flex grow items-center justify-center px-3">
        <div className="mx-auto flex h-full max-w-xs flex-col justify-center rounded-xl border border-border bg-muted p-6">
          <p className="text-xl font-bold">No results found</p>
          <p className="text-muted-fg">
            Return&nbsp;
            <Link className="text-primary" href="/">
              home
            </Link>
          </p>
        </div>
      </main>
    );
  }

  const group: { [key: string]: SimpleSet[] } = {};

  sets.data.forEach((set) => {
    if (!set.series) return;
    group[set.series] ??= [];
    group[set.series].push(set);
  });

  const sections = Object.entries(group);

  const seriesId = (x: string) => {
    let name = decodeURIComponent(x);
    const matches = name.match(/[a-zA-Z0-9é'&]+/gi) || [];
    name = matches.length ? matches.join("-") : name;

    name = name
      .replaceAll("&", "and")
      .replaceAll("'s", "s")
      .replaceAll("lv.", "lv");
    return name.toLowerCase();
  };

  return (
    <>
      <div className="sticky top-12 z-50 mx-auto w-full max-w-screen-xl border-b border-b-border bg-canvas xl:rounded-b-xl xl:border-x xl:border-x-border">
        <div className="flex flex-wrap items-center justify-between px-3 py-1.5">
          <span className="font-medium">Jump to series</span>
          <span className="rounded-lg border border-border bg-muted px-3 py-0.5 text-sm tracking-wider text-muted-fg">
            {sets.data.length.toString()} sets
          </span>
        </div>
        <ScrollArea>
          <nav aria-label="jump to series links">
            <ul className="flex gap-4 px-3 pb-1.5">
              {sections.map(([series]) => {
                const name = seriesId(series);
                return (
                  <li key={name}>
                    <Link
                      className="w-max tracking-wide text-fg-soft"
                      href={`/sets#${name}`}
                    >
                      {series}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      <main className="mx-auto flex w-full max-w-screen-xl flex-col gap-2">
        {sections.map(([series, sets]) => {
          const name = seriesId(series);
          return (
            <section
              id={seriesId(name)}
              key={name}
              className="-mt-32 pb-8 pt-32"
            >
              <h2 className="flex items-center justify-between gap-2 p-3 font-bungee text-xl">
                {series}
              </h2>
              <div className="grid grid-cols-1 gap-x-2 gap-y-8 p-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {sets.map((set) => (
                  <Link
                    key={set.id}
                    variant={null}
                    href={getSearchUrl(`${getQueryKey("sets")}=${set.id}`)}
                    aria-label={set.name}
                    title={`${set.series}: ${set.name}`}
                    className="group relative flex flex-col items-center gap-2 outline-none"
                  >
                    <span className="absolute left-3 top-3 z-20 rounded-lg border border-border bg-muted px-3 py-0.5 text-sm tracking-wider text-muted-fg">
                      {set.total.toString()} cards
                    </span>
                    <div className="motion-safe:transition-gpu relative w-full overflow-clip rounded-xl border border-border bg-spotlight/20 p-2 drop-shadow-md group-focus-visible:outline-none group-focus-visible:ring-2 group-focus-visible:ring-ring group-focus-visible:ring-offset-1 group-focus-visible:ring-offset-canvas">
                      <Image
                        src={set.images.logo}
                        alt={set.name ?? "a pokemon card"}
                        fill
                        className="absolute left-0 top-0 mx-auto scale-110 object-contain opacity-[0.025]"
                      />
                      <Image
                        src={set.images.logo}
                        alt={set.name ?? "a pokemon card"}
                        width={192}
                        height={128}
                        className="z-10 mx-auto h-40 object-contain object-center group-hover:scale-105 group-focus-visible:scale-105 motion-safe:transition-transform"
                      />
                    </div>
                    <span className="mt-auto font-semibold decoration-2 group-hover:underline group-focus-visible:underline">
                      {set.name}
                    </span>
                    <span className="text-sm text-fg-soft">
                      {set.releaseDate}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </main>
      <SiteFooter />
    </>
  );
}
