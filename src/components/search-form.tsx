import FormSheet from './form-sheet';

import {
  SetsAccordion,
  RaritiesAccordion,
  SubtypesAccordion,
  SupertypesAccordion,
  TypesAccordion,
  PokedexAccordion,
  LegalitiesAccordion,
  MarksAccordion,
  SortAccordion,
} from '@/components/accordion/search';
import TextAccordion from '@/components/accordion/with-input';
import SliderAccordion from '@/components/accordion/with-slider';
import { DEFAULT_HP } from '@/lib/tcg';
import { Suspense } from 'react';

export default function SearchForm() {
  return (
    <FormSheet>
      <SortAccordion />
      <TextAccordion
        input={{ id: 'cards', placeholder: 'Type a card' }}
        heading="Name"
        field="cards"
      />
      <TextAccordion
        input={{ id: 'artists', placeholder: 'Type an artist' }}
        heading="Artists"
        field="artists"
      />
      <TextAccordion
        input={{ id: 'abilities', placeholder: 'Type an ability' }}
        heading="Abilities"
        field="abilities"
      />
      <TextAccordion
        input={{ id: 'traits', placeholder: 'Type an ancient trait' }}
        heading="Ancient Traits"
        field="traits"
      />
      <TextAccordion
        input={{ id: 'attacks', placeholder: 'Type an attack' }}
        heading="Attacks"
        field="attacks"
      />
      <Suspense fallback={<span>Loading..</span>}>
        <SetsAccordion />
        <RaritiesAccordion />
        <SubtypesAccordion />
        <SupertypesAccordion />
        <TypesAccordion />
      </Suspense>
      <PokedexAccordion />
      <LegalitiesAccordion />
      <MarksAccordion />
      <SliderAccordion
        field="hp"
        heading="HP"
        slider={{
          step: 10,
          max: DEFAULT_HP[1],
          min: DEFAULT_HP[0],
          minStepsBetweenThumbs: 1,
          defaultValue: DEFAULT_HP,
        }}
      />
    </FormSheet>
  );
}
