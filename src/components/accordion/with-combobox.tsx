'use client';
import { type DefaultMultiComboboxValue } from '@/ui/multi-combobox';
import { Image } from '@/ui/image';
import type { TSet } from '@/types/tcg';
import { Combobox } from '@/ui/multi-combobox';
import { type StateKeysWithoutHP, useForm } from '@/hooks/use-form';
import * as React from 'react';

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/ui/accordion';

type Props = React.PropsWithChildren<{
  data: any[];
  heading: string;
  placeholder?: string;
  stateKey: StateKeysWithoutHP;
}>;

const ComboboxTypes = Object.assign(
  (i: DefaultMultiComboboxValue) => {
    return <span>{i.name}</span>;
  },
  {
    orderBy: function orderBy(item: DefaultMultiComboboxValue) {
      return <div className="capitalize">{item.name}</div>;
    },
    pokedex: function pokedex(item: DefaultMultiComboboxValue) {
      return (
        <div className="flex flex-col">
          <span className="capitalize">{item.name}</span>
          <span className="text-xs text-ellipsis">{item.id}</span>
        </div>
      );
    },
    sets: function sets(item: TSet) {
      return (
        <>
          {item.images?.symbol && (
            <span className="bg-foreground p-1 rounded-sm">
              <Image
                src={item.images.symbol}
                alt={`symbol for ${item.name} from the series ${item.series}`}
                height={20}
                width={20}
                className="aspect-square object-contain"
              />
            </span>
          )}
          <div className="flex flex-col">
            <span>{item.name}</span>
            <span className="text-xs text-ellipsis">{item.series}</span>
          </div>
        </>
      );
    },
    types: function types(item: DefaultMultiComboboxValue) {
      return (
        <>
          <span className="bg-foreground p-1 rounded-sm">
            <Image
              src={`/types/${item.id}.png`}
              alt={`icon for ${item.name} type`}
              height={20}
              width={20}
              className="aspect-square object-contain"
            />
          </span>
          <div className="flex flex-col">
            <span>{item.name}</span>
          </div>
        </>
      );
    },
  },
);

export function AccordionWithCombobox({
  data,
  heading,
  stateKey,
  placeholder,
}: Props) {
  const { state } = useForm();
  if (!stateKey) return null;

  return (
    <AccordionItem value={heading} className="border-border group">
      <AccordionTrigger className="px-3 gap-1 flex py-2 group-hover:bg-foreground/5 group-focus-within:bg-foreground/5">
        <div className="flex flex-col gap-1 text-start">
          <span className="text-sm uppercase tracking-wide">
            {heading}&nbsp;
          </span>
          {state[stateKey].length <= 0 ? null : (
            <span className="text-xs italic">{`${state[stateKey].length} selected`}</span>
          )}
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="px-3 flex flex-col gap-1 w-full">
          <Combobox
            stateKey={stateKey}
            placeholder={placeholder ?? `Type ${stateKey}`}
            data={data ?? []}
            label={{ value: stateKey, props: { className: 'sr-only' } }}
            render={ComboboxTypes[stateKey] ?? ComboboxTypes}
          />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
