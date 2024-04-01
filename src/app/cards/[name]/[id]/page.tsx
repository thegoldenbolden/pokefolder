import { ExternalLink } from "@/components/icons";
import { PokemonCard } from "@/components/pokemon/card";
import {
  PokemonCarousel,
  PokemonCarouselContent,
  PokemonCarouselEmpty,
  PokemonCarouselHeader,
  PokemonCarouselItem,
} from "@/components/pokemon/carousel";
import { CardLink } from "@/components/pokemon/link";
import { TypeGroup, TypeImage } from "@/components/pokemon/type";
import { SiteFooter } from "@/components/site-footer";
import { Anchor } from "@/components/ui/anchor";
import { Image } from "@/components/ui/image";
import { Link } from "@/components/ui/link";
import { getCard, getCards } from "@/lib/pokemon-tcg";
import { getCardPrice, getQueryKey, getSearchUrl } from "@/lib/utils";
import type {
  CardObject,
  Cardmarket,
  TCGPlayer,
} from "@/types/api/pokemon-tcg";
import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type Route = {
  params: {
    id: string;
  };
};

export const revalidate = 86400;

export async function generateMetadata(
  { params }: Route,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const response = await getCard(params.id);

  if (!response?.data) {
    notFound();
  }

  const card = response.data;

  const keywords = (await parent)?.keywords || [];
  keywords.push(card.name);

  let description = `Get details about ${card.name}`;

  if (card.set.series && card.set.name) {
    description += ` from expansion ${card.set.series}: ${card.set.name}.`;
    keywords.push(card.set.series);
    keywords.push(card.set.name);
  } else if (card.set.name) {
    description += ` from expansion ${card.set.name}.`;
    keywords.push(card.set.name);
  }

  return {
    keywords,
    description,
    title: `${card.name} • ${card.set.name}`,
  };
}

export default async function Page({ params }: Route) {
  const response = await getCard(params.id);

  if (!response?.data) {
    notFound();
  }

  const card = response.data;
  const cardTyping = card.types?.[0]?.toLowerCase() || "";
  const setKey = getQueryKey("sets");

  return (
    <>
      <main className="mx-auto w-full max-w-screen-xl">
        <div
          className={`relative overflow-hidden rounded-b-2xl py-16 shadow-inner shadow-black/70 md:border-x-2 md:border-b md:border-border`}
        >
          <div
            className={`absolute top-0 -z-[1] size-full bg-typing ${cardTyping}`}
          >
            {!cardTyping ? null : (
              <TypeImage
                name={cardTyping}
                fill
                className="w-full object-contain object-center py-4 opacity-20"
              />
            )}
          </div>
          <PokemonCard
            name={card.name}
            priorityImg={card.images.large}
            priorityImgFallback={card.images.small}
            className="mx-auto px-4"
            height={450}
            width={300}
          />
        </div>

        <div className="flex flex-wrap">
          <div className="flex basis-full flex-col gap-8 px-4 py-8 md:basis-1/2">
            <h1 className="text-3xl font-bold">
              {card.name}&nbsp;
              {!card.level?.length ? null : (
                <span className="text-sm uppercase">lv. {card.level}</span>
              )}
            </h1>
            {!card.flavorText?.length ? null : (
              <p className="italic text-fg-soft">{card.flavorText}</p>
            )}

            <section className="flex flex-col gap-4 rounded-lg">
              <h2 className="text-xl font-semibold">General</h2>
              <ul className="flex flex-wrap gap-4">
                <Item
                  title="Artists"
                  data={card.artist}
                  render={({ data: artist }) => (
                    <div className="flex flex-wrap items-center gap-2">
                      {artist.split("+").map((name) => {
                        return (
                          <Link
                            variant="underline"
                            href={getSearchUrl(`artists=${name}`)}
                            key={name}
                          >
                            {name}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                />
                <Item
                  title="Rarity"
                  data={card.rarity}
                  render={({ data: rarity }) => (
                    <Link
                      variant="underline"
                      href={getSearchUrl(`rarities=${rarity}`)}
                    >
                      {rarity}
                    </Link>
                  )}
                />
                <Item
                  title="Supertype"
                  data={card.supertype}
                  render={({ data: supertype }) => (
                    <Link
                      variant="underline"
                      href={getSearchUrl(`supertype=${supertype}`)}
                    >
                      {supertype}
                    </Link>
                  )}
                />
                <Item
                  title="Subtypes"
                  data={card.subtypes}
                  render={({ data: subtypes }) => (
                    <>
                      {subtypes.map((subtype) => (
                        <Link
                          variant="underline"
                          href={getSearchUrl(`subtypes=${subtype}`)}
                          key={subtype}
                        >
                          {subtype}
                        </Link>
                      ))}
                    </>
                  )}
                />
                <Item
                  title="Types"
                  data={card.types}
                  render={({ data: types }) => (
                    <TypeGroup
                      id="types"
                      types={types.map((p) => ({ type: p }))}
                    />
                  )}
                />
                <Item
                  title="Weaknesses"
                  data={card.weaknesses}
                  render={({ data: weaknesses }) => (
                    <TypeGroup id="weaknesses" types={weaknesses} />
                  )}
                />
                <Item
                  title="Resistances"
                  data={card.resistances}
                  render={({ data: resistances }) => (
                    <TypeGroup id="resistances" types={resistances} />
                  )}
                />
                <Item
                  title="Retreat Cost"
                  data={card.retreatCost}
                  render={({ data: retreatCost }) => (
                    <TypeGroup
                      id="retreatCost"
                      types={retreatCost.map((type) => ({ type }))}
                    />
                  )}
                />
                <Item
                  title="Evolves From"
                  data={card.evolvesFrom}
                  render={({ data: evolvesFrom }) => (
                    <Link
                      variant="underline"
                      href={getSearchUrl(`cards=${evolvesFrom}`)}
                    >
                      {evolvesFrom}
                    </Link>
                  )}
                />
                <Item
                  title="Evolves To"
                  data={card.evolvesTo}
                  render={({ data: evolvesTo }) => (
                    <>
                      {evolvesTo.map((val) => (
                        <Link
                          variant="underline"
                          key={`evolves-to-${val}`}
                          href={getSearchUrl(`cards=${val}`)}
                        >
                          {val}
                        </Link>
                      ))}
                    </>
                  )}
                />
                <Item
                  title="Regulation Mark"
                  data={card.regulationMark}
                  render={({ data: regulationMark }) => (
                    <Link
                      variant="underline"
                      href={getSearchUrl(`marks=${regulationMark}`)}
                    >
                      {regulationMark}
                    </Link>
                  )}
                />
                <Item
                  data={card.nationalPokedexNumbers}
                  title="National Pokedex"
                  render={({ data: nationalPokedexNumbers }) => (
                    <>{nationalPokedexNumbers.join(", ")}</>
                  )}
                />
                <Item
                  title="HP"
                  data={card.hp}
                  render={({ data: hp }) => (
                    <Link
                      variant="underline"
                      href={getSearchUrl(`hp=${hp}-${hp}`)}
                    >
                      {hp}
                    </Link>
                  )}
                />
                <Item
                  title="Card No."
                  data={card.number}
                  render={({ data: number }) => <>{number.toString()}</>}
                />
                <Legalities legalities={card.legalities} />
              </ul>
            </section>

            <section className="flex flex-col gap-4 rounded-lg">
              <h2 className="text-xl font-semibold">{`${card.set.series}: ${card.set.name}`}</h2>
              <div className="flex flex-col gap-4">
                <span className="flex items-center justify-center rounded-xl border border-border bg-muted p-4">
                  <Image
                    className="h-[128px] object-contain"
                    src={card.set.images.logo}
                    width={256}
                    height={128}
                    alt={`${card.set.name} logo`}
                  />
                </span>
                <ul className="flex flex-wrap gap-4">
                  <Item
                    title="Series"
                    data={card.set.series}
                    render={({ data: series }) => <>{series}</>}
                  />
                  <Item
                    title="Set"
                    data={card.set}
                    render={({ data: set }) => (
                      <Link
                        variant="underline"
                        href={getSearchUrl(`${getQueryKey("sets")}=${set.id}`)}
                      >
                        {set.name}
                      </Link>
                    )}
                  />
                  <Item
                    title="PTCGO Code"
                    data={card.set.ptcgoCode}
                    render={({ data: ptcgoCode }) => <>{ptcgoCode}</>}
                  />
                  <Item
                    title="Printed Total"
                    data={card.set.printedTotal}
                    render={({ data: printedTotal }) => <>{printedTotal}</>}
                  />
                  <Item
                    title="Total"
                    data={card.set.total}
                    render={({ data: total }) => <>{total}</>}
                  />
                  <Item
                    title="Release Date"
                    data={card.set.releaseDate}
                    render={({ data: releaseDate }) => <>{releaseDate}</>}
                  />
                  <Legalities
                    name="expansions"
                    legalities={card.set.legalities}
                  />
                </ul>
              </div>
            </section>
          </div>

          <div className="flex basis-full flex-col gap-8 px-4 py-8 md:basis-1/2">
            <PriceSection>
              <TCGPrices tcgplayer={card.tcgplayer} />
              <CardmarketPrices cardmarket={card.cardmarket} />
            </PriceSection>
            <AbilitySection abilities={card.abilities} />
            <AttackSection attacks={card.attacks} />
            <RuleSection rules={card.rules} />
            <TraitSection ancientTrait={card.ancientTrait} />
          </div>
        </div>

        <section>
          <PokemonCarousel>
            <PokemonCarouselHeader>
              <h2 className="text-xl font-medium">
                More from&nbsp;
                <Link
                  variant="underline"
                  className="text-primary"
                  href={getSearchUrl(`${setKey}=${card.set.id}`)}
                >
                  {card.set.name}
                </Link>
              </h2>
            </PokemonCarouselHeader>
            <PokemonCarouselContent>
              <Suspense fallback={<ExpansionCards.Fallback />}>
                <ExpansionCards setId={card.set.id} />
              </Suspense>
            </PokemonCarouselContent>
          </PokemonCarousel>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

type ItemProps<T> = {
  title: string;
  data: T;
  render: (props: { data: NonNullable<T> }) => React.JSX.Element;
};

function Item<T>(props: ItemProps<T>) {
  return (
    <li className="flex flex-col gap-1">
      <p className="text-sm uppercase tracking-wide text-fg-soft">
        {props.title}
      </p>
      <div className="my-auto flex flex-wrap items-center gap-2">
        {!props.data || (props.data instanceof Array && !props.data.length) ? (
          "--"
        ) : (
          <props.render data={props.data} />
        )}
      </div>
    </li>
  );
}

type LegalityProps = {
  legalities: CardObject["legalities"];
  name?: "expansions" | "card";
};

function Legalities(props: LegalityProps) {
  if (!props.legalities) {
    return null;
  }

  const legalities = Object.entries(props.legalities);
  if (!legalities.length) {
    return null;
  }

  return (
    <>
      {legalities.map(([legality, value]) => {
        return (
          <Item
            key={`${props.name ?? "card"}-${legality}`}
            data={legality && value ? `${legality}_${value}` : null}
            title={legality}
            render={({ data: legal }) => (
              <Link
                variant="underline"
                href={getSearchUrl(`legalities=${legal}`)}
              >
                {value}
              </Link>
            )}
          />
        );
      })}
    </>
  );
}

type ExpansionCardsProps = {
  setId: string;
};
async function ExpansionCards({ setId }: ExpansionCardsProps) {
  const searchParams = new URLSearchParams();
  searchParams.set("pageSize", "20");
  searchParams.set("orderBy", "name");
  searchParams.set("q", `set.id:${setId}`);
  const cards = await getCards(searchParams.toString());

  if (!cards?.data || cards.totalCount === 0) {
    return <PokemonCarouselEmpty />;
  }

  return (
    <>
      {cards.data.map((card) => (
        <PokemonCarouselItem key={card.id}>
          <CardLink id={card.id} name={card.name} setName={card.set.name}>
            <PokemonCard
              name={card.name}
              priorityImg={card.images.small}
              priorityImgFallback={card.images.large}
              types={card.types}
            />
          </CardLink>
        </PokemonCarouselItem>
      ))}
    </>
  );
}

ExpansionCards.Fallback = function Fallback() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <PokemonCarouselItem key={`fallback-${i}`} role="status">
          <div className="aspect-card max-h-[350px] w-full rounded-lg bg-muted drop-shadow-lg motion-safe:animate-pulse" />
        </PokemonCarouselItem>
      ))}
    </>
  );
};

type CardSectionProps<T extends keyof CardObject> = {
  [P in T]: CardObject[P];
};

function AbilitySection({ abilities }: CardSectionProps<"abilities">) {
  if (!abilities?.length) return null;
  const abilityKey = getQueryKey("abilities");

  const getAbilityStyle = (type: "Poké-Body" | string) => {
    if (type === "Poké-Body") {
      return {
        backgroundColor: "hsl(131.26, 87.9%, 68.76%)",
        color: "hsl(111.32, 93.17%, 13.29%)",
      };
    }

    return {
      backgroundColor: "hsl(0.8, 44%, 49%)",
      color: "hsl(0.8, 44%, 99%)",
    };
  };

  return (
    <section className="flex flex-col gap-4 rounded-lg">
      <h2 className="text-xl font-semibold">Effects</h2>
      <ul className="flex flex-col gap-4">
        {abilities.map((ability) => {
          return (
            <li key={ability.name} className="flex list-none flex-col gap-3">
              <div className="flex flex-wrap gap-2 font-bold">
                <span
                  style={getAbilityStyle(ability.type)}
                  className="flex -skew-x-12 items-center rounded-full px-3 py-0.5 text-sm tracking-wide"
                >
                  {ability.type}
                </span>
                <Link
                  variant="underline"
                  className="font-semibold"
                  href={getSearchUrl(`${abilityKey}=${ability.name}`)}
                >
                  {ability.name}
                </Link>
              </div>
              <Description text={ability.text} />
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function AttackSection({ attacks }: CardSectionProps<"attacks">) {
  if (!attacks?.length) return null;

  const attacksKey = getQueryKey("attacks");

  return (
    <section className="flex flex-col gap-4 rounded-lg">
      <h2 className="text-xl font-semibold">Attacks</h2>
      <ul className="flex flex-col gap-4">
        {attacks.map(({ name, damage, cost, text }) => {
          return (
            <li key={name} className="flex list-none flex-col gap-3">
              <div className="flex flex-wrap gap-2 font-bold">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex shrink-0 items-center gap-2">
                    <TypeGroup
                      types={cost.map((type) => ({ type }))}
                      id="attacks"
                    />
                  </div>
                  <Link
                    variant="underline"
                    href={getSearchUrl(`${attacksKey}=${name}`)}
                  >
                    {name}
                  </Link>
                </div>
                <span className="ml-auto">{damage}</span>
              </div>
              <Description text={text} />
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function RuleSection({ rules }: CardSectionProps<"rules">) {
  if (!rules?.length) return null;

  return (
    <section className="flex flex-col gap-4 rounded-lg">
      <h2 className="text-xl font-semibold">Rules</h2>
      <ul className="flex flex-col gap-4">
        {rules.map((rule, i) => {
          const ruleText = rule.split(":");
          let name = "",
            text = "";

          if (ruleText.length === 2) {
            name = ruleText[0];
            text = ruleText[1];
          } else {
            text = ruleText[ruleText.length - 1];
          }

          return (
            <li key={`rules-${i}`} className="flex list-none flex-col gap-2">
              {!name ? null : <span className="font-semibold">{name}</span>}
              <Description key={`rules-${i}`} text={text.trim()} />
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function TraitSection({ ancientTrait }: CardSectionProps<"ancientTrait">) {
  if (!ancientTrait || !ancientTrait?.name) return null;

  const traitKey = getQueryKey("traits");

  return (
    <section className="flex flex-col gap-4 rounded-lg">
      <h2 className="text-xl font-semibold">Ancient Trait</h2>
      <ul className="flex flex-col gap-4">
        <li className="flex list-none flex-col gap-2">
          <Link
            className="font-bold"
            variant="underline"
            href={getSearchUrl(`${traitKey}=${ancientTrait.name}`)}
          >
            {ancientTrait.name}
          </Link>
          <Description text={ancientTrait.text} />
        </li>
      </ul>
    </section>
  );
}

function Description({ text }: { text?: string | null }) {
  if (!text) return null;

  return (
    <p className="mx-2 rounded-xl border border-border bg-fg/5 px-3 py-2 text-sm">
      {text}
    </p>
  );
}

// #region Price Card
function PriceSection(props: React.PropsWithChildren) {
  return (
    <section>
      <h2 className="text-xl font-semibold">Prices</h2>
      <div className="flex flex-col gap-4">{props.children}</div>
    </section>
  );
}

type PriceGroup = {
  name: "Cardmarket" | "TCGPlayer";
  url: string;
  updatedAt?: string;
  prices?: Cardmarket["prices"] | TCGPlayer["prices"];
};

function PriceGroup({ name, url, prices, updatedAt }: PriceGroup) {
  const priceEntries = prices ? Object.entries(prices) : null;
  if (!priceEntries?.length) return null;

  return (
    <div className="flex flex-col gap-1">
      <h3 className="flex flex-wrap items-center justify-between gap-2">
        <Anchor
          aria-label={`external link to ${name}`}
          href={url}
          variant="underline"
          className="items-center gap-1 py-1 text-lg capitalize"
        >
          <ExternalLink className="size-5" />
          {name}
        </Anchor>
        {updatedAt && <span className="text-sm">{updatedAt}</span>}
      </h3>
      <ul className="grid grid-cols-2 gap-4 rounded-xl border border-border bg-muted p-6 sm:grid-cols-3 lg:grid-cols-4">
        {priceEntries.map(([type, value]) => (
          <Prices
            key={type}
            type={type}
            prices={value}
            euros={name === "Cardmarket"}
          />
        ))}
      </ul>
    </div>
  );
}

type PricesProps = {
  euros?: boolean;
  type: string;
  prices: TCGPlayer["prices"] | Cardmarket["prices"];
  recursiveLimit?: number;
};

function Prices({ type, prices, euros, recursiveLimit = 5 }: PricesProps) {
  if (!prices || recursiveLimit === 0) {
    return null;
  }

  type = type.replace(/([A-Z])/g, " $1");
  type = type.replace(
    /(avg1|avg7|avg30)/gi,
    (match) => `${match.slice(3)} Day Average`,
  );

  // Go through price object until a number is found
  if (typeof prices !== "number") {
    return (
      <li className="col-span-full flex list-none flex-col gap-2">
        <span className="border-b border-b-border text-sm font-medium capitalize tracking-wide text-fg-soft">
          {type}
        </span>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Object.entries(prices).map(([type, value]) => (
            <Prices
              recursiveLimit={recursiveLimit - 1}
              key={type}
              type={type}
              prices={value}
              euros={euros}
            />
          ))}
        </ul>
      </li>
    );
  }

  const price = getCardPrice(euros ? "EUR" : "USD", prices);

  let priceType = "euro";
  if (!euros) {
    priceType = type.toLowerCase().includes("low")
      ? "low"
      : type.toLowerCase().includes("high")
        ? "high"
        : type.toLowerCase().includes("mid")
          ? "mid"
          : type.toLowerCase().includes("market")
            ? "market"
            : "euro";
  }

  return (
    <li className="flex list-none flex-col gap-px text-balance">
      <span className="text-sm uppercase tracking-wider">{type}</span>
      <span
        data-price={euros ? "euro" : `${priceType}`}
        className="mt-auto data-[price=euro]:text-prices-euro data-[price=high]:text-prices-high data-[price=low]:text-prices-low data-[price=market]:text-prices-market data-[price=mid]:text-prices-mid"
      >
        {price}
      </span>
    </li>
  );
}

function TCGPrices({ tcgplayer }: CardSectionProps<"tcgplayer">) {
  if (!tcgplayer?.prices) return null;

  return (
    <PriceGroup
      name="TCGPlayer"
      prices={tcgplayer?.prices}
      url={tcgplayer?.url ?? ""}
      updatedAt={tcgplayer?.updatedAt}
    />
  );
}

function CardmarketPrices({ cardmarket }: CardSectionProps<"cardmarket">) {
  if (!cardmarket?.prices) return null;

  return (
    <PriceGroup
      name="Cardmarket"
      prices={cardmarket?.prices}
      url={cardmarket?.url ?? ""}
      updatedAt={cardmarket?.updatedAt}
    />
  );
}
// #endregion
