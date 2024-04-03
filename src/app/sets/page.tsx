import { SiteFooter } from "@/components/site-footer";
import { Image } from "@/components/ui/image";
import { Link } from "@/components/ui/link";
import { ScrollArea, ScrollBar } from "@/components/ui/scrollarea";
import { groupBySeries } from "@/lib/pokemon-tcg";
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

export default function Page() {
  const data = groupBySeries();

  return (
    <>
      <div className="sticky top-12 z-50 mx-auto w-full max-w-screen-xl border-b border-b-border bg-canvas xl:rounded-b-xl xl:border-x xl:border-x-border">
        <div className="flex flex-wrap items-center justify-between px-3 py-1.5">
          <span className="font-medium">Jump to series</span>
          <span className="rounded-lg border border-border bg-muted px-3 py-0.5 text-sm tracking-wider text-muted-fg">
            {data.total.expansions} sets
          </span>
        </div>
        <ScrollArea>
          <nav aria-label="jump to series links">
            <ul className="flex flex-row-reverse gap-4 px-3 pb-1.5">
              {data.series.map((series) => {
                return (
                  <li key={series.href}>
                    <Link
                      className="w-max tracking-wide text-fg-soft"
                      href={`/sets#${series.href}`}
                    >
                      {series.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      <main className="mx-auto flex w-full max-w-screen-xl flex-col-reverse gap-2">
        {data.series.map((series) => {
          return (
            <section
              key={series.name}
              id={series.href}
              className="-mt-32 pb-8 pt-32"
            >
              <h2 className="flex items-center justify-between gap-2 p-3 font-bungee text-xl">
                {series.name}
              </h2>
              <div className="grid grid-cols-1 gap-x-2 gap-y-8 p-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {series.expansions.map((expansion) => (
                  <Link
                    key={expansion.id}
                    variant={null}
                    href={`/sets/${expansion.href}`}
                    aria-label={expansion.name}
                    title={`${series.name}: ${expansion.name}`}
                    className="group relative flex flex-col items-center gap-2 outline-none"
                  >
                    <span className="absolute left-3 top-3 z-20 rounded-lg border border-border bg-muted px-3 py-0.5 text-sm tracking-wider text-muted-fg">
                      {expansion.total.toString()} cards
                    </span>
                    <div className="motion-safe:transition-gpu relative w-full overflow-clip rounded-xl border border-border bg-spotlight/20 p-2 drop-shadow-md group-focus-visible:outline-none group-focus-visible:ring-2 group-focus-visible:ring-ring group-focus-visible:ring-offset-1 group-focus-visible:ring-offset-canvas">
                      <Image
                        src={expansion.images.logo.src}
                        alt={expansion.images.logo.alt}
                        fill
                        className="absolute left-0 top-0 mx-auto scale-110 object-contain opacity-[0.025]"
                      />
                      <Image
                        src={expansion.images.logo.src}
                        alt={expansion.images.logo.alt}
                        width={192}
                        height={128}
                        className="z-10 mx-auto h-40 object-contain object-center group-hover:scale-105 group-focus-visible:scale-105 motion-safe:transition-transform"
                      />
                    </div>
                    <span className="mt-auto font-semibold decoration-2 group-hover:underline group-focus-visible:underline">
                      {expansion.name}
                    </span>
                    <span className="text-sm text-fg-soft">
                      {expansion.releaseDate}
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
