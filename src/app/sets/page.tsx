import { Image } from "@/components/ui/image";
import { Link } from "@/components/ui/link";
import { getSets } from "@/lib/pokemon-tcg";
import { getQueryKey, getSearchUrl } from "@/lib/utils";
import type { SimpleSet } from "@/types/api/pokemon-tcg";
import type { ResolvingMetadata } from "next";

export async function generateMetadata(_, parent: ResolvingMetadata) {
  const keywords = (await parent)?.keywords || [];
  return {
    title: "Expansions",
    description:
      "Explore a comprehensive collection of Pokemon TCG card expansions. From classic expansions to the latest releases, dive into the world of Pokemon cards. Discover the unique themes, artwork, and gameplay mechanics of each set. Complete your card collection and become a true Pokemon TCG connoisseur",
    keywords: [
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
      ...keywords,
    ],
  };
}

export default async function Page() {
  const sets = await getSets();

  if (!sets?.count) {
    return (
      <main className="flex grow items-center justify-center">
        <div className="mx-auto flex h-full max-w-xs grow flex-col justify-center">
          <p className="text-3xl font-bold">No results found</p>
          <p className="text-muted-foreground">
            Go back{" "}
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

  const series = Object.entries(group);

  return (
    <main className="flex flex-col gap-2">
      {series.map(([series, sets]) => {
        return (
          <section key={series} className="py-8">
            <h2 className="sticky top-0 z-30 flex items-center justify-between gap-2 p-3 font-bungee text-xl backdrop-blur-md">
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
                  className="group flex flex-col items-center gap-2 outline-none"
                >
                  <div className="motion-safe:transition-gpu relative w-full overflow-clip rounded-xl border border-border bg-spotlight/20 p-2 drop-shadow-md group-focus-visible:outline-none group-focus-visible:ring-2 group-focus-visible:ring-ring group-focus-visible:ring-offset-1 group-focus-visible:ring-offset-background">
                    <Image
                      src={set.images.logo}
                      alt={set.name ?? "a pokemon card"}
                      placeholder="blur"
                      fill
                      className="absolute left-0 top-0 mx-auto scale-110 object-contain opacity-[0.025]"
                    />
                    <Image
                      src={set.images.logo}
                      alt={set.name ?? "a pokemon card"}
                      placeholder="blur"
                      width={192}
                      height={128}
                      className="z-10 mx-auto h-40 object-contain object-center group-hover:scale-105 group-focus-visible:scale-105 motion-safe:transition-transform"
                    />
                  </div>
                  <span className="mt-auto font-semibold decoration-2 group-hover:underline group-focus-visible:underline">
                    {set.name}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
}
