import { SiteHeader } from "@/components/site-header";
import { SiteNav } from "@/components/site-nav";
import { SWRProvider } from "@/components/swr-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { getURL } from "@/lib/utils";
import "@/styles/colors.css";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Bungee, Rubik } from "next/font/google";

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
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout(props: React.PropsWithChildren) {
  return (
    <html
      lang="en"
      className={`${bungee.variable} ${rubik.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-svh flex-col bg-canvas font-rubik text-fg">
        <div className="bg-image" />
        <ThemeProvider>
          <SiteHeader />
          <SiteNav />
          <SWRProvider>{props.children}</SWRProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
