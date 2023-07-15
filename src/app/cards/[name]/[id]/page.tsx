import type { TCardFull, TSet } from '@/types/tcg';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { cn, getAbilityUrl, getAttackUrl, getTraitUrl } from '@/lib/utils';
import PriceList from '@/components/card/prices';
import { Optional, SearchLink, TypesImage } from '@/components/card/typings';
import Spinner from '@/ui/spinner';
import { Link } from '@/ui/link';
import Image from '@/ui/image';
import Card from '@/components/card/link';
import { getCards, getCard } from '@/lib/fetch';
import type { Metadata } from 'next';
import { keywords } from '@/lib/tcg';

type CardParams = { params: { id: string } };

export async function generateMetadata({
  params,
}: CardParams): Promise<Metadata> {
  const response = await getCard(params.id);
  if (!response?.data) return { title: 'Not Found' };
  const card = response.data;
  const series = card.set.series ? `${card.set.series}: ` : '' + card.set.name;

  return {
    title: { absolute: `${card.name} - ${card.set.name}` },
    description: `Get information about ${card.name} from ${series}.`,
    keywords: [card.name, series, ...keywords],
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
    <main className="my-6 md:my-10 flex flex-col gap-2">
      <div className="flex flex-col sm:relative gap-4 sm:flex-row">
        <Image
          className="sm:sticky sm:top-6 h-max self-center sm:self-start"
          height={450}
          width={300}
          alt={card.name ?? 'a pokemon card'}
          src={card.images.large || card.images.small || './back.png'}
        />
        <section className="grow flex flex-col gap-2 divide-y divide-spotlight">
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
              <Item title="Artists">
                <Optional data={card.artist}>
                  <div className="flex flex-wrap gap-2 items-center">
                    {card.artist.split('+').map((name) => {
                      return (
                        <SearchLink q="artists" value={name} key={name}>
                          {name}
                        </SearchLink>
                      );
                    })}
                  </div>
                </Optional>
              </Item>
              <Item title="Rarity">
                <Optional data={card.rarity}>
                  <SearchLink q="rarities" value={card.rarity}>
                    {card.rarity}
                  </SearchLink>
                </Optional>
              </Item>
              <Item title="Subtypes">
                <Optional data={card.subtypes}>
                  {card.subtypes.map((subtype) => (
                    <SearchLink key={subtype} q="subtypes" value={subtype}>
                      {subtype}
                    </SearchLink>
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
                  <SearchLink q="cards" value={card.evolvesFrom!}>
                    {card.evolvesFrom}
                  </SearchLink>
                </Optional>
              </Item>
              <Item title="Evolves To">
                <Optional data={card.evolvesTo}>
                  {card.evolvesTo.map((val) => (
                    <SearchLink key={`evolvesTo-${val}`} q="cards" value={val}>
                      {val}
                    </SearchLink>
                  ))}
                </Optional>
              </Item>
              <Item title="Regulation Mark">
                <Optional data={card.regulationMark}>
                  <SearchLink q="marks" value={card.regulationMark}>
                    {card.regulationMark}
                  </SearchLink>
                </Optional>
              </Item>
              <Item title="National Pokedex">
                <Optional data={card.nationalPokedexNumbers}>
                  {card.nationalPokedexNumbers.join(', ')}
                </Optional>
              </Item>
              <Item title="HP">
                <Optional data={card.hp}>
                  <SearchLink q="hp_low" value={card.hp}>
                    {card.hp}
                  </SearchLink>
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
          {(card.cardmarket?.prices || card.tcgplayer?.prices) && (
            <Section heading="Prices" className="flex flex-col gap-4">
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
            </Section>
          )}
          {card.ancientTrait?.name && card.ancientTrait?.text && (
            <Section heading="Ancient Trait">
              <h3 className="font-bold">
                <Link href={getTraitUrl(card.ancientTrait)}>
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
                  return (
                    <li key={ability.name}>
                      <h3 className="flex gap-2 flex-wrap font-bold">
                        <span className="px-2 py-0.5 text-sm rounded-sm bg-foreground text-background">
                          {ability.type}
                        </span>
                        <Link href={getAbilityUrl(ability)}>
                          {ability.name}
                        </Link>
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
                return (
                  <div key={name} className="space-y-2">
                    <h3 className="flex gap-2 flex-wrap font-bold">
                      <div className="flex gap-2 items-center flex-wrap">
                        <TypeIcon
                          types={cost.map((type) => ({ type }))}
                          id="attacks"
                        />
                        <Link href={getAttackUrl(name)}>{name}</Link>
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
          <SetInfo set={card.set} />
        </section>
      </div>
      <div className="flex justify-center items-center min-h-[320px]">
        <Suspense fallback={<Spinner />}>
          <MoreCardsFromSet set={card.set} cardName={card.name} />
        </Suspense>
      </div>
    </main>
  );
}

type SectionProps = React.PropsWithChildren<{
  heading: React.ReactNode;
  className?: string;
}>;
function Section({ heading, children, className }: SectionProps) {
  return (
    <section className="flex flex-col gap-2 py-3">
      <h2 className="flex gap-2 text-2xl flex-wrap font-bold">{heading}</h2>
      <div className={cn('px-2', className)}>{children ?? 'N/A'}</div>
    </section>
  );
}

function Item(props: React.PropsWithChildren<{ title: string }>) {
  return (
    <li className="flex flex-col gap-px">
      <span className="capitalize font-bold">{props.title}</span>
      <div className="flex flex-wrap gap-2 items-center">{props.children}</div>
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
              className="object-contain"
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
  if (!props.legalities) return null;
  const legalities = Object.entries(props.legalities);
  if (!legalities.length) return null;
  return (
    <>
      {legalities.map(([legality, value]) => (
        <Item key={`${props.name ?? 'card'}-${legality}`} title={legality}>
          <Optional data={value}>
            <SearchLink q="legalities" value={`${legality}_${value}`}>
              {value}
            </SearchLink>
          </Optional>
        </Item>
      ))}
    </>
  );
}

function SetInfo({ set }: { set?: TCardFull['set'] }) {
  if (!set) return null;
  return (
    <Section
      heading={`${set.series}: ${set.name}`}
      className="flex flex-col sm:flex-row gap-2"
    >
      <span className="mx-auto">
        <Image
          className="object-contain h-[128px]"
          src={set.images.logo}
          width={256}
          height={128}
          alt={`${set.name} logo`}
        />
      </span>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        <Item title="Series">{set.series}</Item>
        <Item title="Set">
          <div key={set.id} className="flex gap-2 items-center">
            <Image
              src={set.images.symbol}
              alt={`${set.name} symbol`}
              height={24}
              width={24}
              className="object-contain w-6 h-6"
            />
            <Link
              variant="underline"
              aria-label={`search cards in ${set.name}`}
              href={`/search?sets=${set.id}`}
            >
              {set.name}
            </Link>
          </div>
        </Item>
        <Item title="PTCGO Code">
          <Optional data={set.ptcgoCode}>{set.ptcgoCode}</Optional>
        </Item>
        <Item title="Printed Total">
          {`${set.printedTotal} / ${set.total}`}
        </Item>
        <Item title="Release Date">{set.releaseDate}</Item>
        <Item title="Updated At">{set.updatedAt}</Item>
        <Legalities name="sets" legalities={set.legalities} />
      </ul>
    </Section>
  );
}

type CardFromSetProps = { set: TSet; cardName: string };
async function MoreCardsFromSet({ set, cardName }: CardFromSetProps) {
  const cards = await getCards(
    new URLSearchParams(
      `sets=${set.id}&orderBy=-cardmarket&exclude_cards=${cardName}&pageSize=5`,
    ),
  );

  const SetLink = (
    <SearchLink q="sets" value={set.id}>
      {set.name}
    </SearchLink>
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
