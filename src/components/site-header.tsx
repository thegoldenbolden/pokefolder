import { Search } from "@/components/icons";
import { Searchbar } from "@/components/searchbar";
import { ThemeSwitcher } from "@/components/theme-provider";
import { Input } from "@/components/ui/input";

export function SiteHeader() {
  return (
    <div className="bg-canvas">
      <header className="mx-auto flex w-full max-w-screen-xl items-center gap-3 px-3 py-2 lg:px-0">
        <span className="font-bungee text-xl">PF</span>
        <Searchbar
          id="site-header"
          className="motion-safe:transform-colors group flex w-full max-w-lg items-center gap-1 rounded-md border border-border bg-muted py-1 pl-2 focus-within:bg-input"
        >
          <label htmlFor="site-header" className="sr-only">
            search cards
          </label>
          <Search className="size-5 opacity-50 group-focus-within:opacity-100 group-hover:text-fg xs:inline xs:shrink-0" />
          <Input
            className="h-auto rounded-none border-none bg-transparent px-2 py-1.5 text-sm outline-none placeholder:text-fg/50 focus-visible:placeholder:text-fg"
            placeholder="Search cards"
            name="cards"
            id="site-header"
            autoComplete="off"
          />
        </Searchbar>
        <div className="ml-auto">
          <ThemeSwitcher />
        </div>
      </header>
    </div>
  );
}
