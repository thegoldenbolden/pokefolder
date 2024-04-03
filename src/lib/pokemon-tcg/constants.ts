import type { QueryKey, QueryValues } from "@/types";
/**
 * Map Pokemon Regions to Pokedex Number
 */
export const regions = {
  kanto: "1 TO 151",
  johto: "152 TO 251",
  hoenn: "252 TO 386",
  sinnoh: "387 TO 493",
  unova: "494 TO 649",
  kalos: "650 TO 721",
  alola: "722 TO 809",
  galar: "810 TO 905",
  paldea: "906 TO 1010",
};

/**
 * Map search params to tcg params
 */
export const externalApiQueryFields: Record<
  Exclude<QueryKey, "hp" | "order" | "view">,
  string
> = {
  abilities: "!abilities.name",
  artists: "artist",
  attacks: "!attacks.name",
  cards: "name",
  sets: "set.id",
  legalities: "",
  limit: "pageSize",
  marks: "regulationMark",
  page: "page",
  rarities: "rarity",
  region: "",
  series: "set.series",
  sort: "orderBy",
  subtypes: "subtypes",
  supertypes: "supertype",
  types: "types",
  traits: "ancientTrait.name",
};

/**
 * Map sort param to TCG orderBy params
 */
export const externalApiOrderBy: Record<QueryValues["sort"], string> = {
  name: "name",
  number: "number",
  release: "set.releaseDate",
  region: "nationalPokedexNumbers.0",
  cardmarket: "cardmarket.prices.trendPrice",
  tcgplayer: "tcgplayer.prices.normal.low",
  series: "set.series",
};

type Image = {
  src: string;
  alt: string;
};

export type Expansion = {
  id: string;
  name: string;
  total: string;
  href: string;
  releaseDate: string;
  series: {
    name: string;
    href: string;
  };
  images: {
    symbol: Image;
    logo: Image;
  };
};

/** List of sets returned from https://api.pokemontcg.io/v2/sets */
export const expansions = new Map([
  [
    "base",
    {
      id: "base1",
      name: "Base",
      href: "base",
      total: "102",
      releaseDate: "1999/01/09",
      series: { name: "Base", href: "base" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/base1/symbol.png",
          alt: "Symbol for the expansion Base from Base",
        },
        logo: {
          src: "https://images.pokemontcg.io/base1/logo.png",
          alt: "Logo for the expansion Base from Base",
        },
      },
    },
  ],
  [
    "jungle",
    {
      id: "base2",
      name: "Jungle",
      href: "jungle",
      total: "64",
      releaseDate: "1999/06/16",
      series: { name: "Base", href: "base" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/base2/symbol.png",
          alt: "Symbol for the expansion Jungle from Base",
        },
        logo: {
          src: "https://images.pokemontcg.io/base2/logo.png",
          alt: "Logo for the expansion Jungle from Base",
        },
      },
    },
  ],
  [
    "wizards-black-star-promos",
    {
      id: "basep",
      name: "Wizards Black Star Promos",
      href: "wizards-black-star-promos",
      total: "53",
      releaseDate: "1999/07/01",
      series: { name: "Base", href: "base" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/basep/symbol.png",
          alt: "Symbol for the expansion Wizards Black Star Promos from Base",
        },
        logo: {
          src: "https://images.pokemontcg.io/basep/logo.png",
          alt: "Logo for the expansion Wizards Black Star Promos from Base",
        },
      },
    },
  ],
  [
    "fossil",
    {
      id: "base3",
      name: "Fossil",
      href: "fossil",
      total: "62",
      releaseDate: "1999/10/10",
      series: { name: "Base", href: "base" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/base3/symbol.png",
          alt: "Symbol for the expansion Fossil from Base",
        },
        logo: {
          src: "https://images.pokemontcg.io/base3/logo.png",
          alt: "Logo for the expansion Fossil from Base",
        },
      },
    },
  ],
  [
    "base-set-2",
    {
      id: "base4",
      name: "Base Set 2",
      href: "base-set-2",
      total: "130",
      releaseDate: "2000/02/24",
      series: { name: "Base", href: "base" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/base4/symbol.png",
          alt: "Symbol for the expansion Base Set 2 from Base",
        },
        logo: {
          src: "https://images.pokemontcg.io/base4/logo.png",
          alt: "Logo for the expansion Base Set 2 from Base",
        },
      },
    },
  ],
  [
    "team-rocket",
    {
      id: "base5",
      name: "Team Rocket",
      href: "team-rocket",
      total: "83",
      releaseDate: "2000/04/24",
      series: { name: "Base", href: "base" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/base5/symbol.png",
          alt: "Symbol for the expansion Team Rocket from Base",
        },
        logo: {
          src: "https://images.pokemontcg.io/base5/logo.png",
          alt: "Logo for the expansion Team Rocket from Base",
        },
      },
    },
  ],
  [
    "gym-heroes",
    {
      id: "gym1",
      name: "Gym Heroes",
      href: "gym-heroes",
      total: "132",
      releaseDate: "2000/08/14",
      series: { name: "Gym", href: "gym" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/gym1/symbol.png",
          alt: "Symbol for the expansion Gym Heroes from Gym",
        },
        logo: {
          src: "https://images.pokemontcg.io/gym1/logo.png",
          alt: "Logo for the expansion Gym Heroes from Gym",
        },
      },
    },
  ],
  [
    "gym-challenge",
    {
      id: "gym2",
      name: "Gym Challenge",
      href: "gym-challenge",
      total: "132",
      releaseDate: "2000/10/16",
      series: { name: "Gym", href: "gym" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/gym2/symbol.png",
          alt: "Symbol for the expansion Gym Challenge from Gym",
        },
        logo: {
          src: "https://images.pokemontcg.io/gym2/logo.png",
          alt: "Logo for the expansion Gym Challenge from Gym",
        },
      },
    },
  ],
  [
    "neo-genesis",
    {
      id: "neo1",
      name: "Neo Genesis",
      href: "neo-genesis",
      total: "111",
      releaseDate: "2000/12/16",
      series: { name: "Neo", href: "neo" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/neo1/symbol.png",
          alt: "Symbol for the expansion Neo Genesis from Neo",
        },
        logo: {
          src: "https://images.pokemontcg.io/neo1/logo.png",
          alt: "Logo for the expansion Neo Genesis from Neo",
        },
      },
    },
  ],
  [
    "neo-discovery",
    {
      id: "neo2",
      name: "Neo Discovery",
      href: "neo-discovery",
      total: "75",
      releaseDate: "2001/06/01",
      series: { name: "Neo", href: "neo" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/neo2/symbol.png",
          alt: "Symbol for the expansion Neo Discovery from Neo",
        },
        logo: {
          src: "https://images.pokemontcg.io/neo2/logo.png",
          alt: "Logo for the expansion Neo Discovery from Neo",
        },
      },
    },
  ],
  [
    "southern-islands",
    {
      id: "si1",
      name: "Southern Islands",
      href: "southern-islands",
      total: "18",
      releaseDate: "2001/07/31",
      series: { name: "Other", href: "other" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/si1/symbol.png",
          alt: "Symbol for the expansion Southern Islands from Other",
        },
        logo: {
          src: "https://images.pokemontcg.io/si1/logo.png",
          alt: "Logo for the expansion Southern Islands from Other",
        },
      },
    },
  ],
  [
    "neo-revelation",
    {
      id: "neo3",
      name: "Neo Revelation",
      href: "neo-revelation",
      total: "66",
      releaseDate: "2001/09/21",
      series: { name: "Neo", href: "neo" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/neo3/symbol.png",
          alt: "Symbol for the expansion Neo Revelation from Neo",
        },
        logo: {
          src: "https://images.pokemontcg.io/neo3/logo.png",
          alt: "Logo for the expansion Neo Revelation from Neo",
        },
      },
    },
  ],
  [
    "neo-destiny",
    {
      id: "neo4",
      name: "Neo Destiny",
      href: "neo-destiny",
      total: "113",
      releaseDate: "2002/02/28",
      series: { name: "Neo", href: "neo" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/neo4/symbol.png",
          alt: "Symbol for the expansion Neo Destiny from Neo",
        },
        logo: {
          src: "https://images.pokemontcg.io/neo4/logo.png",
          alt: "Logo for the expansion Neo Destiny from Neo",
        },
      },
    },
  ],
  [
    "legendary-collection",
    {
      id: "base6",
      name: "Legendary Collection",
      href: "legendary-collection",
      total: "110",
      releaseDate: "2002/05/24",
      series: { name: "Other", href: "other" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/base6/symbol.png",
          alt: "Symbol for the expansion Legendary Collection from Other",
        },
        logo: {
          src: "https://images.pokemontcg.io/base6/logo.png",
          alt: "Logo for the expansion Legendary Collection from Other",
        },
      },
    },
  ],
  [
    "expedition-base-set",
    {
      id: "ecard1",
      name: "Expedition Base Set",
      href: "expedition-base-set",
      total: "165",
      releaseDate: "2002/09/15",
      series: { name: "E-Card", href: "e-card" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/ecard1/symbol.png",
          alt: "Symbol for the expansion Expedition Base Set from E-Card",
        },
        logo: {
          src: "https://images.pokemontcg.io/ecard1/logo.png",
          alt: "Logo for the expansion Expedition Base Set from E-Card",
        },
      },
    },
  ],
  [
    "best-of-game",
    {
      id: "bp",
      name: "Best of Game",
      href: "best-of-game",
      total: "9",
      releaseDate: "2002/12/01",
      series: { name: "Other", href: "other" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/bp/symbol.png",
          alt: "Symbol for the expansion Best of Game from Other",
        },
        logo: {
          src: "https://images.pokemontcg.io/bp/logo.png",
          alt: "Logo for the expansion Best of Game from Other",
        },
      },
    },
  ],
  [
    "aquapolis",
    {
      id: "ecard2",
      name: "Aquapolis",
      href: "aquapolis",
      total: "182",
      releaseDate: "2003/01/15",
      series: { name: "E-Card", href: "e-card" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/ecard2/symbol.png",
          alt: "Symbol for the expansion Aquapolis from E-Card",
        },
        logo: {
          src: "https://images.pokemontcg.io/ecard2/logo.png",
          alt: "Logo for the expansion Aquapolis from E-Card",
        },
      },
    },
  ],
  [
    "skyridge",
    {
      id: "ecard3",
      name: "Skyridge",
      href: "skyridge",
      total: "182",
      releaseDate: "2003/05/12",
      series: { name: "E-Card", href: "e-card" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/ecard3/symbol.png",
          alt: "Symbol for the expansion Skyridge from E-Card",
        },
        logo: {
          src: "https://images.pokemontcg.io/ecard3/logo.png",
          alt: "Logo for the expansion Skyridge from E-Card",
        },
      },
    },
  ],
  [
    "ruby-and-sapphire",
    {
      id: "ex1",
      name: "Ruby & Sapphire",
      href: "ruby-and-sapphire",
      total: "109",
      releaseDate: "2003/07/01",
      series: { name: "EX", href: "ex" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/ex1/symbol.png",
          alt: "Symbol for the expansion Ruby & Sapphire from EX",
        },
        logo: {
          src: "https://images.pokemontcg.io/ex1/logo.png",
          alt: "Logo for the expansion Ruby & Sapphire from EX",
        },
      },
    },
  ],
  [
    "sandstorm",
    {
      id: "ex2",
      name: "Sandstorm",
      href: "sandstorm",
      total: "100",
      releaseDate: "2003/09/18",
      series: { name: "EX", href: "ex" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/ex2/symbol.png",
          alt: "Symbol for the expansion Sandstorm from EX",
        },
        logo: {
          src: "https://images.pokemontcg.io/ex2/logo.png",
          alt: "Logo for the expansion Sandstorm from EX",
        },
      },
    },
  ],
  [
    "nintendo-black-star-promos",
    {
      id: "np",
      name: "Nintendo Black Star Promos",
      href: "nintendo-black-star-promos",
      total: "40",
      releaseDate: "2003/10/01",
      series: { name: "NP", href: "np" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/np/symbol.png",
          alt: "Symbol for the expansion Nintendo Black Star Promos from NP",
        },
        logo: {
          src: "https://images.pokemontcg.io/np/logo.png",
          alt: "Logo for the expansion Nintendo Black Star Promos from NP",
        },
      },
    },
  ],
  [
    "dragon",
    {
      id: "ex3",
      name: "Dragon",
      href: "dragon",
      total: "100",
      releaseDate: "2003/11/24",
      series: { name: "EX", href: "ex" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/ex3/symbol.png",
          alt: "Symbol for the expansion Dragon from EX",
        },
        logo: {
          src: "https://images.pokemontcg.io/ex3/logo.png",
          alt: "Logo for the expansion Dragon from EX",
        },
      },
    },
  ],
  [
    "team-magma-vs-team-aqua",
    {
      id: "ex4",
      name: "Team Magma vs Team Aqua",
      href: "team-magma-vs-team-aqua",
      total: "97",
      releaseDate: "2004/03/01",
      series: { name: "EX", href: "ex" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/ex4/symbol.png",
          alt: "Symbol for the expansion Team Magma vs Team Aqua from EX",
        },
        logo: {
          src: "https://images.pokemontcg.io/ex4/logo.png",
          alt: "Logo for the expansion Team Magma vs Team Aqua from EX",
        },
      },
    },
  ],
  [
    "hidden-legends",
    {
      id: "ex5",
      name: "Hidden Legends",
      href: "hidden-legends",
      total: "102",
      releaseDate: "2004/06/01",
      series: { name: "EX", href: "ex" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/ex5/symbol.png",
          alt: "Symbol for the expansion Hidden Legends from EX",
        },
        logo: {
          src: "https://images.pokemontcg.io/ex5/logo.png",
          alt: "Logo for the expansion Hidden Legends from EX",
        },
      },
    },
  ],
  [
    "ex-trainer-kit-latias",
    {
      id: "tk1a",
      name: "EX Trainer Kit Latias",
      href: "ex-trainer-kit-latias",
      total: "10",
      releaseDate: "2004/06/01",
      series: { name: "EX", href: "ex" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/tk1a/symbol.png",
          alt: "Symbol for the expansion EX Trainer Kit Latias from EX",
        },
        logo: {
          src: "https://images.pokemontcg.io/tk1a/logo.png",
          alt: "Logo for the expansion EX Trainer Kit Latias from EX",
        },
      },
    },
  ],
  [
    "ex-trainer-kit-latios",
    {
      id: "tk1b",
      name: "EX Trainer Kit Latios",
      href: "ex-trainer-kit-latios",
      total: "10",
      releaseDate: "2004/06/01",
      series: { name: "EX", href: "ex" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/tk1b/symbol.png",
          alt: "Symbol for the expansion EX Trainer Kit Latios from EX",
        },
        logo: {
          src: "https://images.pokemontcg.io/tk1b/logo.png",
          alt: "Logo for the expansion EX Trainer Kit Latios from EX",
        },
      },
    },
  ],
  [
    "firered-and-leafgreen",
    {
      id: "ex6",
      name: "FireRed & LeafGreen",
      href: "firered-and-leafgreen",
      total: "116",
      releaseDate: "2004/09/01",
      series: { name: "EX", href: "ex" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/ex6/symbol.png",
          alt: "Symbol for the expansion FireRed & LeafGreen from EX",
        },
        logo: {
          src: "https://images.pokemontcg.io/ex6/logo.png",
          alt: "Logo for the expansion FireRed & LeafGreen from EX",
        },
      },
    },
  ],
  [
    "pop-series-1",
    {
      id: "pop1",
      name: "POP Series 1",
      href: "pop-series-1",
      total: "17",
      releaseDate: "2004/09/01",
      series: { name: "POP", href: "pop" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/pop1/symbol.png",
          alt: "Symbol for the expansion POP Series 1 from POP",
        },
        logo: {
          src: "https://images.pokemontcg.io/pop1/logo.png",
          alt: "Logo for the expansion POP Series 1 from POP",
        },
      },
    },
  ],
  [
    "team-rocket-returns",
    {
      id: "ex7",
      name: "Team Rocket Returns",
      href: "team-rocket-returns",
      total: "111",
      releaseDate: "2004/11/01",
      series: { name: "EX", href: "ex" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/ex7/symbol.png",
          alt: "Symbol for the expansion Team Rocket Returns from EX",
        },
        logo: {
          src: "https://images.pokemontcg.io/ex7/logo.png",
          alt: "Logo for the expansion Team Rocket Returns from EX",
        },
      },
    },
  ],
  [
    "deoxys",
    {
      id: "ex8",
      name: "Deoxys",
      href: "deoxys",
      total: "108",
      releaseDate: "2005/02/01",
      series: { name: "EX", href: "ex" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/ex8/symbol.png",
          alt: "Symbol for the expansion Deoxys from EX",
        },
        logo: {
          src: "https://images.pokemontcg.io/ex8/logo.png",
          alt: "Logo for the expansion Deoxys from EX",
        },
      },
    },
  ],
  [
    "emerald",
    {
      id: "ex9",
      name: "Emerald",
      href: "emerald",
      total: "107",
      releaseDate: "2005/05/01",
      series: { name: "EX", href: "ex" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/ex9/symbol.png",
          alt: "Symbol for the expansion Emerald from EX",
        },
        logo: {
          src: "https://images.pokemontcg.io/ex9/logo.png",
          alt: "Logo for the expansion Emerald from EX",
        },
      },
    },
  ],
  [
    "unseen-forces",
    {
      id: "ex10",
      name: "Unseen Forces",
      href: "unseen-forces",
      total: "145",
      releaseDate: "2005/08/01",
      series: { name: "EX", href: "ex" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/ex10/symbol.png",
          alt: "Symbol for the expansion Unseen Forces from EX",
        },
        logo: {
          src: "https://images.pokemontcg.io/ex10/logo.png",
          alt: "Logo for the expansion Unseen Forces from EX",
        },
      },
    },
  ],
  [
    "pop-series-2",
    {
      id: "pop2",
      name: "POP Series 2",
      href: "pop-series-2",
      total: "17",
      releaseDate: "2005/08/01",
      series: { name: "POP", href: "pop" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/pop2/symbol.png",
          alt: "Symbol for the expansion POP Series 2 from POP",
        },
        logo: {
          src: "https://images.pokemontcg.io/pop2/logo.png",
          alt: "Logo for the expansion POP Series 2 from POP",
        },
      },
    },
  ],
  [
    "delta-species",
    {
      id: "ex11",
      name: "Delta Species",
      href: "delta-species",
      total: "114",
      releaseDate: "2005/10/31",
      series: { name: "EX", href: "ex" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/ex11/symbol.png",
          alt: "Symbol for the expansion Delta Species from EX",
        },
        logo: {
          src: "https://images.pokemontcg.io/ex11/logo.png",
          alt: "Logo for the expansion Delta Species from EX",
        },
      },
    },
  ],
  [
    "legend-maker",
    {
      id: "ex12",
      name: "Legend Maker",
      href: "legend-maker",
      total: "93",
      releaseDate: "2006/02/01",
      series: { name: "EX", href: "ex" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/ex12/symbol.png",
          alt: "Symbol for the expansion Legend Maker from EX",
        },
        logo: {
          src: "https://images.pokemontcg.io/ex12/logo.png",
          alt: "Logo for the expansion Legend Maker from EX",
        },
      },
    },
  ],
  [
    "ex-trainer-kit-2-plusle",
    {
      id: "tk2a",
      name: "EX Trainer Kit 2 Plusle",
      href: "ex-trainer-kit-2-plusle",
      total: "12",
      releaseDate: "2006/03/01",
      series: { name: "EX", href: "ex" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/tk2a/symbol.png",
          alt: "Symbol for the expansion EX Trainer Kit 2 Plusle from EX",
        },
        logo: {
          src: "https://images.pokemontcg.io/tk2a/logo.png",
          alt: "Logo for the expansion EX Trainer Kit 2 Plusle from EX",
        },
      },
    },
  ],
  [
    "ex-trainer-kit-2-minun",
    {
      id: "tk2b",
      name: "EX Trainer Kit 2 Minun",
      href: "ex-trainer-kit-2-minun",
      total: "12",
      releaseDate: "2006/03/01",
      series: { name: "EX", href: "ex" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/tk2b/symbol.png",
          alt: "Symbol for the expansion EX Trainer Kit 2 Minun from EX",
        },
        logo: {
          src: "https://images.pokemontcg.io/tk2b/logo.png",
          alt: "Logo for the expansion EX Trainer Kit 2 Minun from EX",
        },
      },
    },
  ],
  [
    "pop-series-3",
    {
      id: "pop3",
      name: "POP Series 3",
      href: "pop-series-3",
      total: "17",
      releaseDate: "2006/04/01",
      series: { name: "POP", href: "pop" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/pop3/symbol.png",
          alt: "Symbol for the expansion POP Series 3 from POP",
        },
        logo: {
          src: "https://images.pokemontcg.io/pop3/logo.png",
          alt: "Logo for the expansion POP Series 3 from POP",
        },
      },
    },
  ],
  [
    "holon-phantoms",
    {
      id: "ex13",
      name: "Holon Phantoms",
      href: "holon-phantoms",
      total: "111",
      releaseDate: "2006/05/01",
      series: { name: "EX", href: "ex" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/ex13/symbol.png",
          alt: "Symbol for the expansion Holon Phantoms from EX",
        },
        logo: {
          src: "https://images.pokemontcg.io/ex13/logo.png",
          alt: "Logo for the expansion Holon Phantoms from EX",
        },
      },
    },
  ],
  [
    "crystal-guardians",
    {
      id: "ex14",
      name: "Crystal Guardians",
      href: "crystal-guardians",
      total: "100",
      releaseDate: "2006/08/01",
      series: { name: "EX", href: "ex" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/ex14/symbol.png",
          alt: "Symbol for the expansion Crystal Guardians from EX",
        },
        logo: {
          src: "https://images.pokemontcg.io/ex14/logo.png",
          alt: "Logo for the expansion Crystal Guardians from EX",
        },
      },
    },
  ],
  [
    "pop-series-4",
    {
      id: "pop4",
      name: "POP Series 4",
      href: "pop-series-4",
      total: "17",
      releaseDate: "2006/08/01",
      series: { name: "POP", href: "pop" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/pop4/symbol.png",
          alt: "Symbol for the expansion POP Series 4 from POP",
        },
        logo: {
          src: "https://images.pokemontcg.io/pop4/logo.png",
          alt: "Logo for the expansion POP Series 4 from POP",
        },
      },
    },
  ],
  [
    "dragon-frontiers",
    {
      id: "ex15",
      name: "Dragon Frontiers",
      href: "dragon-frontiers",
      total: "101",
      releaseDate: "2006/11/01",
      series: { name: "EX", href: "ex" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/ex15/symbol.png",
          alt: "Symbol for the expansion Dragon Frontiers from EX",
        },
        logo: {
          src: "https://images.pokemontcg.io/ex15/logo.png",
          alt: "Logo for the expansion Dragon Frontiers from EX",
        },
      },
    },
  ],
  [
    "power-keepers",
    {
      id: "ex16",
      name: "Power Keepers",
      href: "power-keepers",
      total: "108",
      releaseDate: "2007/02/02",
      series: { name: "EX", href: "ex" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/ex16/symbol.png",
          alt: "Symbol for the expansion Power Keepers from EX",
        },
        logo: {
          src: "https://images.pokemontcg.io/ex16/logo.png",
          alt: "Logo for the expansion Power Keepers from EX",
        },
      },
    },
  ],
  [
    "pop-series-5",
    {
      id: "pop5",
      name: "POP Series 5",
      href: "pop-series-5",
      total: "17",
      releaseDate: "2007/03/01",
      series: { name: "POP", href: "pop" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/pop5/symbol.png",
          alt: "Symbol for the expansion POP Series 5 from POP",
        },
        logo: {
          src: "https://images.pokemontcg.io/pop5/logo.png",
          alt: "Logo for the expansion POP Series 5 from POP",
        },
      },
    },
  ],
  [
    "diamond-and-pearl",
    {
      id: "dp1",
      name: "Diamond & Pearl",
      href: "diamond-and-pearl",
      total: "130",
      releaseDate: "2007/05/01",
      series: { name: "Diamond & Pearl", href: "diamond-and-pearl" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/dp1/symbol.png",
          alt: "Symbol for the expansion Diamond & Pearl from Diamond & Pearl",
        },
        logo: {
          src: "https://images.pokemontcg.io/dp1/logo.png",
          alt: "Logo for the expansion Diamond & Pearl from Diamond & Pearl",
        },
      },
    },
  ],
  [
    "dp-black-star-promos",
    {
      id: "dpp",
      name: "DP Black Star Promos",
      href: "dp-black-star-promos",
      total: "56",
      releaseDate: "2007/05/01",
      series: { name: "Diamond & Pearl", href: "diamond-and-pearl" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/dpp/symbol.png",
          alt: "Symbol for the expansion DP Black Star Promos from Diamond & Pearl",
        },
        logo: {
          src: "https://images.pokemontcg.io/dpp/logo.png",
          alt: "Logo for the expansion DP Black Star Promos from Diamond & Pearl",
        },
      },
    },
  ],
  [
    "mysterious-treasures",
    {
      id: "dp2",
      name: "Mysterious Treasures",
      href: "mysterious-treasures",
      total: "124",
      releaseDate: "2007/08/01",
      series: { name: "Diamond & Pearl", href: "diamond-and-pearl" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/dp2/symbol.png",
          alt: "Symbol for the expansion Mysterious Treasures from Diamond & Pearl",
        },
        logo: {
          src: "https://images.pokemontcg.io/dp2/logo.png",
          alt: "Logo for the expansion Mysterious Treasures from Diamond & Pearl",
        },
      },
    },
  ],
  [
    "pop-series-6",
    {
      id: "pop6",
      name: "POP Series 6",
      href: "pop-series-6",
      total: "17",
      releaseDate: "2007/09/01",
      series: { name: "POP", href: "pop" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/pop6/symbol.png",
          alt: "Symbol for the expansion POP Series 6 from POP",
        },
        logo: {
          src: "https://images.pokemontcg.io/pop6/logo.png",
          alt: "Logo for the expansion POP Series 6 from POP",
        },
      },
    },
  ],
  [
    "secret-wonders",
    {
      id: "dp3",
      name: "Secret Wonders",
      href: "secret-wonders",
      total: "132",
      releaseDate: "2007/11/01",
      series: { name: "Diamond & Pearl", href: "diamond-and-pearl" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/dp3/symbol.png",
          alt: "Symbol for the expansion Secret Wonders from Diamond & Pearl",
        },
        logo: {
          src: "https://images.pokemontcg.io/dp3/logo.png",
          alt: "Logo for the expansion Secret Wonders from Diamond & Pearl",
        },
      },
    },
  ],
  [
    "great-encounters",
    {
      id: "dp4",
      name: "Great Encounters",
      href: "great-encounters",
      total: "106",
      releaseDate: "2008/02/01",
      series: { name: "Diamond & Pearl", href: "diamond-and-pearl" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/dp4/symbol.png",
          alt: "Symbol for the expansion Great Encounters from Diamond & Pearl",
        },
        logo: {
          src: "https://images.pokemontcg.io/dp4/logo.png",
          alt: "Logo for the expansion Great Encounters from Diamond & Pearl",
        },
      },
    },
  ],
  [
    "pop-series-7",
    {
      id: "pop7",
      name: "POP Series 7",
      href: "pop-series-7",
      total: "17",
      releaseDate: "2008/03/01",
      series: { name: "POP", href: "pop" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/pop7/symbol.png",
          alt: "Symbol for the expansion POP Series 7 from POP",
        },
        logo: {
          src: "https://images.pokemontcg.io/pop7/logo.png",
          alt: "Logo for the expansion POP Series 7 from POP",
        },
      },
    },
  ],
  [
    "majestic-dawn",
    {
      id: "dp5",
      name: "Majestic Dawn",
      href: "majestic-dawn",
      total: "100",
      releaseDate: "2008/05/01",
      series: { name: "Diamond & Pearl", href: "diamond-and-pearl" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/dp5/symbol.png",
          alt: "Symbol for the expansion Majestic Dawn from Diamond & Pearl",
        },
        logo: {
          src: "https://images.pokemontcg.io/dp5/logo.png",
          alt: "Logo for the expansion Majestic Dawn from Diamond & Pearl",
        },
      },
    },
  ],
  [
    "legends-awakened",
    {
      id: "dp6",
      name: "Legends Awakened",
      href: "legends-awakened",
      total: "146",
      releaseDate: "2008/08/01",
      series: { name: "Diamond & Pearl", href: "diamond-and-pearl" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/dp6/symbol.png",
          alt: "Symbol for the expansion Legends Awakened from Diamond & Pearl",
        },
        logo: {
          src: "https://images.pokemontcg.io/dp6/logo.png",
          alt: "Logo for the expansion Legends Awakened from Diamond & Pearl",
        },
      },
    },
  ],
  [
    "pop-series-8",
    {
      id: "pop8",
      name: "POP Series 8",
      href: "pop-series-8",
      total: "17",
      releaseDate: "2008/09/01",
      series: { name: "POP", href: "pop" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/pop8/symbol.png",
          alt: "Symbol for the expansion POP Series 8 from POP",
        },
        logo: {
          src: "https://images.pokemontcg.io/pop8/logo.png",
          alt: "Logo for the expansion POP Series 8 from POP",
        },
      },
    },
  ],
  [
    "stormfront",
    {
      id: "dp7",
      name: "Stormfront",
      href: "stormfront",
      total: "106",
      releaseDate: "2008/11/01",
      series: { name: "Diamond & Pearl", href: "diamond-and-pearl" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/dp7/symbol.png",
          alt: "Symbol for the expansion Stormfront from Diamond & Pearl",
        },
        logo: {
          src: "https://images.pokemontcg.io/dp7/logo.png",
          alt: "Logo for the expansion Stormfront from Diamond & Pearl",
        },
      },
    },
  ],
  [
    "platinum",
    {
      id: "pl1",
      name: "Platinum",
      href: "platinum",
      total: "133",
      releaseDate: "2009/02/11",
      series: { name: "Platinum", href: "platinum" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/pl1/symbol.png",
          alt: "Symbol for the expansion Platinum from Platinum",
        },
        logo: {
          src: "https://images.pokemontcg.io/pl1/logo.png",
          alt: "Logo for the expansion Platinum from Platinum",
        },
      },
    },
  ],
  [
    "pop-series-9",
    {
      id: "pop9",
      name: "POP Series 9",
      href: "pop-series-9",
      total: "17",
      releaseDate: "2009/03/01",
      series: { name: "POP", href: "pop" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/pop9/symbol.png",
          alt: "Symbol for the expansion POP Series 9 from POP",
        },
        logo: {
          src: "https://images.pokemontcg.io/pop9/logo.png",
          alt: "Logo for the expansion POP Series 9 from POP",
        },
      },
    },
  ],
  [
    "rising-rivals",
    {
      id: "pl2",
      name: "Rising Rivals",
      href: "rising-rivals",
      total: "120",
      releaseDate: "2009/05/16",
      series: { name: "Platinum", href: "platinum" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/pl2/symbol.png",
          alt: "Symbol for the expansion Rising Rivals from Platinum",
        },
        logo: {
          src: "https://images.pokemontcg.io/pl2/logo.png",
          alt: "Logo for the expansion Rising Rivals from Platinum",
        },
      },
    },
  ],
  [
    "supreme-victors",
    {
      id: "pl3",
      name: "Supreme Victors",
      href: "supreme-victors",
      total: "153",
      releaseDate: "2009/08/19",
      series: { name: "Platinum", href: "platinum" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/pl3/symbol.png",
          alt: "Symbol for the expansion Supreme Victors from Platinum",
        },
        logo: {
          src: "https://images.pokemontcg.io/pl3/logo.png",
          alt: "Logo for the expansion Supreme Victors from Platinum",
        },
      },
    },
  ],
  [
    "arceus",
    {
      id: "pl4",
      name: "Arceus",
      href: "arceus",
      total: "111",
      releaseDate: "2009/11/04",
      series: { name: "Platinum", href: "platinum" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/pl4/symbol.png",
          alt: "Symbol for the expansion Arceus from Platinum",
        },
        logo: {
          src: "https://images.pokemontcg.io/pl4/logo.png",
          alt: "Logo for the expansion Arceus from Platinum",
        },
      },
    },
  ],
  [
    "pokemon-rumble",
    {
      id: "ru1",
      name: "Pokémon Rumble",
      href: "pokemon-rumble",
      total: "16",
      releaseDate: "2009/12/02",
      series: { name: "Other", href: "other" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/ru1/symbol.png",
          alt: "Symbol for the expansion Pokémon Rumble from Other",
        },
        logo: {
          src: "https://images.pokemontcg.io/ru1/logo.png",
          alt: "Logo for the expansion Pokémon Rumble from Other",
        },
      },
    },
  ],
  [
    "heartgold-and-soulsilver",
    {
      id: "hgss1",
      name: "HeartGold & SoulSilver",
      href: "heartgold-and-soulsilver",
      total: "124",
      releaseDate: "2010/02/10",
      series: {
        name: "HeartGold & SoulSilver",
        href: "heartgold-and-soulsilver",
      },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/hgss1/symbol.png",
          alt: "Symbol for the expansion HeartGold & SoulSilver from HeartGold & SoulSilver",
        },
        logo: {
          src: "https://images.pokemontcg.io/hgss1/logo.png",
          alt: "Logo for the expansion HeartGold & SoulSilver from HeartGold & SoulSilver",
        },
      },
    },
  ],
  [
    "hgss-black-star-promos",
    {
      id: "hsp",
      name: "HGSS Black Star Promos",
      href: "hgss-black-star-promos",
      total: "25",
      releaseDate: "2010/02/10",
      series: {
        name: "HeartGold & SoulSilver",
        href: "heartgold-and-soulsilver",
      },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/hsp/symbol.png",
          alt: "Symbol for the expansion HGSS Black Star Promos from HeartGold & SoulSilver",
        },
        logo: {
          src: "https://images.pokemontcg.io/hsp/logo.png",
          alt: "Logo for the expansion HGSS Black Star Promos from HeartGold & SoulSilver",
        },
      },
    },
  ],
  [
    "hs-unleashed",
    {
      id: "hgss2",
      name: "HS—Unleashed",
      href: "hs-unleashed",
      total: "96",
      releaseDate: "2010/05/12",
      series: {
        name: "HeartGold & SoulSilver",
        href: "heartgold-and-soulsilver",
      },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/hgss2/symbol.png",
          alt: "Symbol for the expansion HS—Unleashed from HeartGold & SoulSilver",
        },
        logo: {
          src: "https://images.pokemontcg.io/hgss2/logo.png",
          alt: "Logo for the expansion HS—Unleashed from HeartGold & SoulSilver",
        },
      },
    },
  ],
  [
    "hs-undaunted",
    {
      id: "hgss3",
      name: "HS—Undaunted",
      href: "hs-undaunted",
      total: "91",
      releaseDate: "2010/08/18",
      series: {
        name: "HeartGold & SoulSilver",
        href: "heartgold-and-soulsilver",
      },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/hgss3/symbol.png",
          alt: "Symbol for the expansion HS—Undaunted from HeartGold & SoulSilver",
        },
        logo: {
          src: "https://images.pokemontcg.io/hgss3/logo.png",
          alt: "Logo for the expansion HS—Undaunted from HeartGold & SoulSilver",
        },
      },
    },
  ],
  [
    "hs-triumphant",
    {
      id: "hgss4",
      name: "HS—Triumphant",
      href: "hs-triumphant",
      total: "103",
      releaseDate: "2010/11/03",
      series: {
        name: "HeartGold & SoulSilver",
        href: "heartgold-and-soulsilver",
      },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/hgss4/symbol.png",
          alt: "Symbol for the expansion HS—Triumphant from HeartGold & SoulSilver",
        },
        logo: {
          src: "https://images.pokemontcg.io/hgss4/logo.png",
          alt: "Logo for the expansion HS—Triumphant from HeartGold & SoulSilver",
        },
      },
    },
  ],
  [
    "call-of-legends",
    {
      id: "col1",
      name: "Call of Legends",
      href: "call-of-legends",
      total: "106",
      releaseDate: "2011/02/09",
      series: {
        name: "HeartGold & SoulSilver",
        href: "heartgold-and-soulsilver",
      },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/col1/symbol.png",
          alt: "Symbol for the expansion Call of Legends from HeartGold & SoulSilver",
        },
        logo: {
          src: "https://images.pokemontcg.io/col1/logo.png",
          alt: "Logo for the expansion Call of Legends from HeartGold & SoulSilver",
        },
      },
    },
  ],
  [
    "bw-black-star-promos",
    {
      id: "bwp",
      name: "BW Black Star Promos",
      href: "bw-black-star-promos",
      total: "101",
      releaseDate: "2011/03/01",
      series: { name: "Black & White", href: "black-and-white" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/bwp/symbol.png",
          alt: "Symbol for the expansion BW Black Star Promos from Black & White",
        },
        logo: {
          src: "https://images.pokemontcg.io/bwp/logo.png",
          alt: "Logo for the expansion BW Black Star Promos from Black & White",
        },
      },
    },
  ],
  [
    "black-and-white",
    {
      id: "bw1",
      name: "Black & White",
      href: "black-and-white",
      total: "115",
      releaseDate: "2011/04/25",
      series: { name: "Black & White", href: "black-and-white" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/bw1/symbol.png",
          alt: "Symbol for the expansion Black & White from Black & White",
        },
        logo: {
          src: "https://images.pokemontcg.io/bw1/logo.png",
          alt: "Logo for the expansion Black & White from Black & White",
        },
      },
    },
  ],
  [
    "mcdonalds-collection-2011",
    {
      id: "mcd11",
      name: "McDonald's Collection 2011",
      href: "mcdonalds-collection-2011",
      total: "12",
      releaseDate: "2011/06/17",
      series: { name: "Other", href: "other" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/mcd11/symbol.png",
          alt: "Symbol for the expansion McDonald's Collection 2011 from Other",
        },
        logo: {
          src: "https://images.pokemontcg.io/mcd11/logo.png",
          alt: "Logo for the expansion McDonald's Collection 2011 from Other",
        },
      },
    },
  ],
  [
    "emerging-powers",
    {
      id: "bw2",
      name: "Emerging Powers",
      href: "emerging-powers",
      total: "98",
      releaseDate: "2011/08/31",
      series: { name: "Black & White", href: "black-and-white" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/bw2/symbol.png",
          alt: "Symbol for the expansion Emerging Powers from Black & White",
        },
        logo: {
          src: "https://images.pokemontcg.io/bw2/logo.png",
          alt: "Logo for the expansion Emerging Powers from Black & White",
        },
      },
    },
  ],
  [
    "noble-victories",
    {
      id: "bw3",
      name: "Noble Victories",
      href: "noble-victories",
      total: "102",
      releaseDate: "2011/11/16",
      series: { name: "Black & White", href: "black-and-white" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/bw3/symbol.png",
          alt: "Symbol for the expansion Noble Victories from Black & White",
        },
        logo: {
          src: "https://images.pokemontcg.io/bw3/logo.png",
          alt: "Logo for the expansion Noble Victories from Black & White",
        },
      },
    },
  ],
  [
    "next-destinies",
    {
      id: "bw4",
      name: "Next Destinies",
      href: "next-destinies",
      total: "103",
      releaseDate: "2012/02/08",
      series: { name: "Black & White", href: "black-and-white" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/bw4/symbol.png",
          alt: "Symbol for the expansion Next Destinies from Black & White",
        },
        logo: {
          src: "https://images.pokemontcg.io/bw4/logo.png",
          alt: "Logo for the expansion Next Destinies from Black & White",
        },
      },
    },
  ],
  [
    "dark-explorers",
    {
      id: "bw5",
      name: "Dark Explorers",
      href: "dark-explorers",
      total: "111",
      releaseDate: "2012/05/09",
      series: { name: "Black & White", href: "black-and-white" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/bw5/symbol.png",
          alt: "Symbol for the expansion Dark Explorers from Black & White",
        },
        logo: {
          src: "https://images.pokemontcg.io/bw5/logo.png",
          alt: "Logo for the expansion Dark Explorers from Black & White",
        },
      },
    },
  ],
  [
    "mcdonalds-collection-2012",
    {
      id: "mcd12",
      name: "McDonald's Collection 2012",
      href: "mcdonalds-collection-2012",
      total: "12",
      releaseDate: "2012/06/15",
      series: { name: "Other", href: "other" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/mcd12/symbol.png",
          alt: "Symbol for the expansion McDonald's Collection 2012 from Other",
        },
        logo: {
          src: "https://images.pokemontcg.io/mcd12/logo.png",
          alt: "Logo for the expansion McDonald's Collection 2012 from Other",
        },
      },
    },
  ],
  [
    "dragons-exalted",
    {
      id: "bw6",
      name: "Dragons Exalted",
      href: "dragons-exalted",
      total: "128",
      releaseDate: "2012/08/15",
      series: { name: "Black & White", href: "black-and-white" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/bw6/symbol.png",
          alt: "Symbol for the expansion Dragons Exalted from Black & White",
        },
        logo: {
          src: "https://images.pokemontcg.io/bw6/logo.png",
          alt: "Logo for the expansion Dragons Exalted from Black & White",
        },
      },
    },
  ],
  [
    "dragon-vault",
    {
      id: "dv1",
      name: "Dragon Vault",
      href: "dragon-vault",
      total: "21",
      releaseDate: "2012/10/05",
      series: { name: "Black & White", href: "black-and-white" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/dv1/symbol.png",
          alt: "Symbol for the expansion Dragon Vault from Black & White",
        },
        logo: {
          src: "https://images.pokemontcg.io/dv1/logo.png",
          alt: "Logo for the expansion Dragon Vault from Black & White",
        },
      },
    },
  ],
  [
    "boundaries-crossed",
    {
      id: "bw7",
      name: "Boundaries Crossed",
      href: "boundaries-crossed",
      total: "153",
      releaseDate: "2012/11/07",
      series: { name: "Black & White", href: "black-and-white" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/bw7/symbol.png",
          alt: "Symbol for the expansion Boundaries Crossed from Black & White",
        },
        logo: {
          src: "https://images.pokemontcg.io/bw7/logo.png",
          alt: "Logo for the expansion Boundaries Crossed from Black & White",
        },
      },
    },
  ],
  [
    "plasma-storm",
    {
      id: "bw8",
      name: "Plasma Storm",
      href: "plasma-storm",
      total: "138",
      releaseDate: "2013/02/06",
      series: { name: "Black & White", href: "black-and-white" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/bw8/symbol.png",
          alt: "Symbol for the expansion Plasma Storm from Black & White",
        },
        logo: {
          src: "https://images.pokemontcg.io/bw8/logo.png",
          alt: "Logo for the expansion Plasma Storm from Black & White",
        },
      },
    },
  ],
  [
    "plasma-freeze",
    {
      id: "bw9",
      name: "Plasma Freeze",
      href: "plasma-freeze",
      total: "122",
      releaseDate: "2013/05/08",
      series: { name: "Black & White", href: "black-and-white" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/bw9/symbol.png",
          alt: "Symbol for the expansion Plasma Freeze from Black & White",
        },
        logo: {
          src: "https://images.pokemontcg.io/bw9/logo.png",
          alt: "Logo for the expansion Plasma Freeze from Black & White",
        },
      },
    },
  ],
  [
    "plasma-blast",
    {
      id: "bw10",
      name: "Plasma Blast",
      href: "plasma-blast",
      total: "105",
      releaseDate: "2013/08/14",
      series: { name: "Black & White", href: "black-and-white" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/bw10/symbol.png",
          alt: "Symbol for the expansion Plasma Blast from Black & White",
        },
        logo: {
          src: "https://images.pokemontcg.io/bw10/logo.png",
          alt: "Logo for the expansion Plasma Blast from Black & White",
        },
      },
    },
  ],
  [
    "xy-black-star-promos",
    {
      id: "xyp",
      name: "XY Black Star Promos",
      href: "xy-black-star-promos",
      total: "216",
      releaseDate: "2013/10/12",
      series: { name: "XY", href: "xy" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/xyp/symbol.png",
          alt: "Symbol for the expansion XY Black Star Promos from XY",
        },
        logo: {
          src: "https://images.pokemontcg.io/xyp/logo.png",
          alt: "Logo for the expansion XY Black Star Promos from XY",
        },
      },
    },
  ],
  [
    "legendary-treasures",
    {
      id: "bw11",
      name: "Legendary Treasures",
      href: "legendary-treasures",
      total: "140",
      releaseDate: "2013/11/06",
      series: { name: "Black & White", href: "black-and-white" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/bw11/symbol.png",
          alt: "Symbol for the expansion Legendary Treasures from Black & White",
        },
        logo: {
          src: "https://images.pokemontcg.io/bw11/logo.png",
          alt: "Logo for the expansion Legendary Treasures from Black & White",
        },
      },
    },
  ],
  [
    "kalos-starter-set",
    {
      id: "xy0",
      name: "Kalos Starter Set",
      href: "kalos-starter-set",
      total: "39",
      releaseDate: "2013/11/08",
      series: { name: "XY", href: "xy" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/xy0/symbol.png",
          alt: "Symbol for the expansion Kalos Starter Set from XY",
        },
        logo: {
          src: "https://images.pokemontcg.io/xy0/logo.png",
          alt: "Logo for the expansion Kalos Starter Set from XY",
        },
      },
    },
  ],
  [
    "xy",
    {
      id: "xy1",
      name: "XY",
      href: "xy",
      total: "146",
      releaseDate: "2014/02/05",
      series: { name: "XY", href: "xy" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/xy1/symbol.png",
          alt: "Symbol for the expansion XY from XY",
        },
        logo: {
          src: "https://images.pokemontcg.io/xy1/logo.png",
          alt: "Logo for the expansion XY from XY",
        },
      },
    },
  ],
  [
    "flashfire",
    {
      id: "xy2",
      name: "Flashfire",
      href: "flashfire",
      total: "110",
      releaseDate: "2014/05/07",
      series: { name: "XY", href: "xy" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/xy2/symbol.png",
          alt: "Symbol for the expansion Flashfire from XY",
        },
        logo: {
          src: "https://images.pokemontcg.io/xy2/logo.png",
          alt: "Logo for the expansion Flashfire from XY",
        },
      },
    },
  ],
  [
    "mcdonalds-collection-2014",
    {
      id: "mcd14",
      name: "McDonald's Collection 2014",
      href: "mcdonalds-collection-2014",
      total: "12",
      releaseDate: "2014/05/23",
      series: { name: "Other", href: "other" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/mcd14/symbol.png",
          alt: "Symbol for the expansion McDonald's Collection 2014 from Other",
        },
        logo: {
          src: "https://images.pokemontcg.io/mcd14/logo.png",
          alt: "Logo for the expansion McDonald's Collection 2014 from Other",
        },
      },
    },
  ],
  [
    "furious-fists",
    {
      id: "xy3",
      name: "Furious Fists",
      href: "furious-fists",
      total: "114",
      releaseDate: "2014/08/13",
      series: { name: "XY", href: "xy" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/xy3/symbol.png",
          alt: "Symbol for the expansion Furious Fists from XY",
        },
        logo: {
          src: "https://images.pokemontcg.io/xy3/logo.png",
          alt: "Logo for the expansion Furious Fists from XY",
        },
      },
    },
  ],
  [
    "phantom-forces",
    {
      id: "xy4",
      name: "Phantom Forces",
      href: "phantom-forces",
      total: "124",
      releaseDate: "2014/11/05",
      series: { name: "XY", href: "xy" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/xy4/symbol.png",
          alt: "Symbol for the expansion Phantom Forces from XY",
        },
        logo: {
          src: "https://images.pokemontcg.io/xy4/logo.png",
          alt: "Logo for the expansion Phantom Forces from XY",
        },
      },
    },
  ],
  [
    "primal-clash",
    {
      id: "xy5",
      name: "Primal Clash",
      href: "primal-clash",
      total: "164",
      releaseDate: "2015/02/04",
      series: { name: "XY", href: "xy" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/xy5/symbol.png",
          alt: "Symbol for the expansion Primal Clash from XY",
        },
        logo: {
          src: "https://images.pokemontcg.io/xy5/logo.png",
          alt: "Logo for the expansion Primal Clash from XY",
        },
      },
    },
  ],
  [
    "double-crisis",
    {
      id: "dc1",
      name: "Double Crisis",
      href: "double-crisis",
      total: "34",
      releaseDate: "2015/03/25",
      series: { name: "XY", href: "xy" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/dc1/symbol.png",
          alt: "Symbol for the expansion Double Crisis from XY",
        },
        logo: {
          src: "https://images.pokemontcg.io/dc1/logo.png",
          alt: "Logo for the expansion Double Crisis from XY",
        },
      },
    },
  ],
  [
    "roaring-skies",
    {
      id: "xy6",
      name: "Roaring Skies",
      href: "roaring-skies",
      total: "112",
      releaseDate: "2015/05/06",
      series: { name: "XY", href: "xy" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/xy6/symbol.png",
          alt: "Symbol for the expansion Roaring Skies from XY",
        },
        logo: {
          src: "https://images.pokemontcg.io/xy6/logo.png",
          alt: "Logo for the expansion Roaring Skies from XY",
        },
      },
    },
  ],
  [
    "ancient-origins",
    {
      id: "xy7",
      name: "Ancient Origins",
      href: "ancient-origins",
      total: "100",
      releaseDate: "2015/08/12",
      series: { name: "XY", href: "xy" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/xy7/symbol.png",
          alt: "Symbol for the expansion Ancient Origins from XY",
        },
        logo: {
          src: "https://images.pokemontcg.io/xy7/logo.png",
          alt: "Logo for the expansion Ancient Origins from XY",
        },
      },
    },
  ],
  [
    "breakthrough",
    {
      id: "xy8",
      name: "BREAKthrough",
      href: "breakthrough",
      total: "165",
      releaseDate: "2015/11/04",
      series: { name: "XY", href: "xy" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/xy8/symbol.png",
          alt: "Symbol for the expansion BREAKthrough from XY",
        },
        logo: {
          src: "https://images.pokemontcg.io/xy8/logo.png",
          alt: "Logo for the expansion BREAKthrough from XY",
        },
      },
    },
  ],
  [
    "mcdonalds-collection-2015",
    {
      id: "mcd15",
      name: "McDonald's Collection 2015",
      href: "mcdonalds-collection-2015",
      total: "12",
      releaseDate: "2015/11/27",
      series: { name: "Other", href: "other" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/mcd15/symbol.png",
          alt: "Symbol for the expansion McDonald's Collection 2015 from Other",
        },
        logo: {
          src: "https://images.pokemontcg.io/mcd15/logo.png",
          alt: "Logo for the expansion McDonald's Collection 2015 from Other",
        },
      },
    },
  ],
  [
    "breakpoint",
    {
      id: "xy9",
      name: "BREAKpoint",
      href: "breakpoint",
      total: "126",
      releaseDate: "2016/02/03",
      series: { name: "XY", href: "xy" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/xy9/symbol.png",
          alt: "Symbol for the expansion BREAKpoint from XY",
        },
        logo: {
          src: "https://images.pokemontcg.io/xy9/logo.png",
          alt: "Logo for the expansion BREAKpoint from XY",
        },
      },
    },
  ],
  [
    "generations",
    {
      id: "g1",
      name: "Generations",
      href: "generations",
      total: "117",
      releaseDate: "2016/02/22",
      series: { name: "XY", href: "xy" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/g1/symbol.png",
          alt: "Symbol for the expansion Generations from XY",
        },
        logo: {
          src: "https://images.pokemontcg.io/g1/logo.png",
          alt: "Logo for the expansion Generations from XY",
        },
      },
    },
  ],
  [
    "fates-collide",
    {
      id: "xy10",
      name: "Fates Collide",
      href: "fates-collide",
      total: "129",
      releaseDate: "2016/05/02",
      series: { name: "XY", href: "xy" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/xy10/symbol.png",
          alt: "Symbol for the expansion Fates Collide from XY",
        },
        logo: {
          src: "https://images.pokemontcg.io/xy10/logo.png",
          alt: "Logo for the expansion Fates Collide from XY",
        },
      },
    },
  ],
  [
    "steam-siege",
    {
      id: "xy11",
      name: "Steam Siege",
      href: "steam-siege",
      total: "116",
      releaseDate: "2016/08/03",
      series: { name: "XY", href: "xy" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/xy11/symbol.png",
          alt: "Symbol for the expansion Steam Siege from XY",
        },
        logo: {
          src: "https://images.pokemontcg.io/xy11/logo.png",
          alt: "Logo for the expansion Steam Siege from XY",
        },
      },
    },
  ],
  [
    "mcdonalds-collection-2016",
    {
      id: "mcd16",
      name: "McDonald's Collection 2016",
      href: "mcdonalds-collection-2016",
      total: "12",
      releaseDate: "2016/08/19",
      series: { name: "Other", href: "other" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/mcd16/symbol.png",
          alt: "Symbol for the expansion McDonald's Collection 2016 from Other",
        },
        logo: {
          src: "https://images.pokemontcg.io/mcd16/logo.png",
          alt: "Logo for the expansion McDonald's Collection 2016 from Other",
        },
      },
    },
  ],
  [
    "evolutions",
    {
      id: "xy12",
      name: "Evolutions",
      href: "evolutions",
      total: "113",
      releaseDate: "2016/11/02",
      series: { name: "XY", href: "xy" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/xy12/symbol.png",
          alt: "Symbol for the expansion Evolutions from XY",
        },
        logo: {
          src: "https://images.pokemontcg.io/xy12/logo.png",
          alt: "Logo for the expansion Evolutions from XY",
        },
      },
    },
  ],
  [
    "sun-and-moon",
    {
      id: "sm1",
      name: "Sun & Moon",
      href: "sun-and-moon",
      total: "173",
      releaseDate: "2017/02/03",
      series: { name: "Sun & Moon", href: "sun-and-moon" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/sm1/symbol.png",
          alt: "Symbol for the expansion Sun & Moon from Sun & Moon",
        },
        logo: {
          src: "https://images.pokemontcg.io/sm1/logo.png",
          alt: "Logo for the expansion Sun & Moon from Sun & Moon",
        },
      },
    },
  ],
  [
    "sm-black-star-promos",
    {
      id: "smp",
      name: "SM Black Star Promos",
      href: "sm-black-star-promos",
      total: "250",
      releaseDate: "2017/02/03",
      series: { name: "Sun & Moon", href: "sun-and-moon" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/smp/symbol.png",
          alt: "Symbol for the expansion SM Black Star Promos from Sun & Moon",
        },
        logo: {
          src: "https://images.pokemontcg.io/smp/logo.png",
          alt: "Logo for the expansion SM Black Star Promos from Sun & Moon",
        },
      },
    },
  ],
  [
    "guardians-rising",
    {
      id: "sm2",
      name: "Guardians Rising",
      href: "guardians-rising",
      total: "180",
      releaseDate: "2017/05/05",
      series: { name: "Sun & Moon", href: "sun-and-moon" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/sm2/symbol.png",
          alt: "Symbol for the expansion Guardians Rising from Sun & Moon",
        },
        logo: {
          src: "https://images.pokemontcg.io/sm2/logo.png",
          alt: "Logo for the expansion Guardians Rising from Sun & Moon",
        },
      },
    },
  ],
  [
    "burning-shadows",
    {
      id: "sm3",
      name: "Burning Shadows",
      href: "burning-shadows",
      total: "177",
      releaseDate: "2017/08/05",
      series: { name: "Sun & Moon", href: "sun-and-moon" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/sm3/symbol.png",
          alt: "Symbol for the expansion Burning Shadows from Sun & Moon",
        },
        logo: {
          src: "https://images.pokemontcg.io/sm3/logo.png",
          alt: "Logo for the expansion Burning Shadows from Sun & Moon",
        },
      },
    },
  ],
  [
    "shining-legends",
    {
      id: "sm35",
      name: "Shining Legends",
      href: "shining-legends",
      total: "81",
      releaseDate: "2017/10/06",
      series: { name: "Sun & Moon", href: "sun-and-moon" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/sm35/symbol.png",
          alt: "Symbol for the expansion Shining Legends from Sun & Moon",
        },
        logo: {
          src: "https://images.pokemontcg.io/sm35/logo.png",
          alt: "Logo for the expansion Shining Legends from Sun & Moon",
        },
      },
    },
  ],
  [
    "crimson-invasion",
    {
      id: "sm4",
      name: "Crimson Invasion",
      href: "crimson-invasion",
      total: "126",
      releaseDate: "2017/11/03",
      series: { name: "Sun & Moon", href: "sun-and-moon" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/sm4/symbol.png",
          alt: "Symbol for the expansion Crimson Invasion from Sun & Moon",
        },
        logo: {
          src: "https://images.pokemontcg.io/sm4/logo.png",
          alt: "Logo for the expansion Crimson Invasion from Sun & Moon",
        },
      },
    },
  ],
  [
    "mcdonalds-collection-2017",
    {
      id: "mcd17",
      name: "McDonald's Collection 2017",
      href: "mcdonalds-collection-2017",
      total: "12",
      releaseDate: "2017/11/07",
      series: { name: "Other", href: "other" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/mcd17/symbol.png",
          alt: "Symbol for the expansion McDonald's Collection 2017 from Other",
        },
        logo: {
          src: "https://images.pokemontcg.io/mcd17/logo.png",
          alt: "Logo for the expansion McDonald's Collection 2017 from Other",
        },
      },
    },
  ],
  [
    "ultra-prism",
    {
      id: "sm5",
      name: "Ultra Prism",
      href: "ultra-prism",
      total: "178",
      releaseDate: "2018/02/02",
      series: { name: "Sun & Moon", href: "sun-and-moon" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/sm5/symbol.png",
          alt: "Symbol for the expansion Ultra Prism from Sun & Moon",
        },
        logo: {
          src: "https://images.pokemontcg.io/sm5/logo.png",
          alt: "Logo for the expansion Ultra Prism from Sun & Moon",
        },
      },
    },
  ],
  [
    "forbidden-light",
    {
      id: "sm6",
      name: "Forbidden Light",
      href: "forbidden-light",
      total: "150",
      releaseDate: "2018/05/04",
      series: { name: "Sun & Moon", href: "sun-and-moon" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/sm6/symbol.png",
          alt: "Symbol for the expansion Forbidden Light from Sun & Moon",
        },
        logo: {
          src: "https://images.pokemontcg.io/sm6/logo.png",
          alt: "Logo for the expansion Forbidden Light from Sun & Moon",
        },
      },
    },
  ],
  [
    "celestial-storm",
    {
      id: "sm7",
      name: "Celestial Storm",
      href: "celestial-storm",
      total: "187",
      releaseDate: "2018/08/03",
      series: { name: "Sun & Moon", href: "sun-and-moon" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/sm7/symbol.png",
          alt: "Symbol for the expansion Celestial Storm from Sun & Moon",
        },
        logo: {
          src: "https://images.pokemontcg.io/sm7/logo.png",
          alt: "Logo for the expansion Celestial Storm from Sun & Moon",
        },
      },
    },
  ],
  [
    "dragon-majesty",
    {
      id: "sm75",
      name: "Dragon Majesty",
      href: "dragon-majesty",
      total: "80",
      releaseDate: "2018/09/07",
      series: { name: "Sun & Moon", href: "sun-and-moon" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/sm75/symbol.png",
          alt: "Symbol for the expansion Dragon Majesty from Sun & Moon",
        },
        logo: {
          src: "https://images.pokemontcg.io/sm75/logo.png",
          alt: "Logo for the expansion Dragon Majesty from Sun & Moon",
        },
      },
    },
  ],
  [
    "mcdonalds-collection-2018",
    {
      id: "mcd18",
      name: "McDonald's Collection 2018",
      href: "mcdonalds-collection-2018",
      total: "12",
      releaseDate: "2018/10/16",
      series: { name: "Other", href: "other" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/mcd18/symbol.png",
          alt: "Symbol for the expansion McDonald's Collection 2018 from Other",
        },
        logo: {
          src: "https://images.pokemontcg.io/mcd18/logo.png",
          alt: "Logo for the expansion McDonald's Collection 2018 from Other",
        },
      },
    },
  ],
  [
    "lost-thunder",
    {
      id: "sm8",
      name: "Lost Thunder",
      href: "lost-thunder",
      total: "240",
      releaseDate: "2018/11/02",
      series: { name: "Sun & Moon", href: "sun-and-moon" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/sm8/symbol.png",
          alt: "Symbol for the expansion Lost Thunder from Sun & Moon",
        },
        logo: {
          src: "https://images.pokemontcg.io/sm8/logo.png",
          alt: "Logo for the expansion Lost Thunder from Sun & Moon",
        },
      },
    },
  ],
  [
    "team-up",
    {
      id: "sm9",
      name: "Team Up",
      href: "team-up",
      total: "198",
      releaseDate: "2019/02/01",
      series: { name: "Sun & Moon", href: "sun-and-moon" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/sm9/symbol.png",
          alt: "Symbol for the expansion Team Up from Sun & Moon",
        },
        logo: {
          src: "https://images.pokemontcg.io/sm9/logo.png",
          alt: "Logo for the expansion Team Up from Sun & Moon",
        },
      },
    },
  ],
  [
    "detective-pikachu",
    {
      id: "det1",
      name: "Detective Pikachu",
      href: "detective-pikachu",
      total: "18",
      releaseDate: "2019/04/05",
      series: { name: "Sun & Moon", href: "sun-and-moon" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/det1/symbol.png",
          alt: "Symbol for the expansion Detective Pikachu from Sun & Moon",
        },
        logo: {
          src: "https://images.pokemontcg.io/det1/logo.png",
          alt: "Logo for the expansion Detective Pikachu from Sun & Moon",
        },
      },
    },
  ],
  [
    "unbroken-bonds",
    {
      id: "sm10",
      name: "Unbroken Bonds",
      href: "unbroken-bonds",
      total: "234",
      releaseDate: "2019/05/03",
      series: { name: "Sun & Moon", href: "sun-and-moon" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/sm10/symbol.png",
          alt: "Symbol for the expansion Unbroken Bonds from Sun & Moon",
        },
        logo: {
          src: "https://images.pokemontcg.io/sm10/logo.png",
          alt: "Logo for the expansion Unbroken Bonds from Sun & Moon",
        },
      },
    },
  ],
  [
    "unified-minds",
    {
      id: "sm11",
      name: "Unified Minds",
      href: "unified-minds",
      total: "260",
      releaseDate: "2019/08/02",
      series: { name: "Sun & Moon", href: "sun-and-moon" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/sm11/symbol.png",
          alt: "Symbol for the expansion Unified Minds from Sun & Moon",
        },
        logo: {
          src: "https://images.pokemontcg.io/sm11/logo.png",
          alt: "Logo for the expansion Unified Minds from Sun & Moon",
        },
      },
    },
  ],
  [
    "hidden-fates",
    {
      id: "sm115",
      name: "Hidden Fates",
      href: "hidden-fates",
      total: "69",
      releaseDate: "2019/08/23",
      series: { name: "Sun & Moon", href: "sun-and-moon" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/sm115/symbol.png",
          alt: "Symbol for the expansion Hidden Fates from Sun & Moon",
        },
        logo: {
          src: "https://images.pokemontcg.io/sm115/logo.png",
          alt: "Logo for the expansion Hidden Fates from Sun & Moon",
        },
      },
    },
  ],
  [
    "hidden-fates-shiny-vault",
    {
      id: "sma",
      name: "Hidden Fates Shiny Vault",
      href: "hidden-fates-shiny-vault",
      total: "94",
      releaseDate: "2019/08/23",
      series: { name: "Sun & Moon", href: "sun-and-moon" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/sma/symbol.png",
          alt: "Symbol for the expansion Hidden Fates Shiny Vault from Sun & Moon",
        },
        logo: {
          src: "https://images.pokemontcg.io/sma/logo.png",
          alt: "Logo for the expansion Hidden Fates Shiny Vault from Sun & Moon",
        },
      },
    },
  ],
  [
    "mcdonalds-collection-2019",
    {
      id: "mcd19",
      name: "McDonald's Collection 2019",
      href: "mcdonalds-collection-2019",
      total: "12",
      releaseDate: "2019/10/15",
      series: { name: "Other", href: "other" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/mcd19/symbol.png",
          alt: "Symbol for the expansion McDonald's Collection 2019 from Other",
        },
        logo: {
          src: "https://images.pokemontcg.io/mcd19/logo.png",
          alt: "Logo for the expansion McDonald's Collection 2019 from Other",
        },
      },
    },
  ],
  [
    "cosmic-eclipse",
    {
      id: "sm12",
      name: "Cosmic Eclipse",
      href: "cosmic-eclipse",
      total: "272",
      releaseDate: "2019/11/01",
      series: { name: "Sun & Moon", href: "sun-and-moon" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/sm12/symbol.png",
          alt: "Symbol for the expansion Cosmic Eclipse from Sun & Moon",
        },
        logo: {
          src: "https://images.pokemontcg.io/sm12/logo.png",
          alt: "Logo for the expansion Cosmic Eclipse from Sun & Moon",
        },
      },
    },
  ],
  [
    "swsh-black-star-promos",
    {
      id: "swshp",
      name: "SWSH Black Star Promos",
      href: "swsh-black-star-promos",
      total: "304",
      releaseDate: "2019/11/15",
      series: { name: "Sword & Shield", href: "sword-and-shield" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/swshp/symbol.png",
          alt: "Symbol for the expansion SWSH Black Star Promos from Sword & Shield",
        },
        logo: {
          src: "https://images.pokemontcg.io/swshp/logo.png",
          alt: "Logo for the expansion SWSH Black Star Promos from Sword & Shield",
        },
      },
    },
  ],
  [
    "sword-and-shield",
    {
      id: "swsh1",
      name: "Sword & Shield",
      href: "sword-and-shield",
      total: "216",
      releaseDate: "2020/02/07",
      series: { name: "Sword & Shield", href: "sword-and-shield" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/swsh1/symbol.png",
          alt: "Symbol for the expansion Sword & Shield from Sword & Shield",
        },
        logo: {
          src: "https://images.pokemontcg.io/swsh1/logo.png",
          alt: "Logo for the expansion Sword & Shield from Sword & Shield",
        },
      },
    },
  ],
  [
    "rebel-clash",
    {
      id: "swsh2",
      name: "Rebel Clash",
      href: "rebel-clash",
      total: "209",
      releaseDate: "2020/05/01",
      series: { name: "Sword & Shield", href: "sword-and-shield" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/swsh2/symbol.png",
          alt: "Symbol for the expansion Rebel Clash from Sword & Shield",
        },
        logo: {
          src: "https://images.pokemontcg.io/swsh2/logo.png",
          alt: "Logo for the expansion Rebel Clash from Sword & Shield",
        },
      },
    },
  ],
  [
    "darkness-ablaze",
    {
      id: "swsh3",
      name: "Darkness Ablaze",
      href: "darkness-ablaze",
      total: "201",
      releaseDate: "2020/08/14",
      series: { name: "Sword & Shield", href: "sword-and-shield" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/swsh3/symbol.png",
          alt: "Symbol for the expansion Darkness Ablaze from Sword & Shield",
        },
        logo: {
          src: "https://images.pokemontcg.io/swsh3/logo.png",
          alt: "Logo for the expansion Darkness Ablaze from Sword & Shield",
        },
      },
    },
  ],
  [
    "pokemon-futsal-collection",
    {
      id: "fut20",
      name: "Pokémon Futsal Collection",
      href: "pokemon-futsal-collection",
      total: "5",
      releaseDate: "2020/09/11",
      series: { name: "Other", href: "other" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/fut20/symbol.png",
          alt: "Symbol for the expansion Pokémon Futsal Collection from Other",
        },
        logo: {
          src: "https://images.pokemontcg.io/fut20/logo.png",
          alt: "Logo for the expansion Pokémon Futsal Collection from Other",
        },
      },
    },
  ],
  [
    "champions-path",
    {
      id: "swsh35",
      name: "Champion's Path",
      href: "champions-path",
      total: "80",
      releaseDate: "2020/09/25",
      series: { name: "Sword & Shield", href: "sword-and-shield" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/swsh35/symbol.png",
          alt: "Symbol for the expansion Champion's Path from Sword & Shield",
        },
        logo: {
          src: "https://images.pokemontcg.io/swsh35/logo.png",
          alt: "Logo for the expansion Champion's Path from Sword & Shield",
        },
      },
    },
  ],
  [
    "vivid-voltage",
    {
      id: "swsh4",
      name: "Vivid Voltage",
      href: "vivid-voltage",
      total: "203",
      releaseDate: "2020/11/13",
      series: { name: "Sword & Shield", href: "sword-and-shield" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/swsh4/symbol.png",
          alt: "Symbol for the expansion Vivid Voltage from Sword & Shield",
        },
        logo: {
          src: "https://images.pokemontcg.io/swsh4/logo.png",
          alt: "Logo for the expansion Vivid Voltage from Sword & Shield",
        },
      },
    },
  ],
  [
    "mcdonalds-collection-2021",
    {
      id: "mcd21",
      name: "McDonald's Collection 2021",
      href: "mcdonalds-collection-2021",
      total: "25",
      releaseDate: "2021/02/09",
      series: { name: "Other", href: "other" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/mcd21/symbol.png",
          alt: "Symbol for the expansion McDonald's Collection 2021 from Other",
        },
        logo: {
          src: "https://images.pokemontcg.io/mcd21/logo.png",
          alt: "Logo for the expansion McDonald's Collection 2021 from Other",
        },
      },
    },
  ],
  [
    "shining-fates",
    {
      id: "swsh45",
      name: "Shining Fates",
      href: "shining-fates",
      total: "73",
      releaseDate: "2021/02/19",
      series: { name: "Sword & Shield", href: "sword-and-shield" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/swsh45/symbol.png",
          alt: "Symbol for the expansion Shining Fates from Sword & Shield",
        },
        logo: {
          src: "https://images.pokemontcg.io/swsh45/logo.png",
          alt: "Logo for the expansion Shining Fates from Sword & Shield",
        },
      },
    },
  ],
  [
    "shining-fates-shiny-vault",
    {
      id: "swsh45sv",
      name: "Shining Fates Shiny Vault",
      href: "shining-fates-shiny-vault",
      total: "122",
      releaseDate: "2021/02/19",
      series: { name: "Sword & Shield", href: "sword-and-shield" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/swsh45sv/symbol.png",
          alt: "Symbol for the expansion Shining Fates Shiny Vault from Sword & Shield",
        },
        logo: {
          src: "https://images.pokemontcg.io/swsh45sv/logo.png",
          alt: "Logo for the expansion Shining Fates Shiny Vault from Sword & Shield",
        },
      },
    },
  ],
  [
    "battle-styles",
    {
      id: "swsh5",
      name: "Battle Styles",
      href: "battle-styles",
      total: "183",
      releaseDate: "2021/03/19",
      series: { name: "Sword & Shield", href: "sword-and-shield" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/swsh5/symbol.png",
          alt: "Symbol for the expansion Battle Styles from Sword & Shield",
        },
        logo: {
          src: "https://images.pokemontcg.io/swsh5/logo.png",
          alt: "Logo for the expansion Battle Styles from Sword & Shield",
        },
      },
    },
  ],
  [
    "chilling-reign",
    {
      id: "swsh6",
      name: "Chilling Reign",
      href: "chilling-reign",
      total: "233",
      releaseDate: "2021/06/18",
      series: { name: "Sword & Shield", href: "sword-and-shield" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/swsh6/symbol.png",
          alt: "Symbol for the expansion Chilling Reign from Sword & Shield",
        },
        logo: {
          src: "https://images.pokemontcg.io/swsh6/logo.png",
          alt: "Logo for the expansion Chilling Reign from Sword & Shield",
        },
      },
    },
  ],
  [
    "evolving-skies",
    {
      id: "swsh7",
      name: "Evolving Skies",
      href: "evolving-skies",
      total: "237",
      releaseDate: "2021/08/27",
      series: { name: "Sword & Shield", href: "sword-and-shield" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/swsh7/symbol.png",
          alt: "Symbol for the expansion Evolving Skies from Sword & Shield",
        },
        logo: {
          src: "https://images.pokemontcg.io/swsh7/logo.png",
          alt: "Logo for the expansion Evolving Skies from Sword & Shield",
        },
      },
    },
  ],
  [
    "celebrations",
    {
      id: "cel25",
      name: "Celebrations",
      href: "celebrations",
      total: "25",
      releaseDate: "2021/10/08",
      series: { name: "Sword & Shield", href: "sword-and-shield" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/cel25/symbol.png",
          alt: "Symbol for the expansion Celebrations from Sword & Shield",
        },
        logo: {
          src: "https://images.pokemontcg.io/cel25/logo.png",
          alt: "Logo for the expansion Celebrations from Sword & Shield",
        },
      },
    },
  ],
  [
    "celebrations-classic-collection",
    {
      id: "cel25c",
      name: "Celebrations: Classic Collection",
      href: "celebrations-classic-collection",
      total: "25",
      releaseDate: "2021/10/08",
      series: { name: "Sword & Shield", href: "sword-and-shield" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/cel25c/symbol.png",
          alt: "Symbol for the expansion Celebrations: Classic Collection from Sword & Shield",
        },
        logo: {
          src: "https://images.pokemontcg.io/cel25c/logo.png",
          alt: "Logo for the expansion Celebrations: Classic Collection from Sword & Shield",
        },
      },
    },
  ],
  [
    "fusion-strike",
    {
      id: "swsh8",
      name: "Fusion Strike",
      href: "fusion-strike",
      total: "284",
      releaseDate: "2021/11/12",
      series: { name: "Sword & Shield", href: "sword-and-shield" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/swsh8/symbol.png",
          alt: "Symbol for the expansion Fusion Strike from Sword & Shield",
        },
        logo: {
          src: "https://images.pokemontcg.io/swsh8/logo.png",
          alt: "Logo for the expansion Fusion Strike from Sword & Shield",
        },
      },
    },
  ],
  [
    "brilliant-stars",
    {
      id: "swsh9",
      name: "Brilliant Stars",
      href: "brilliant-stars",
      total: "186",
      releaseDate: "2022/02/25",
      series: { name: "Sword & Shield", href: "sword-and-shield" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/swsh9/symbol.png",
          alt: "Symbol for the expansion Brilliant Stars from Sword & Shield",
        },
        logo: {
          src: "https://images.pokemontcg.io/swsh9/logo.png",
          alt: "Logo for the expansion Brilliant Stars from Sword & Shield",
        },
      },
    },
  ],
  [
    "brilliant-stars-trainer-gallery",
    {
      id: "swsh9tg",
      name: "Brilliant Stars Trainer Gallery",
      href: "brilliant-stars-trainer-gallery",
      total: "30",
      releaseDate: "2022/02/25",
      series: { name: "Sword & Shield", href: "sword-and-shield" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/swsh9tg/symbol.png",
          alt: "Symbol for the expansion Brilliant Stars Trainer Gallery from Sword & Shield",
        },
        logo: {
          src: "https://images.pokemontcg.io/swsh9tg/logo.png",
          alt: "Logo for the expansion Brilliant Stars Trainer Gallery from Sword & Shield",
        },
      },
    },
  ],
  [
    "astral-radiance",
    {
      id: "swsh10",
      name: "Astral Radiance",
      href: "astral-radiance",
      total: "216",
      releaseDate: "2022/05/27",
      series: { name: "Sword & Shield", href: "sword-and-shield" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/swsh10/symbol.png",
          alt: "Symbol for the expansion Astral Radiance from Sword & Shield",
        },
        logo: {
          src: "https://images.pokemontcg.io/swsh10/logo.png",
          alt: "Logo for the expansion Astral Radiance from Sword & Shield",
        },
      },
    },
  ],
  [
    "astral-radiance-trainer-gallery",
    {
      id: "swsh10tg",
      name: "Astral Radiance Trainer Gallery",
      href: "astral-radiance-trainer-gallery",
      total: "30",
      releaseDate: "2022/05/27",
      series: { name: "Sword & Shield", href: "sword-and-shield" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/swsh10tg/symbol.png",
          alt: "Symbol for the expansion Astral Radiance Trainer Gallery from Sword & Shield",
        },
        logo: {
          src: "https://images.pokemontcg.io/swsh10tg/logo.png",
          alt: "Logo for the expansion Astral Radiance Trainer Gallery from Sword & Shield",
        },
      },
    },
  ],
  [
    "pokemon-go",
    {
      id: "pgo",
      name: "Pokémon GO",
      href: "pokemon-go",
      total: "88",
      releaseDate: "2022/07/01",
      series: { name: "Sword & Shield", href: "sword-and-shield" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/pgo/symbol.png",
          alt: "Symbol for the expansion Pokémon GO from Sword & Shield",
        },
        logo: {
          src: "https://images.pokemontcg.io/pgo/logo.png",
          alt: "Logo for the expansion Pokémon GO from Sword & Shield",
        },
      },
    },
  ],
  [
    "mcdonalds-collection-2022",
    {
      id: "mcd22",
      name: "McDonald's Collection 2022",
      href: "mcdonalds-collection-2022",
      total: "15",
      releaseDate: "2022/08/03",
      series: { name: "Other", href: "other" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/mcd22/symbol.png",
          alt: "Symbol for the expansion McDonald's Collection 2022 from Other",
        },
        logo: {
          src: "https://images.pokemontcg.io/mcd22/logo.png",
          alt: "Logo for the expansion McDonald's Collection 2022 from Other",
        },
      },
    },
  ],
  [
    "lost-origin",
    {
      id: "swsh11",
      name: "Lost Origin",
      href: "lost-origin",
      total: "217",
      releaseDate: "2022/09/09",
      series: { name: "Sword & Shield", href: "sword-and-shield" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/swsh11/symbol.png",
          alt: "Symbol for the expansion Lost Origin from Sword & Shield",
        },
        logo: {
          src: "https://images.pokemontcg.io/swsh11/logo.png",
          alt: "Logo for the expansion Lost Origin from Sword & Shield",
        },
      },
    },
  ],
  [
    "lost-origin-trainer-gallery",
    {
      id: "swsh11tg",
      name: "Lost Origin Trainer Gallery",
      href: "lost-origin-trainer-gallery",
      total: "30",
      releaseDate: "2022/09/09",
      series: { name: "Sword & Shield", href: "sword-and-shield" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/swsh11tg/symbol.png",
          alt: "Symbol for the expansion Lost Origin Trainer Gallery from Sword & Shield",
        },
        logo: {
          src: "https://images.pokemontcg.io/swsh11tg/logo.png",
          alt: "Logo for the expansion Lost Origin Trainer Gallery from Sword & Shield",
        },
      },
    },
  ],
  [
    "silver-tempest",
    {
      id: "swsh12",
      name: "Silver Tempest",
      href: "silver-tempest",
      total: "215",
      releaseDate: "2022/11/11",
      series: { name: "Sword & Shield", href: "sword-and-shield" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/swsh12/symbol.png",
          alt: "Symbol for the expansion Silver Tempest from Sword & Shield",
        },
        logo: {
          src: "https://images.pokemontcg.io/swsh12/logo.png",
          alt: "Logo for the expansion Silver Tempest from Sword & Shield",
        },
      },
    },
  ],
  [
    "silver-tempest-trainer-gallery",
    {
      id: "swsh12tg",
      name: "Silver Tempest Trainer Gallery",
      href: "silver-tempest-trainer-gallery",
      total: "30",
      releaseDate: "2022/11/11",
      series: { name: "Sword & Shield", href: "sword-and-shield" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/swsh12tg/symbol.png",
          alt: "Symbol for the expansion Silver Tempest Trainer Gallery from Sword & Shield",
        },
        logo: {
          src: "https://images.pokemontcg.io/swsh12tg/logo.png",
          alt: "Logo for the expansion Silver Tempest Trainer Gallery from Sword & Shield",
        },
      },
    },
  ],
  [
    "scarlet-and-violet-black-star-promos",
    {
      id: "svp",
      name: "Scarlet & Violet Black Star Promos",
      href: "scarlet-and-violet-black-star-promos",
      total: "75",
      releaseDate: "2023/01/01",
      series: { name: "Scarlet & Violet", href: "scarlet-and-violet" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/svp/symbol.png",
          alt: "Symbol for the expansion Scarlet & Violet Black Star Promos from Scarlet & Violet",
        },
        logo: {
          src: "https://images.pokemontcg.io/svp/logo.png",
          alt: "Logo for the expansion Scarlet & Violet Black Star Promos from Scarlet & Violet",
        },
      },
    },
  ],
  [
    "crown-zenith",
    {
      id: "swsh12pt5",
      name: "Crown Zenith",
      href: "crown-zenith",
      total: "160",
      releaseDate: "2023/01/20",
      series: { name: "Sword & Shield", href: "sword-and-shield" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/swsh12pt5/symbol.png",
          alt: "Symbol for the expansion Crown Zenith from Sword & Shield",
        },
        logo: {
          src: "https://images.pokemontcg.io/swsh12pt5/logo.png",
          alt: "Logo for the expansion Crown Zenith from Sword & Shield",
        },
      },
    },
  ],
  [
    "crown-zenith-galarian-gallery",
    {
      id: "swsh12pt5gg",
      name: "Crown Zenith Galarian Gallery",
      href: "crown-zenith-galarian-gallery",
      total: "70",
      releaseDate: "2023/01/20",
      series: { name: "Sword & Shield", href: "sword-and-shield" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/swsh12pt5gg/symbol.png",
          alt: "Symbol for the expansion Crown Zenith Galarian Gallery from Sword & Shield",
        },
        logo: {
          src: "https://images.pokemontcg.io/swsh12pt5gg/logo.png",
          alt: "Logo for the expansion Crown Zenith Galarian Gallery from Sword & Shield",
        },
      },
    },
  ],
  [
    "scarlet-and-violet",
    {
      id: "sv1",
      name: "Scarlet & Violet",
      href: "scarlet-and-violet",
      total: "258",
      releaseDate: "2023/03/31",
      series: { name: "Scarlet & Violet", href: "scarlet-and-violet" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/sv1/symbol.png",
          alt: "Symbol for the expansion Scarlet & Violet from Scarlet & Violet",
        },
        logo: {
          src: "https://images.pokemontcg.io/sv1/logo.png",
          alt: "Logo for the expansion Scarlet & Violet from Scarlet & Violet",
        },
      },
    },
  ],
  [
    "scarlet-and-violet-energies",
    {
      id: "sve",
      name: "Scarlet & Violet Energies",
      href: "scarlet-and-violet-energies",
      total: "8",
      releaseDate: "2023/03/31",
      series: { name: "Scarlet & Violet", href: "scarlet-and-violet" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/sve/symbol.png",
          alt: "Symbol for the expansion Scarlet & Violet Energies from Scarlet & Violet",
        },
        logo: {
          src: "https://images.pokemontcg.io/sve/logo.png",
          alt: "Logo for the expansion Scarlet & Violet Energies from Scarlet & Violet",
        },
      },
    },
  ],
  [
    "paldea-evolved",
    {
      id: "sv2",
      name: "Paldea Evolved",
      href: "paldea-evolved",
      total: "279",
      releaseDate: "2023/06/09",
      series: { name: "Scarlet & Violet", href: "scarlet-and-violet" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/sv2/symbol.png",
          alt: "Symbol for the expansion Paldea Evolved from Scarlet & Violet",
        },
        logo: {
          src: "https://images.pokemontcg.io/sv2/logo.png",
          alt: "Logo for the expansion Paldea Evolved from Scarlet & Violet",
        },
      },
    },
  ],
  [
    "obsidian-flames",
    {
      id: "sv3",
      name: "Obsidian Flames",
      href: "obsidian-flames",
      total: "230",
      releaseDate: "2023/08/11",
      series: { name: "Scarlet & Violet", href: "scarlet-and-violet" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/sv3/symbol.png",
          alt: "Symbol for the expansion Obsidian Flames from Scarlet & Violet",
        },
        logo: {
          src: "https://images.pokemontcg.io/sv3/logo.png",
          alt: "Logo for the expansion Obsidian Flames from Scarlet & Violet",
        },
      },
    },
  ],
  [
    "151",
    {
      id: "sv3pt5",
      name: "151",
      href: "151",
      total: "207",
      releaseDate: "2023/09/22",
      series: { name: "Scarlet & Violet", href: "scarlet-and-violet" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/sv3pt5/symbol.png",
          alt: "Symbol for the expansion 151 from Scarlet & Violet",
        },
        logo: {
          src: "https://images.pokemontcg.io/sv3pt5/logo.png",
          alt: "Logo for the expansion 151 from Scarlet & Violet",
        },
      },
    },
  ],
  [
    "paradox-rift",
    {
      id: "sv4",
      name: "Paradox Rift",
      href: "paradox-rift",
      total: "266",
      releaseDate: "2023/11/03",
      series: { name: "Scarlet & Violet", href: "scarlet-and-violet" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/sv4/symbol.png",
          alt: "Symbol for the expansion Paradox Rift from Scarlet & Violet",
        },
        logo: {
          src: "https://images.pokemontcg.io/sv4/logo.png",
          alt: "Logo for the expansion Paradox Rift from Scarlet & Violet",
        },
      },
    },
  ],
  [
    "paldean-fates",
    {
      id: "sv4pt5",
      name: "Paldean Fates",
      href: "paldean-fates",
      total: "245",
      releaseDate: "2024/01/26",
      series: { name: "Scarlet & Violet", href: "scarlet-and-violet" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/sv4pt5/symbol.png",
          alt: "Symbol for the expansion Paldean Fates from Scarlet & Violet",
        },
        logo: {
          src: "https://images.pokemontcg.io/sv4pt5/logo.png",
          alt: "Logo for the expansion Paldean Fates from Scarlet & Violet",
        },
      },
    },
  ],
  [
    "temporal-forces",
    {
      id: "sv5",
      name: "Temporal Forces",
      href: "temporal-forces",
      total: "218",
      releaseDate: "2024/03/22",
      series: { name: "Scarlet & Violet", href: "scarlet-and-violet" },
      images: {
        symbol: {
          src: "https://images.pokemontcg.io/sv5/symbol.png",
          alt: "Symbol for the expansion Temporal Forces from Scarlet & Violet",
        },
        logo: {
          src: "https://images.pokemontcg.io/sv5/logo.png",
          alt: "Logo for the expansion Temporal Forces from Scarlet & Violet",
        },
      },
    },
  ],
]);

/** List of types returned from https://api.pokemontcg.io/v2/types */
export const types = [
  "Colorless",
  "Darkness",
  "Dragon",
  "Fairy",
  "Fighting",
  "Fire",
  "Grass",
  "Lightning",
  "Metal",
  "Psychic",
  "Water",
];

/** List of subtypes returned from https://api.pokemontcg.io/v2/subtypes */
export const subtypes = [
  "ACE SPEC",
  "Ancient",
  "BREAK",
  "Baby",
  "Basic",
  "EX",
  "Eternamax",
  "Fusion Strike",
  "Future",
  "GX",
  "Goldenrod Game Corner",
  "Item",
  "LEGEND",
  "Level-Up",
  "MEGA",
  "Pokémon Tool",
  "Pokémon Tool F",
  "Prime",
  "Prism Star",
  "Radiant",
  "Rapid Strike",
  "Restored",
  "Rocket's Secret Machine",
  "SP",
  "Single Strike",
  "Special",
  "Stadium",
  "Stage 1",
  "Stage 2",
  "Star",
  "Supporter",
  "TAG TEAM",
  "Team Plasma",
  "Technical Machine",
  "Tera",
  "Ultra Beast",
  "V",
  "V-UNION",
  "VMAX",
  "VSTAR",
  "ex",
];

/** List of supertypes returned from https://api.pokemontcg.io/v2/supertypes */
export const supertypes = ["Energy", "Pokémon", "Trainer"];

/** List of rarities returned from https://api.pokemontcg.io/v2/rarities */
export const rarities = [
  "ACE SPEC Rare",
  "Amazing Rare",
  "Classic Collection",
  "Common",
  "Double Rare",
  "Hyper Rare",
  "Illustration Rare",
  "LEGEND",
  "Promo",
  "Radiant Rare",
  "Rare",
  "Rare ACE",
  "Rare BREAK",
  "Rare Holo",
  "Rare Holo EX",
  "Rare Holo GX",
  "Rare Holo LV.X",
  "Rare Holo Star",
  "Rare Holo V",
  "Rare Holo VMAX",
  "Rare Holo VSTAR",
  "Rare Prime",
  "Rare Prism Star",
  "Rare Rainbow",
  "Rare Secret",
  "Rare Shining",
  "Rare Shiny",
  "Rare Shiny GX",
  "Rare Ultra",
  "Shiny Rare",
  "Shiny Ultra Rare",
  "Special Illustration Rare",
  "Trainer Gallery Rare Holo",
  "Ultra Rare",
  "Uncommon",
];

/** List of legalities */
export const legalities = [
  "expanded_legal",
  "standard_legal",
  "unlimited_legal",
  "expanded_banned",
  "standard_banned",
  "unlimited_banned",
];

/** List of regulation marks */
export const marks = ["d", "e", "f", "g", "h"];
