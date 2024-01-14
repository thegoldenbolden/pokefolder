import type { Metadata, ResolvingMetadata } from 'next';
import type { CardMarket, TCGPlayer } from '@/types/tcg';
import type { TCardFull, TSet } from '@/types/tcg';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { cn, getAbilityUrl, getAttackUrl, getTraitUrl } from '@/lib/utils';
import { Optional, TypesImage } from '@/components/card/typings';
import { Spinner } from '@/ui/spinner';
import { Link } from '@/ui/link';
import { Image } from '@/ui/image';
import { CardLink } from '@/components/card/link';
import { getCards, getCard } from '@/lib/fetch';
import { getPrice } from '@/lib/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

type CardParams = {
  params: {
    id: string;
  };
};

export async function generateMetadata(
  { params }: CardParams,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const response = await getCard(params.id);

  if (!response?.data) {
    return {
      title: 'Not Found',
    };
  }

  const card = response.data;
  const keywords = (await parent)?.keywords || [];

  let from = card.name;
  if (card.set.series && card.set.name) {
    from = `${card.set.series}: ${card.set.name}`;
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
  const response = await getCard(params.id);

  const card = response?.data;
  if (!card) {
    notFound();
  }

  card.artist ||= '';
  card.types ||= [];
  card.subtypes ||= [];
  card.evolvesTo ||= [];
  card.retreatCost ||= [];
  card.weaknesses ||= [];
  card.resistances ||= [];
  card.nationalPokedexNumbers ||= [];

  return (
    <main className="flex flex-col gap-16 my-16 px-3 md:px-6">
      <div className="grid grid-cols-1 md:grid-cols-[max-content_1fr] xl:grid-cols-[max-content_1fr_.5fr] gap-6">
        <aside className="md:sticky md:top-6 md:self-start md:row-start-2">
          <Image
            className="mx-auto"
            height={450}
            width={300}
            alt={card.name ?? 'a pokemon card'}
            src={card.images.large || card.images.small || './back.png'}
          />
        </aside>

        <header className="flex flex-col gap-2 text-center md:text-start md:col-start-2 md:row-start-1 md:col-span-2">
          <h1 className="text-3xl font-bold text-center md:text-start">
            {card.name}&nbsp;
            {!card.level ? null : (
              <span className="text-sm uppercase">lv. {card.level}</span>
            )}
          </h1>
          <span className="block">{card.supertype}</span>
          {!card.flavorText ? null : (
            <p className="italic text-sm font-normal w-2/3 mx-auto md:mx-0 md:w-auto">
              {card.flavorText}
            </p>
          )}
        </header>

        <Container className="md:row-start-2">
          {!(card.cardmarket?.prices || card.tcgplayer?.prices) ? null : (
            <Section className="shadow-2xl shadow-border bg-muted text-muted-foreground border border-border p-6">
              <SectionHeading>Prices</SectionHeading>
              <SectionContent className="flex flex-col gap-4">
                <PristListItem
                  market="TCGPlayer"
                  prices={card.tcgplayer?.prices}
                  url={card.tcgplayer?.url ?? ''}
                  updatedAt={card.tcgplayer?.updatedAt}
                />
                <PristListItem
                  market="Cardmarket"
                  prices={card.cardmarket?.prices}
                  url={card.cardmarket?.url ?? ''}
                  updatedAt={card.cardmarket?.updatedAt}
                />
              </SectionContent>
            </Section>
          )}
          {!card.abilities?.length ? null : (
            <Section>
              <SectionHeading>Effects</SectionHeading>
              <SectionContent>
                {card.abilities.map((ability) => {
                  let style =
                    ability.type === 'Poké-Body'
                      ? {
                          backgroundColor: 'hsl(131.26, 87.9%, 68.76%)',
                          color: 'hsl(111.32, 93.17%, 13.29%)',
                        }
                      : {
                          backgroundColor: 'hsl(0.8, 44%, 49%)',
                        };
                  return (
                    <li key={ability.name} className="flex flex-col gap-3">
                      <h3 className="flex gap-2 flex-wrap font-bold">
                        <span
                          style={style}
                          className="text-xs px-3 flex items-center py-0.5 rounded-sm -skew-x-12 tracking-wider"
                        >
                          {ability.type}
                        </span>
                        <Link
                          className="font-semibold"
                          href={getAbilityUrl(ability)}
                        >
                          {ability.name}
                        </Link>
                      </h3>
                      {!ability.text ? null : (
                        <p className="mx-2 px-3 text-sm py-2 bg-foreground/5 rounded-sm border-border border">
                          {ability.text}
                        </p>
                      )}{' '}
                    </li>
                  );
                })}
              </SectionContent>
            </Section>
          )}
          {!card.attacks?.length ? null : (
            <Section>
              <SectionHeading>Attacks</SectionHeading>
              <SectionContent>
                {card.attacks.map(({ name, damage, cost, text }) => {
                  return (
                    <li key={name} className="flex flex-col gap-3">
                      <h3 className="flex gap-2 flex-wrap font-bold">
                        <div className="flex gap-2 items-center flex-wrap">
                          <TypeIcon
                            types={cost.map((type) => ({ type }))}
                            id="attacks"
                          />
                          <Link href={getAttackUrl(name)}>{name}</Link>
                        </div>
                        <span className="ml-auto">{damage}</span>
                      </h3>
                      {!text ? null : (
                        <p className="mx-2 px-3 text-sm py-2 bg-foreground/5 rounded-sm border-border border">
                          {text}
                        </p>
                      )}
                    </li>
                  );
                })}
              </SectionContent>
            </Section>
          )}

          {!card.rules?.length ? null : (
            <Section>
              <SectionHeading>Rules</SectionHeading>
              <SectionContent>
                {card.rules.map((rule, i) => {
                  const ruleText = rule.split(':');
                  let name = '',
                    text = '';

                  if (ruleText.length === 2) {
                    name = ruleText[0];
                    text = ruleText[1];
                  } else {
                    text = ruleText[ruleText.length - 1];
                  }

                  return (
                    <li key={`rules-${i}`} className="flex flex-col gap-2">
                      {!name ? null : (
                        <h3 className="italic rounded-sm self-start text-sm font-semibold">
                          {name}
                        </h3>
                      )}
                      {!text ? null : (
                        <p
                          key={`rules-${i}`}
                          className="mx-2 px-3 text-sm py-2 bg-foreground/5 rounded-sm border-border border"
                        >
                          {text.trim()}
                        </p>
                      )}
                    </li>
                  );
                })}
              </SectionContent>
            </Section>
          )}

          {card.ancientTrait?.name && card.ancientTrait?.text && (
            <Section>
              <SectionHeading>Ancient Trait</SectionHeading>
              <SectionContent>
                <li className="flex flex-col gap-2">
                  <h3 className="font-bold">
                    <Link href={getTraitUrl(card.ancientTrait)}>
                      {card.ancientTrait.name}
                    </Link>
                  </h3>
                  {!card.ancientTrait?.text ? null : (
                    <p className="mx-2 px-3 text-sm py-2 bg-foreground/5 rounded-sm border-border border">
                      {card.ancientTrait.text}
                    </p>
                  )}
                </li>
              </SectionContent>
            </Section>
          )}
        </Container>

        <Container className="md:row-start-3 md:col-start-2 xl:col-start-3 xl:row-start-2">
          <Section>
            <SectionHeading>General</SectionHeading>
            <ul className="grid grid-cols-2 gap-4">
              <Item title="Artists">
                <Optional data={card.artist}>
                  <div className="flex flex-wrap gap-2 items-center">
                    {card.artist.split('+').map((name) => {
                      return (
                        <Link href={`/search?artists=${name}`} key={name}>
                          {name}
                        </Link>
                      );
                    })}
                  </div>
                </Optional>
              </Item>
              <Item title="Rarity">
                <Optional data={card.rarity}>
                  <Link href={`/search?rarities=${card.rarity}`}>
                    {card.rarity}
                  </Link>
                </Optional>
              </Item>
              <Item title="Subtypes">
                <Optional data={card.subtypes}>
                  {card.subtypes.map((subtype) => (
                    <Link href={`/search?subtypes=${subtype}`} key={subtype}>
                      {subtype}
                    </Link>
                  ))}
                </Optional>
              </Item>
              <Item title="Types">
                <Optional data={card.types}>
                  <TypesImage q="types" id="types" data={card.types!} />
                </Optional>
              </Item>
              <Item title="Weaknesses">
                <Optional data={card.weaknesses}>
                  <TypeIcon id="weaknesses" types={card.weaknesses!} />
                </Optional>
              </Item>
              <Item title="Resistances">
                <Optional data={card.resistances}>
                  <TypeIcon id="resistances" types={card.resistances!} />
                </Optional>
              </Item>
              <Item title="Retreat Cost">
                <Optional data={card.retreatCost}>
                  <TypeIcon
                    id="retreatCost"
                    types={card.retreatCost.map((type) => ({ type }))}
                  />
                </Optional>
              </Item>
              <Item title="Evolves From">
                <Optional data={card.evolvesFrom}>
                  <Link href={`/search?cards=${card.evolvesFrom}`}>
                    {card.evolvesFrom}
                  </Link>
                </Optional>
              </Item>
              <Item title="Evolves To">
                <Optional data={card.evolvesTo}>
                  {card.evolvesTo.map((val) => (
                    <Link
                      key={`evolvesTo-${val}`}
                      href={`/search?cards=${val}`}
                    >
                      {val}
                    </Link>
                  ))}
                </Optional>
              </Item>
              <Item title="Regulation Mark">
                <Optional data={card.regulationMark}>
                  <Link href={`/search?marks=${card.regulationMark}`}>
                    {card.regulationMark}
                  </Link>
                </Optional>
              </Item>
              <Item title="National Pokedex">
                <Optional data={card.nationalPokedexNumbers}>
                  {card.nationalPokedexNumbers.join(', ')}
                </Optional>
              </Item>
              <Item title="HP">
                <Optional data={card.hp}>
                  <Link href={`/search?hp=${card.hp}-${card.hp}`}>
                    {card.hp}
                  </Link>
                </Optional>
              </Item>
              <Item title="Number">
                <Optional data={card.number?.toString()}>
                  {`${card.number} / ${card.set.printedTotal}`}
                </Optional>
              </Item>
              <Legalities legalities={card.legalities} />
            </ul>
          </Section>

          <Section>
            <SectionHeading>{`${card.set.series}: ${card.set.name}`}</SectionHeading>
            <SectionContent>
              <span className="rounded-sm border border-border bg-foreground p-4 flex items-center justify-center">
                <Image
                  className="object-contain h-[128px]"
                  src={card.set.images.logo}
                  width={256}
                  height={128}
                  alt={`${card.set.name} logo`}
                />
              </span>
              <ul className="grid grid-cols-2 gap-2">
                <Item title="Series">{card.set.series}</Item>
                <Item title="Set">
                  <div key={card.set.id} className="flex gap-2">
                    <span className="rounded-sm aspect-square flex items-center justify-center size-6 p-1 bg-foreground">
                      <Image
                        src={card.set.images.symbol}
                        alt={`${card.set.name} symbol`}
                        height={24}
                        width={24}
                        className="object-contain size-4"
                      />
                    </span>
                    <Link
                      variant="link"
                      aria-label={`search cards in ${card.set.name}`}
                      href={`/search?sets=${card.set.id}`}
                    >
                      {card.set.name}
                    </Link>
                  </div>
                </Item>
                <Item title="PTCGO Code">
                  <Optional data={card.set.ptcgoCode}>
                    {card.set.ptcgoCode}
                  </Optional>
                </Item>
                <Item title="Printed Total">
                  {`${card.set.printedTotal} / ${card.set.total}`}
                </Item>
                <Item title="Release Date">{card.set.releaseDate}</Item>
                <Item title="Updated At">{card.set.updatedAt}</Item>
                <Legalities name="sets" legalities={card.set.legalities} />
              </ul>
            </SectionContent>
          </Section>
        </Container>
      </div>

      <Section>
        <Suspense fallback={<Spinner />}>
          <MoreCardsFromSet set={card.set} cardName={card.name} />
        </Suspense>
      </Section>
    </main>
  );
}

function Container({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div {...props} className={cn('flex flex-col gap-8', className)}>
      {props.children}
    </div>
  );
}

function Section({ className, ...props }: React.ComponentProps<'section'>) {
  return (
    <section
      {...props}
      className={cn('flex flex-col gap-4 rounded-md', className)}
    >
      {props.children}
    </section>
  );
}

type Heading = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type HeadingProps = React.ComponentProps<Heading> & {
  as?: Heading;
};

function SectionHeading({
  as: Comp = 'h2',
  className,
  ...props
}: HeadingProps) {
  return (
    <Comp {...props} className={cn('font-semibold text-xl', className)}>
      {props.children}
    </Comp>
  );
}

type SectionContentComp = 'ul';
type SectionContentProps = React.ComponentProps<SectionContentComp> & {
  as?: SectionContentComp;
};

function SectionContent({
  as: Comp = 'ul',
  className,
  ...props
}: SectionContentProps) {
  return (
    <Comp {...props} className={cn('flex flex-col gap-4', className)}>
      {props.children}
    </Comp>
  );
}

function Item(props: React.PropsWithChildren<{ title: string }>) {
  return (
    <li className="flex flex-col gap-1">
      <h3 className="uppercase text-foreground/60 text-xs tracking-wider">
        {props.title}
      </h3>
      <div className="flex flex-wrap gap-2 text-sm items-center">
        {props.children}
      </div>
    </li>
  );
}

type CardTypeProps = {
  types: { type: string; value?: string }[];
  id: string;
};

function TypeIcon({ types, id }: CardTypeProps) {
  if (!types.length) return <>--</>;
  return (
    <>
      {types.map(({ type, value }, i) => {
        return (
          <Link
            key={`${id}-${type}-${i}`}
            className="flex items-center flex-wrap gap-2"
            href={`/search?types=${type}`}
          >
            <Image
              src={`/types/${type.toLowerCase()}.png`}
              height={24}
              width={24}
              className="object-contain size-4"
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
  legalities: TCardFull['legalities'];
  name?: 'sets' | 'card';
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
      {legalities.map(([legality, value]) => (
        <Item key={`${props.name ?? 'card'}-${legality}`} title={legality}>
          <Optional data={value}>
            <Link href={`/search?legalities=${legality}_${value}`}>
              {value}
            </Link>
          </Optional>
        </Item>
      ))}
    </>
  );
}

type CardFromSetProps = { set: TSet; cardName: string };
async function MoreCardsFromSet({ set, cardName }: CardFromSetProps) {
  const cards = await getCards(
    new URLSearchParams(
      `sets=${set.id}&orderBy=-cardmarket&exclude_cards=${cardName}&pageSize=25`,
    ),
  );

  const SetLink = <Link href={`/search?sets=${set.id}`}>{set.name}</Link>;

  if (!cards?.data || cards.totalCount === 0) {
    return <p>No cards found from {SetLink}</p>;
  }

  return (
    <Carousel className="max-w-screen-lg mx-auto w-full">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <h2 className="text-2xl">More from {SetLink}</h2>
        <div className="flex flex-wrap gap-4 items-center justify-end">
          <CarouselPrevious className="border border-border" />
          <CarouselNext className="border border-border" />
        </div>
      </div>
      <CarouselContent className="py-4 px-2">
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

type PriceListProps = {
  market: 'Cardmarket' | 'TCGPlayer';
  url: string;
  updatedAt?: string;
  prices?: TCGPlayer['prices'] | CardMarket['prices'];
};

function PristListItem({ market, url, prices, updatedAt }: PriceListProps) {
  const priceEntries = prices ? Object.entries(prices) : null;
  if (!priceEntries?.length) return null;

  return (
    <li className="flex flex-col gap-2">
      <h3 className="flex flex-wrap items-center justify-between gap-3 border-b-foreground/10 border-b">
        <Link
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`go to ${market}`}
          href={url}
          variant="link"
          className="capitalize py-1"
        >
          Buy From {market}
        </Link>
        {updatedAt && <span className="text-xs">as of - {updatedAt}</span>}
      </h3>
      <ul className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
        {priceEntries.map(([type, value]) => (
          <PriceItem
            key={type}
            type={type}
            value={value}
            euros={market === 'Cardmarket'}
          />
        ))}
      </ul>
    </li>
  );
}

type PriceItemProps = {
  euros?: boolean;
  type: string;
  value: TCGPlayer['prices'] | CardMarket['prices'];
  maxTraverse?: number;
};

function PriceItem({ type, value, euros, maxTraverse = 5 }: PriceItemProps) {
  if (!value || maxTraverse === 0) {
    return null;
  }

  // Recursively go through price object until a number is found
  if (typeof value !== 'number') {
    type = type.replace(/([A-Z])/g, ' $1');
    type = type.replace(
      /(avg1|avg7|avg30)/gi,
      (match) => `${match.slice(3)} Day Average`,
    );

    return (
      <li className="flex flex-col gap-2 col-span-full">
        <span className="text-xs font-semibold tracking-wider text-foreground/75 bg-border border border-foreground/5 rounded-sm p-1 uppercase">
          {type}
        </span>
        <ul className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
          {Object.entries(value).map(([type, value]) => (
            <PriceItem
              maxTraverse={maxTraverse - 1}
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

  const price = getPrice(euros ? 'EUR' : 'USD', value);

  type = type.replace(/([A-Z])/g, ' $1');
  type = type.replace(
    /(avg1|avg7|avg30)/gi,
    (match) => `${match.slice(3)} Day Average`,
  );

  let color = 'hsl(0 30% 60%)';

  switch (type) {
    case 'low':
      color = 'hsl(110 50% 70%)';
      break;
    case 'mid':
      color = 'hsl(210 70% 60%)';
      break;
    case 'high':
      color = 'hsl(0 100% 60%)';
      break;
    case 'market':
      color = 'hsl(50 70% 50%)';
  }

  return (
    <li className="flex flex-col gap-2 text-balance">
      <span className="uppercase  text-xs tracking-wider">{type}</span>
      <span style={{ color }} className="mt-auto">
        {price}
      </span>
    </li>
  );
}
