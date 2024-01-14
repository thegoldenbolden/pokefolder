import type { Metadata, ResolvingMetadata } from 'next';
import { Accordion } from '@/components/ui/accordion';
import { AccordionWithCombobox } from '@/components/accordion/with-combobox';
import { AccordionWithInput } from '@/components/accordion/with-input';
import { AccordionWithSlider } from '@/components/accordion/with-slider';
import { PageControls } from '@/components/gallery/page-controls';
import { getSets, getTypes, regionsToHPTable } from '@/lib/fetch';
import { ViewAs } from '@/components/gallery/view-as';
import { FormSheet } from '@/components/form';
import { Gallery } from '@/components/gallery';
import { DEFAULT_HP } from '@/lib/tcg';
import Loading from '../loading';
import { Suspense } from 'react';
import { FormProvider } from '@/hooks/use-form';

export async function generateMetadata(
  _,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const keywords = (await parent)?.keywords || [];

  return {
    alternates: { canonical: '/' },
    description:
      'Discover and find your favorite Pokemon cards with ease. Our powerful search feature allows you to quickly locate specific cards, explore rarities, and build your perfect deck. Unleash your strategic skills in the Pokemon TCG and dominate the competition',
    keywords: [
      'Pokemon card search',
      'Card lookup',
      'Card finder',
      'Card database',
      'Pokemon TCG search',
      'Find Pokemon cards',
      'Search for cards',
      'Card collection search',
      'Pokemon card inventory',
      'Card catalog',
      'Card exploration',
      'Pokemon card database',
      'Trading card search',
      'Card rarity search',
      'Card details lookup',
      ...keywords,
    ],
  };
}

export default async function Page() {
  return (
    <main className="grid grid-cols-1 lg:has-[div]:data-[loading=true]:grid-cols-[max-content_1fr] has-[aside]:grid-cols-[max-content_1fr] gap-1 lg:gap-4 py-16">
      <Suspense
        fallback={
          <Loading className="lg:grow-0 lg:w-[256px] lg:rounded-sm lg:max-h-svh lg:overflow-y-hidden lg:bg-foreground/5 lg:border lg:border-border lg:sticky lg:top-6 lg:self-start static self-auto border-none max-h-max justify-self-start h-9 px-3 py-2 bg-muted text-muted-foreground" />
        }
      >
        <Form />
      </Suspense>

      <div className="flex flex-col gap-1">
        <div className="flex flex-wrap items-center justify-between gap-1">
          <ViewAs />
          <div className="ml-auto">
            <PageControls />
          </div>
        </div>
        <div className="py-4 grow">
          <Gallery />
        </div>

        <PageControls />
      </div>
    </main>
  );
}

async function Form() {
  const sets = await getSets();
  const types = await getTypes('types');
  const subtypes = await getTypes('subtypes');
  const supertypes = await getTypes('supertypes');
  const rarities = await getTypes('rarities');

  const regions = Object.entries(regionsToHPTable);
  const order = [
    { id: 'cardmarket', name: 'Cardmarket Prices' },
    { id: 'tcgplayer', name: 'TCGPlayer Prices' },
    { id: 'name', name: 'Card Name' },
    { id: 'number', name: 'Card Number' },
    { id: 'pokedex', name: 'National Pokedex' },
    { id: 'release', name: 'Release Date' },
  ];

  return (
    <FormProvider sets={sets?.data}>
      <FormSheet>
        <Accordion type="single" collapsible>
          <AccordionWithCombobox
            heading="Sort"
            placeholder="Sort by"
            stateKey="orderBy"
            data={order}
          />
          <AccordionWithInput
            input={{ id: 'cards', placeholder: 'Type a card' }}
            heading="Name"
            stateKey="cards"
          />
          <AccordionWithInput
            input={{ id: 'artists', placeholder: 'Type an artist' }}
            heading="Artists"
            stateKey="artists"
          />
          <AccordionWithInput
            input={{ id: 'abilities', placeholder: 'Type an ability' }}
            heading="Abilities"
            stateKey="abilities"
          />
          <AccordionWithInput
            input={{ id: 'traits', placeholder: 'Type an ancient trait' }}
            heading="Ancient Traits"
            stateKey="traits"
          />
          <AccordionWithInput
            input={{ id: 'attacks', placeholder: 'Type an attack' }}
            heading="Attacks"
            stateKey="attacks"
          />
          <AccordionWithCombobox
            heading="Sets"
            stateKey="sets"
            placeholder="Type a set or series name"
            data={sets?.data ?? []}
          />
          <AccordionWithCombobox
            heading="Rarities"
            stateKey="rarities"
            placeholder="Type a rarity"
            data={
              rarities?.data.map((name) => ({
                id: name.toLowerCase(),
                name,
              })) ?? []
            }
          />
          <AccordionWithCombobox
            heading="Subtypes"
            stateKey="subtypes"
            placeholder="Type a subtype"
            data={
              subtypes?.data.map((name) => ({
                id: name.toLowerCase(),
                name,
              })) ?? []
            }
          />
          <AccordionWithCombobox
            heading="Supertypes"
            stateKey="supertypes"
            placeholder="Type a supertype"
            data={
              supertypes?.data.map((name) => ({
                id: name.toLowerCase(),
                name,
              })) ?? []
            }
          />
          <AccordionWithCombobox
            heading="Types"
            stateKey="types"
            placeholder="Type a card typing"
            data={
              types?.data.map((name) => ({ id: name.toLowerCase(), name })) ??
              []
            }
          />
          <AccordionWithCombobox
            heading="National Pokedex"
            placeholder="Type a generation"
            stateKey="pokedex"
            data={regions.map(([name, id]) => ({
              id,
              name,
            }))}
          />
          <AccordionWithCombobox
            heading="Legalities"
            placeholder="Type a legality"
            stateKey="legalities"
            data={[
              { id: 'expanded_legal', name: 'Expanded: Legal' },
              { id: 'standard_legal', name: 'Standard: Legal' },
              { id: 'unlimited_legal', name: 'Unlimited: Legal' },
              { id: 'expanded_banned', name: 'Expanded: Banned' },
              { id: 'standard_banned', name: 'Standard: Banned' },
              { id: 'unlimited_banned', name: 'Unlimited: Banned' },
            ]}
          />
          <AccordionWithCombobox
            heading="Regulation Marks"
            placeholder="Type a mark"
            stateKey="marks"
            data={[
              { id: 'd', name: 'D' },
              { id: 'f', name: 'F' },
            ]}
          />
          <AccordionWithSlider
            stateKey="hp"
            heading="HP"
            slider={{
              step: 10,
              max: DEFAULT_HP[1],
              min: DEFAULT_HP[0],
              minStepsBetweenThumbs: 1,
              defaultValue: DEFAULT_HP,
            }}
          />
        </Accordion>
      </FormSheet>
    </FormProvider>
  );
}
