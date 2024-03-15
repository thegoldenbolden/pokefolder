import { CardLink } from "@/components/card/link";
import { ExternalLink } from "@/components/icons";
import { Anchor } from "@/components/ui/anchor";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Image } from "@/components/ui/image";
import { Link } from "@/components/ui/link";
import { Spinner } from "@/components/ui/spinner";
import { getCard, getCards } from "@/lib/pokemon-tcg";
import { getBackgroundColor } from "@/lib/pokemon-tcg/utils";
import { getCardPrice, getQueryKey, getSearchUrl } from "@/lib/utils";
import type {
  CardObject,
  Cardmarket,
  SimpleSet,
  TCGPlayer,
} from "@/types/api/pokemon-tcg";
import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { Suspense, cache } from "react";

type CardParams = {
  params: {
    id: string;
  };
};

export const revalidate = 86400;

const findCard = cache(getCard);

export async function generateMetadata(
  { params }: CardParams,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const response = await findCard(params.id);

  if (!response?.data) {
    notFound();
  }

  const card = response.data;

  const keywords = (await parent)?.keywords || [];

  let from = card.name;
  if (card.set.series && card.set.name) {
    from = `expansion ${card.set.series}: ${card.set.name}`;
    keywords.push(card.set.series);
    keywords.push(card.set.name);
  } else if (card.set.name) {
    from = card.set.name;
    keywords.push(card.set.name);
  }

  return {
    keywords: [card.name, ...keywords],
    description: `Get information about ${card.name} from ${from}.`,
    title: {
      absolute: `${card.name} - ${card.set.name}`,
    },
  };
}

export default async function Page({ params }: CardParams) {
  const response = await findCard(params.id);

  if (!response?.data) {
    notFound();
  }

  const card = response.data;

  return (
    <main>
      <section className="relative overflow-clip rounded-xl py-16 md:border md:border-border">
        <div
          style={{ background: getBackgroundColor(card.types?.[0]) }}
          className="absolute top-0 -z-[1] h-full w-full shadow-inner shadow-background"
        >
          {!card.types?.[0] ? null : (
            <Image
              src={`/types/${card.types[0].toLowerCase()}.png`}
              fill
              className="absolute top-0 w-full object-contain object-center py-4 opacity-20"
              alt={`${card.types[0]} icon`}
            />
          )}
        </div>
        <Image
          className="z-0 mx-auto px-4"
          height={450}
          width={300}
          alt={card.name ?? "a pokemon card"}
          src={card.images.large || card.images.small || "./back.png"}
        />
      </section>

      <div className="flex flex-wrap">
        <div className="flex basis-full flex-col gap-8 px-4 py-8 md:basis-1/2">
          <header>
            <h1 className="text-center text-3xl font-bold lg:text-start">
              {card.name}&nbsp;
              {!card.level?.length ? null : (
                <span className="text-sm uppercase">lv. {card.level}</span>
              )}
            </h1>
            <span className="block text-center lg:text-start">
              {card.supertype}
            </span>
            {!card.flavorText?.length ? null : (
              <p className="mx-auto w-2/3 text-center text-sm font-normal italic lg:mx-0 lg:w-auto lg:text-start">
                {card.flavorText}
              </p>
            )}
          </header>
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
                  <TypeIcons
                    id="types"
                    types={types.map((p) => ({ type: p }))}
                  />
                )}
              />
              <Item
                title="Weaknesses"
                data={card.weaknesses}
                render={({ data: weaknesses }) => (
                  <TypeIcons id="weaknesses" types={weaknesses} />
                )}
              />
              <Item
                title="Resistances"
                data={card.resistances}
                render={({ data: resistances }) => (
                  <TypeIcons id="resistances" types={resistances} />
                )}
              />
              <Item
                title="Retreat Cost"
                data={card.retreatCost}
                render={({ data: retreatCost }) => (
                  <TypeIcons
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
              <span className="flex items-center justify-center rounded-xl border border-border bg-foreground p-4">
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
                <Item
                  title="Updated At"
                  data={card.set.updatedAt}
                  render={({ data: updatedAt }) => <>{updatedAt}</>}
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
          <PriceSection
            tcgplayer={card.tcgplayer}
            cardmarket={card.cardmarket}
          />
          <AbilitySection abilities={card.abilities} />
          <AttackSection attacks={card.attacks} />
          <RuleSection rules={card.rules} />
          <TraitSection ancientTrait={card.ancientTrait} />
        </div>
      </div>

      <section className="flex flex-col gap-4 rounded-lg">
        <Suspense fallback={<ExpansionCards.Fallback name={card.name} />}>
          <ExpansionCards set={card.set} cardId={card.id} />
        </Suspense>
      </section>
    </main>
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
      <h3 className="text-xs uppercase tracking-wider text-foreground/60">
        {props.title}
      </h3>
      <div className="flex flex-wrap items-center gap-2 text-sm">
        {!props.data || (props.data instanceof Array && !props.data.length) ? (
          "--"
        ) : (
          <props.render data={props.data} />
        )}
      </div>
    </li>
  );
}

type CardTypeProps = {
  types: { type: string; value?: string }[];
  id: string;
};

function TypeIcons({ types, id }: CardTypeProps) {
  if (!types.length) return <>--</>;
  return (
    <>
      {types.map(({ type, value }, i) => {
        return (
          <Link
            key={`${id}-${type}-${i}`}
            variant={null}
            className="flex shrink-0 flex-wrap items-center gap-2 outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background motion-safe:transition-colors"
            href={getSearchUrl(`types=${type}`)}
          >
            <Image
              src={`/types/${type.toLowerCase()}.png`}
              height={24}
              width={24}
              className="size-4 shrink-0 object-contain"
              alt={`${type} icon`}
            />
            {value}
          </Link>
        );
      })}
    </>
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
  set: SimpleSet;
  cardId: string;
};
async function ExpansionCards({ set, cardId }: ExpansionCardsProps) {
  const searchParams = new URLSearchParams();
  searchParams.set("pageSize", "20");
  searchParams.set("orderBy", "name");
  searchParams.set("q", `set.id:${set.id} -id:${cardId}`);
  const cards = await getCards(searchParams.toString());

  const setKey = getQueryKey("sets");

  const ExpansionLink = (
    <Link
      variant="underline"
      className="text-primary"
      href={getSearchUrl(`${setKey}=${set.id}`)}
    >
      {set.name}
    </Link>
  );

  if (!cards?.data || cards.totalCount === 0) {
    return <p>No cards found from {ExpansionLink}</p>;
  }

  return (
    <Carousel className="w-full">
      <div className="flex flex-wrap items-center justify-between gap-2 px-4">
        <h2 className="text-lg font-medium">
          More from&nbsp;
          {ExpansionLink}
        </h2>
        <div className="flex flex-wrap items-center justify-end gap-1">
          <CarouselPrevious size={null} className="p-2" variant="border" />
          <CarouselNext size={null} className="p-2" variant="border" />
        </div>
      </div>
      <CarouselContent className="px-2 py-4">
        {cards.data.map((card) => (
          <CarouselItem
            className="basis-1/2 sm:basis-1/4 lg:basis-1/5"
            key={card.id}
          >
            <CardLink {...card} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

ExpansionCards.Fallback = function Fallback({ name }) {
  return (
    <div
      className="flex w-full flex-wrap items-center gap-4 py-8 text-lg"
      role="status"
    >
      <Spinner />
      <span>Loading cards from {name}</span>
    </div>
  );
};

// #region Price Card
type PriceListProps = {
  market: "Cardmarket" | "TCGPlayer";
  url: string;
  updatedAt?: string;
  prices?: Cardmarket["prices"] | TCGPlayer["prices"];
};

function PriceItem({ market, url, prices, updatedAt }: PriceListProps) {
  const priceEntries = prices ? Object.entries(prices) : null;
  if (!priceEntries?.length) return null;

  return (
    <li className="flex flex-col gap-2">
      <h3 className="flex flex-wrap items-center justify-between gap-3 border-b border-b-foreground/10">
        <Anchor
          aria-label={`external link to ${market}`}
          href={url}
          variant="underline"
          className="items-center gap-1 py-1 capitalize"
        >
          <ExternalLink className="size-4" />
          {market}
        </Anchor>
        {updatedAt && <span className="text-sm">as of {updatedAt}</span>}
      </h3>
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {priceEntries.map(([type, value]) => (
          <Price
            key={type}
            type={type}
            value={value}
            euros={market === "Cardmarket"}
          />
        ))}
      </ul>
    </li>
  );
}

type PriceItemProps = {
  euros?: boolean;
  type: string;
  value: TCGPlayer["prices"] | Cardmarket["prices"];
  depthLimit?: number;
};

function Price({ type, value, euros, depthLimit = 5 }: PriceItemProps) {
  if (!value || depthLimit === 0) {
    return null;
  }

  // Recursively go through price object until a number is found
  if (typeof value !== "number") {
    type = type.replace(/([A-Z])/g, " $1");
    type = type.replace(
      /(avg1|avg7|avg30)/gi,
      (match) => `${match.slice(3)} Day Average`,
    );

    return (
      <li className="col-span-full flex flex-col gap-2">
        <span className="text-sm font-semibold uppercase tracking-wider text-foreground/75">
          {type}
        </span>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Object.entries(value).map(([type, value]) => (
            <Price
              depthLimit={depthLimit - 1}
              key={type}
              type={type}
              value={value}
              euros={euros}
            />
          ))}
        </ul>
      </li>
    );
  }

  const price = getCardPrice(euros ? "EUR" : "USD", value);

  type = type.replace(/([A-Z])/g, " $1");
  type = type.replace(
    /(avg1|avg7|avg30)/gi,
    (match) => `${match.slice(3)} Day Average`,
  );

  let color = "hsl(0 30% 60%)";

  switch (type) {
    case "low":
      color = "hsl(110 50% 70%)";
      break;
    case "mid":
      color = "hsl(210 70% 60%)";
      break;
    case "high":
      color = "hsl(0 100% 60%)";
      break;
    case "market":
      color = "hsl(50 70% 50%)";
  }

  return (
    <li className="flex flex-col gap-2 text-balance">
      <span className="text-xs uppercase tracking-wider">{type}</span>
      <span style={{ color }} className="mt-auto">
        {price}
      </span>
    </li>
  );
}

type CardSectionProps<T extends keyof CardObject> = {
  [P in T]: CardObject[P];
};

function PriceSection({
  tcgplayer,
  cardmarket,
}: CardSectionProps<"tcgplayer" | "cardmarket">) {
  const TCGPrices = () => {
    if (!tcgplayer?.prices) {
      return <li>No TCGPlayer prices available</li>;
    }

    return (
      <PriceItem
        market="TCGPlayer"
        prices={tcgplayer?.prices}
        url={tcgplayer?.url ?? ""}
        updatedAt={tcgplayer?.updatedAt}
      />
    );
  };

  const CardmarketPrices = () => {
    if (!cardmarket?.prices) {
      return <li>No cardmarket prices available</li>;
    }

    return (
      <PriceItem
        market="Cardmarket"
        prices={cardmarket?.prices}
        url={cardmarket?.url ?? ""}
        updatedAt={cardmarket?.updatedAt}
      />
    );
  };

  return (
    <section className="p-0 md:rounded-xl md:border md:border-border md:p-6">
      <h2 className="text-xl font-semibold">Prices</h2>
      <ul className="flex flex-col gap-4">
        <TCGPrices />
        <CardmarketPrices />
      </ul>
    </section>
  );
}
// #endregion

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
    };
  };

  return (
    <section className="flex flex-col gap-4 rounded-lg">
      <h2 className="text-xl font-semibold">Effects</h2>
      <ul className="flex flex-col gap-4">
        {abilities.map((ability) => {
          return (
            <li key={ability.name} className="flex flex-col gap-3">
              <h3 className="flex flex-wrap gap-2 font-bold">
                <span
                  style={getAbilityStyle(ability.type)}
                  className="flex -skew-x-12 items-center rounded-sm px-3 py-0.5 text-xs tracking-wider"
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
              </h3>
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
            <li key={name} className="flex flex-col gap-3">
              <h3 className="flex flex-wrap gap-2 font-bold">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex shrink-0 items-center gap-2">
                    <TypeIcons
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
              </h3>
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
            <li key={`rules-${i}`} className="flex flex-col gap-2">
              {!name ? null : <h3 className="font-semibold">{name}</h3>}
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
        <li className="flex flex-col gap-2">
          <h3 className="font-bold">
            <Link
              variant="underline"
              href={getSearchUrl(`${traitKey}=${ancientTrait.name}`)}
            >
              {ancientTrait.name}
            </Link>
          </h3>
          <Description text={ancientTrait.text} />
        </li>
      </ul>
    </section>
  );
}

function Description({ text }: { text?: string | null }) {
  if (!text) return null;

  return (
    <p className="mx-2 rounded-xl border border-border bg-foreground/5 px-3 py-2 text-sm">
      {text}
    </p>
  );
}
