import type { TCardFull, TSet, TCard } from '@tcg';
import { notFound } from 'next/navigation';
import { Fragment, Suspense } from 'react';

import format, { createSearchParams, formatSetName } from '@lib/format';
import { init } from '@lib/server-only';
import { API_URL } from '@lib/config';
import getData from '@lib/get-data';
import PriceList from '@card/prices';
import CardType from '@card/type';
import Spinner from '@ui/spinner';
import Link from '@link/styled';
import Image from '@ui/image';
import Card from '@card/link';

async function getCard(id: string): Promise<{ data: TCardFull } | null> {
  try {
    const response = await fetch(`${API_URL}/cards/${id}`, init);
    if (!response.ok) throw new Error('Failed to fetch');
    return response.json();
  } catch (error) {
    console.error(`Failed to fetch card with id ${id}`, error);
    return null;
  }
}

type CardParams = { params: { id: string } };

export const revalidate = 86400;

export async function generateMetadata({ params }: CardParams) {
  const response = await getCard(params.id);
  if (!response?.data) return { title: 'Card Not Found' };
  const card = response.data;
  const series = card.set.series ? `${card.set.series}: ` : '' + card.set.name;
  return {
    title: `${card.name} | ${card.set.name}`,
    description: `Get information about ${card.name} from ${series}.`,
    keywords: `${card.name}, ${card.set.name}, ${card.set.series}, pokemon, trading card game, tcg`,
  };
}

export default async function Page({ params }: CardParams) {
  const response = await getCard(params.id);
  const card = response?.data;
  if (!card) {
    notFound();
  }

  card.types ||= [];
  card.subtypes ||= [];
  card.evolvesTo ||= [];
  card.retreatCost ||= [];
  card.weaknesses ||= [];
  card.resistances ||= [];
  card.nationalPokedexNumbers ||= [];

  const weaknesses = <Type title="weakness" types={card.weaknesses} />;
  const resistances = <Type title="resistance" types={card.resistances} />;
  const types = (
    <Type title="type" types={card.types.map((t) => ({ type: t }))} />
  );
  const retreatCost = (
    <Type title="cost" types={card.retreatCost.map((t) => ({ type: t }))} />
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:relative gap-4 sm:flex-row">
        <Image
          className="sm:sticky sm:top-6 h-max self-center sm:self-start"
          height={450}
          width={300}
          alt={card.name ?? 'a pokemon card'}
          src={card.images.large || card.images.small || './back.png'}
        />
        <section className="grow flex flex-col gap-2 divide-y divide-tw-secondary">
          <header className="font-bold flex-col gap-2">
            <h1 className="text-3xl">
              {card.name}&nbsp;
              {card.level && (
                <span className="text-sm uppercase">lv. {card.level}</span>
              )}
            </h1>
            <span className="block">{card.supertype}</span>
            {card.flavorText && (
              <p className="italic text-sm font-normal">{card.flavorText}</p>
            )}
          </header>
          <Section heading="General">
            <ul className="grid gap-2 grid-cols-fluid-sm">
              <Artists artist={card.artist} />
              <Item
                as="a"
                name="rarities"
                title="Rarity"
                content={[card.rarity]}
              />
              <Item
                as="a"
                name="subtypes"
                title="Subtypes"
                content={card.subtypes}
              />
              <Item title="Types" content={[types]} />
              <Item title="Weaknesses" content={[weaknesses]} />
              <Item title="Resistances" content={[resistances]} />
              <Item title="Retreat Cost" content={[retreatCost]} />
              <Item
                as="a"
                name="cards"
                title="Evolves From"
                content={[card.evolvesFrom]}
              />
              <Item
                as="a"
                name="cards"
                title="Evolves To"
                content={card.evolvesTo}
              />
              <Item
                as="a"
                name="marks"
                title="Regulation Mark"
                content={[card.regulationMark]}
              />
              <Item
                title="National Pokedex"
                content={[card.nationalPokedexNumbers.join(', ')]}
              />
              <Item as="a" title="HP" name="hp" content={[card.hp]} />
              <Item
                title="Number"
                content={[`${card.number} / ${card.set.printedTotal}`]}
              />
              <Legalities as="a" legalities={card.legalities} />
            </ul>
          </Section>
          {(card.cardmarket?.prices || card.tcgplayer?.prices) && (
            <Section heading="Prices">
              <div className="flex flex-col gap-4">
                <PriceList
                  market="TCGPlayer"
                  prices={card.tcgplayer?.prices}
                  url={card.tcgplayer?.url ?? ''}
                  updatedAt={card.tcgplayer?.updatedAt}
                />
                <PriceList
                  market="Cardmarket"
                  prices={card.cardmarket?.prices}
                  url={card.cardmarket?.url ?? ''}
                  updatedAt={card.cardmarket?.updatedAt}
                />
              </div>
            </Section>
          )}
          {card.ancientTrait?.name && card.ancientTrait?.text && (
            <Section heading="Ancient Trait">
              <h3 className="font-bold">
                <Link
                  href={`/search?${createSearchParams(
                    'ancient_trait',
                    card.ancientTrait.name,
                  )}`}
                >
                  {card.ancientTrait.name}
                </Link>
              </h3>
              <p className="px-2">• {card.ancientTrait.text}</p>
            </Section>
          )}
          {!card.abilities?.length ? null : (
            <Section heading="Abilities">
              <ul className="space-y-2">
                {card.abilities.map((ability) => {
                  const params = createSearchParams('abilities', ability.name);
                  return (
                    <li key={ability.name}>
                      <h3 className="flex gap-2 flex-wrap font-bold">
                        <span className="px-6 py-px text-tw-black rounded-md bg-tw-primary">
                          {ability.type}
                        </span>
                        <Link href={`/search?${params}`}>{ability.name}</Link>
                      </h3>
                      {ability.text && <p className="px-2">• {ability.text}</p>}
                    </li>
                  );
                })}
              </ul>
            </Section>
          )}
          {!card.attacks?.length ? null : (
            <Section heading="Attacks">
              {card.attacks.map(({ name, damage, cost, text }) => {
                const params = createSearchParams('attacks', name);
                return (
                  <div key={name} className="space-y-2">
                    <h3 className="flex gap-2 flex-wrap font-bold">
                      <div className="flex gap-2 items-center flex-wrap">
                        {cost.map((costType, i) => (
                          <span
                            key={`${name}-${costType}-${i}`}
                            className="w-max"
                          >
                            <CardType type={costType} />
                          </span>
                        ))}
                        <Link href={`/search?${params}`}>{name}</Link>
                      </div>
                      <span>{damage}</span>
                    </h3>
                    {text && <p className="px-2">• {text}</p>}
                  </div>
                );
              })}
            </Section>
          )}
          {!card.rules?.length ? null : (
            <Section heading="Rules">
              {card.rules.map((rule, i) => (
                <p key={`rules-${i}`} className="px-2">
                  • {rule}
                </p>
              ))}
            </Section>
          )}
          <CardSet set={card.set} />
        </section>
      </div>
      <div className="flex justify-center items-center min-h-[320px]">
        <Suspense fallback={<Spinner />}>
          {/** @ts-expect-error Server Component */}
          <MoreCardsFromSet set={card.set} cardId={card.id} />
        </Suspense>
      </div>
    </div>
  );
}

type SectionProps = React.PropsWithChildren & { heading: React.ReactNode };
function Section({ heading, children }: SectionProps) {
  return (
    <section className="flex flex-col gap-2 py-3">
      <h2 className="flex gap-2 text-2xl flex-wrap font-bold">{heading}</h2>
      <div className="px-2">{children ?? 'N/A'}</div>
    </section>
  );
}

type ListItemDefaultProps = { title: string; content: React.ReactNode[] };
type ListItemProps = ListItemDefaultProps &
  ({ as?: undefined } | { as: 'a'; name: string });
function Item(props: ListItemProps) {
  return (
    <li className="flex flex-col gap-px">
      <span className="capitalize font-bold">{props.title}</span>
      <div className="flex flex-wrap gap-2 items-center">
        {!props.content.length
          ? 'N/A'
          : props.content.map((content, i) => {
              if (!content)
                return <Fragment key={`${props.title}-${i}`}>N/A</Fragment>;
              if (!props.as)
                return (
                  <Fragment key={`${props.title}-${i}`}>{content}</Fragment>
                );
              const params = new URLSearchParams();
              typeof content === 'string' && params.set(props.name, content);
              return (
                <Link
                  key={`${props.title}-${i}`}
                  href={`/search?${params ?? ''}`}
                >
                  {content}
                </Link>
              );
            })}
      </div>
    </li>
  );
}

function Artists({ artist }: { artist?: string }) {
  return (
    <li className="flex flex-col gap-px">
      <span className="capitalize font-bold">Artist</span>
      <div className="flex flex-wrap gap-2 items-center">
        {!artist
          ? 'N/A'
          : artist.split('+').map((name) => {
              const params = new URLSearchParams();
              params.set('artists', name);
              return (
                <Link key={name} href={`/search?${params}`}>
                  {name}
                </Link>
              );
            })}
      </div>
    </li>
  );
}

type CardTypeProps = {
  types: { type: string; value?: string }[];
  title: string;
};
function Type({ types, title }: CardTypeProps) {
  if (!types.length) return <>N/A</>;
  return (
    <>
      {types.map(({ type, value }, i) => {
        const params = new URLSearchParams();
        params.set('types', type);
        return (
          <Link
            key={`${title}-${type}-${i}`}
            className="flex items-center flex-wrap gap-2"
            href={`/search?${params}`}
          >
            <CardType type={type} />
            {value}
          </Link>
        );
      })}
    </>
  );
}

type LegalityProps = {
  as?: 'a';
  legalities: TCardFull['legalities'];
  name?: 'sets' | 'card';
};
function Legalities(props: LegalityProps) {
  if (!props.legalities) return null;
  const legalities = Object.entries(props.legalities);
  if (!legalities.length) return null;
  return (
    <>
      {legalities.map(([legality, value]) => (
        <Item
          key={`${props.name ?? 'card'}-${legality}`}
          title={legality}
          content={[value]}
          as={props.as}
          name={`legalities_${legality}`}
        />
      ))}
    </>
  );
}

function CardSet({ set }: { set?: TCardFull['set'] }) {
  if (!set) return null;
  return (
    <Section heading={`${set.series}: ${set.name}`}>
      <div className="flex flex-wrap justify-center sm:justify-start gap-2">
        <Image
          className="object-contain h-[128px] my-auto"
          src={set.images.logo}
          width={256}
          height={128}
          alt={`${set.name} logo`}
        />
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          <Item as="a" name="series" title="Series" content={[set.series]} />
          <Item
            title="Set"
            content={[
              <div key={set.id} className="flex gap-2 items-center">
                <Image
                  src={set.images.symbol}
                  alt={`${set.name} symbol`}
                  height={24}
                  width={24}
                  className="w-[24px] h-[24px]"
                />
                <Link
                  aria-label={`go to set ${set.name}`}
                  href={`/sets/${format(set.name, {
                    case: 'lowercase',
                    '&': { from: '&', to: 'and' },
                  })}/${set.id}`}
                >
                  {set.name}
                </Link>
              </div>,
            ]}
          />
          <Item title="PTCGO Code" content={[set.ptcgoCode]} />
          <Item
            title="Printed Total"
            content={[`${set.printedTotal} / ${set.total}`]}
          />
          <Item title="Release Date" content={[set.releaseDate]} />
          <Item title="Updated At" content={[set.updatedAt]} />
          <Legalities name="sets" legalities={set.legalities} />
        </ul>
      </div>
    </Section>
  );
}

type CardFromSetProps = { set: TSet; cardId: string };
async function MoreCardsFromSet({ set, cardId }: CardFromSetProps) {
  const cards = await getData<TCard>('cards', null, {
    page: '1',
    pageSize: '5',
    q: [`set.id:${set.id} -id:${cardId}`],
    select: ['id', 'images', 'name', 'cardmarket.prices', 'set'],
    orderBy: ['-cardmarket.prices.trendPrice'],
  });

  const SetLink = (
    <Link
      aria-label={`go to set ${set.name}`}
      href={`/sets/${formatSetName(set.name)}/${set.id}`}
    >
      {set.name}
    </Link>
  );

  if (!cards?.data || cards.totalCount === 0) {
    return <p>No cards found from {SetLink}</p>;
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <h2 className="text-2xl flex flex-wrap gap-2">
        More Cards From {SetLink}
      </h2>
      <div className="grid gap-4 grid-cols-fluid-sm items-center justify-center">
        {cards.data.map((card) => (
          <Card key={card.id} {...card} />
        ))}
      </div>
    </div>
  );
}
