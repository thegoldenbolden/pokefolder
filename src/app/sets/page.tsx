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
  const reversed = data.series.reverse();

  return (
    <>
      <div className="sticky top-12 z-50 border-b border-b-border bg-canvas">
        <div className="mx-auto flex w-full max-w-screen-xl flex-wrap items-center justify-between px-3 py-1.5">
          <span className="font-medium">Jump to series</span>
          <span className="rounded-lg border border-border bg-muted px-3 py-0.5 text-sm tracking-wider text-muted-fg">
            {data.total.expansions} sets
          </span>
        </div>
        <ScrollArea className="mx-auto w-full max-w-screen-xl">
          <nav aria-label="jump to series links">
            <ul className="flex gap-4 px-3 pb-1.5">
              {reversed.map((series) => {
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
      <main className="mx-auto flex w-full max-w-screen-xl flex-col gap-2">
        {reversed.map((series) => {
          return (
            <section
              key={series.name}
              id={series.href}
              className="-mt-32 pb-8 pt-32"
            >
              <h2 className="flex items-center justify-between gap-2 p-3 font-bungee text-xl">
                {series.name}
              </h2>
              <div className="grid grid-cols-1 gap-x-2 gap-y-8 p-3 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                {series.expansions.map((expansion) => (
                  <div key={expansion.id} className="group flex flex-col gap-2">
                    <Link
                      variant={null}
                      tabIndex={-1}
                      href={`/sets/${expansion.href}`}
                      aria-label={expansion.name}
                      title={`${series.name}: ${expansion.name}`}
                      className="relative w-full overflow-hidden rounded-xl border border-border bg-gradient-to-b from-border/75 to-muted/75 p-2 group-has-[a:focus-visible]:ring-2 group-has-[a:focus-visible]:ring-ring group-has-[a:focus-visible]:ring-offset-2 group-has-[a:focus-visible]:ring-offset-canvas group-has-[a:hover]:brightness-95"
                    >
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
                        className="z-10 mx-auto h-40 object-contain object-center group-has-[a:focus-visible]:scale-105 group-has-[a:hover]:scale-105 motion-safe:transition-transform"
                      />
                    </Link>
                    <div className="flex flex-col gap-2">
                      <Link
                        href={`/sets/${expansion.href}`}
                        aria-label={expansion.name}
                        className="group-has-[a:hover]:underline"
                        title={`${series.name}: ${expansion.name}`}
                      >
                        {expansion.name}
                      </Link>
                      <span className="mx-auto text-sm text-fg-soft">
                        {expansion.releaseDate} • {expansion.total.toString()}{" "}
                        cards
                      </span>
                    </div>
                  </div>
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
