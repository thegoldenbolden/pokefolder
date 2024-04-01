import { Search } from "@/components/icons";
import { Searchbar } from "@/components/searchbar";
import { Input } from "@/components/ui/input";
import { ThemeSwitcher } from "./theme-provider";

export function SiteFooter() {
  return (
    <footer className="mx-auto flex w-full max-w-screen-xl flex-wrap justify-between gap-2 px-3 py-6 text-sm text-fg/75">
      <div className="flex grow flex-col gap-1 text-balance md:basis-1/3">
        <p>
          The literal and graphical information presented on this site about
          Pokemon, including card data, Pokemon, The Pokemon TCG, and The
          Pokemon TCG Online and its trademarks are ©1995- 2024 Nintendo, The
          Pokémon Company International, Inc, and GAMEFREAK. This website is not
          produced, endorsed, supported, or affiliated with Nintendo, The
          Pokémon Company International, Inc, or GAMEFREAK.
        </p>
        <p>
          Card prices represent estimates and/or market valuess. No guarantee of
          accuracy is made for this information. See stores for actual, current
          prices.
        </p>
        <p>All other content © 2024 Pokefolder.</p>
      </div>
      <div className="order-first flex basis-full flex-col gap-2 self-start md:order-last md:basis-1/3">
        <Searchbar
          id="site-footer"
          className="motion-safe:transform-colors group flex w-full max-w-lg items-center gap-1 rounded-md border border-border bg-muted py-1 pl-2 focus-within:bg-input"
        >
          <label htmlFor="site-footer" className="sr-only">
            search cards
          </label>
          <Search className="size-5 opacity-50 group-focus-within:opacity-100 group-hover:text-fg xs:inline xs:shrink-0" />
          <Input
            className="h-auto rounded-none border-none bg-transparent px-2 py-1.5 text-sm outline-none placeholder:text-fg/50 focus-visible:placeholder:text-fg"
            placeholder="Search cards"
            name="cards"
            id="site-footer"
            autoComplete="off"
          />
        </Searchbar>
        <ThemeSwitcher />
      </div>
    </footer>
  );
}
