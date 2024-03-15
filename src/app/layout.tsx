import { Search } from "@/components/icons";
import { SWRProvider } from "@/components/providers";
import { Searchbar } from "@/components/searchbar";
import { Input } from "@/components/ui/input";
import { Link } from "@/components/ui/link";
import { getURL } from "@/lib/utils";
import type { Metadata } from "next";
import { Bungee, Rubik } from "next/font/google";
import "./globals.css";

const rubik = Rubik({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-rubik",
});

const bungee = Bungee({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-bungee",
});

export const metadata: Metadata = {
  metadataBase: new URL(getURL()),
  applicationName: "Pokefolder",
  title: {
    default: "Pokefolder",
    template: "%s • Pokefolder",
  },
  keywords: [
    "Pokemon cards",
    "Pokemon TCG",
    "Card search",
    "Deck building",
    "Collectible card game",
    "Pokemon battles",
    "Strategy",
    "Rare cards",
    "Custom decks",
    "TCG app",
    "Pokemon card database",
    "Card collection",
    "Online deck builder",
    "Competitive play",
    "Trading card game",
  ],
  robots: {
    index: true,
    follow: true,
    nocache: true,
    noimageindex: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout(props: React.PropsWithChildren) {
  return (
    <html lang="en" className={`${bungee.variable} ${rubik.variable}`}>
      <body className="bg-background font-rubik text-foreground">
        <div className="bg-image" />
        <div className="mx-auto flex min-h-svh max-w-screen-xl flex-col">
          <header className="flex items-stretch justify-between gap-3 px-3 py-3 md:py-6">
            <Link
              className="font-bungee text-xl uppercase outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background"
              href="/"
              variant={null}
              aria-label="go to home page"
            >
              <span className="hidden sm:block">Pokefolder</span>
              <span className="sm:hidden">PF</span>
            </Link>
            <Searchbar
              id="search-header"
              className="group flex items-center gap-2 rounded-lg border border-border py-0.5 pl-2 text-sm outline-none focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-1 focus-within:ring-offset-background hover:bg-muted"
            >
              <label htmlFor="search-header" className="sr-only">
                search cards
              </label>
              <Search className="hidden size-5 text-foreground/75 group-focus-within:text-foreground group-hover:text-foreground xs:inline xs:shrink-0" />
              <Input
                className="rounded-none border-none bg-transparent px-2 py-1.5 outline-none"
                placeholder="Search cards"
                name="cards"
                id="search-header"
                autoComplete="off"
              />
            </Searchbar>
          </header>
          <SWRProvider>{props.children}</SWRProvider>
          <footer className="px-3 py-6 text-center text-xs">
            The literal and graphical information presented on this site about
            Pokemon, including card data, Pokemon, The Pokemon TCG, and The
            Pokemon TCG Online and its trademarks are ©1995- 2023 Nintendo, The
            Pokémon Company International, Inc, and GAMEFREAK. This website is
            not produced, endorsed, supported, or affiliated with Nintendo, The
            Pokémon Company International, Inc, or GAMEFREAK. All other content
            © 2023 PokeFolder.
          </footer>
        </div>
      </body>
    </html>
  );
}
