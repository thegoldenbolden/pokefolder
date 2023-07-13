'use client';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/ui/accordion';
import { Button } from '@/ui/button';
import { Combobox, type DefaultMultiComboboxValue } from '@/ui/multi-combobox';
import {
  type FormKeys,
  useFormContext,
  useDispatchContext,
} from '@/context/search';
import { X } from '@/ui/icons';
import type { TSet } from '@/types/tcg';
import Image from '@/ui/image';

type Props = React.PropsWithChildren<{
  data: any[];
  heading: string;
  field: Exclude<FormKeys, 'hp' | 'exclude'>;
  placeholder?: string;
}>;

const items: Partial<
  Record<Props['field'], (p: DefaultMultiComboboxValue) => JSX.Element>
> = {
  orderBy: (item: DefaultMultiComboboxValue & { asc: 0 | 1 }) => (
    <div className="flex flex-col">
      <span className="capitalize">{item.name}</span>
      <span className="text-xs text-ellipsis">
        {item.asc ? 'Ascending' : 'Descending'}
      </span>
    </div>
  ),
  pokedex: (item) => (
    <div className="flex flex-col">
      <span className="capitalize">{item.name}</span>
      <span className="text-xs text-ellipsis">{item.id}</span>
    </div>
  ),
  sets: (item: TSet) => (
    <>
      {item.images?.symbol && (
        <Image
          src={item.images.symbol}
          alt={`symbol for ${item.name} from the series ${item.series}`}
          height={20}
          width={20}
          className="aspect-square object-contain"
        />
      )}
      <div className="flex flex-col">
        <span>{item.name}</span>
        <span className="text-xs text-ellipsis">{item.series}</span>
      </div>
    </>
  ),
  types: (item) => (
    <>
      <Image
        src={`/types/${item.id}.png`}
        alt={`icon for ${item.name} type`}
        height={20}
        width={20}
        className="aspect-square object-contain"
      />
      <div className="flex flex-col">
        <span>{item.name}</span>
      </div>
    </>
  ),
};

export const AccordionWithCombobox = ({
  data,
  heading,
  field,
  placeholder,
}: Props) => {
  const form = useFormContext();
  const dispatch = useDispatchContext();

  return (
    <AccordionItem value={heading} className="border-border group">
      <AccordionTrigger className="px-3 gap-2 py-1 hover:no-underline group-hover:bg-spotlight/75 group-focus-within:bg-spotlight/75">
        <div className="text-lg flex w-full gap-2 items-center">
          <Button
            type="button"
            variant="ghost"
            aria-label={`reset ${heading}`}
            className="rounded-none bg-transparent p-0 hover:text-destructive focus-visible:text-destructive hover:bg-transparent"
            onClick={(e) => {
              e.stopPropagation();
              dispatch({ type: 'reset', key: field });
            }}
          >
            <X className="w-4 h-4" />
          </Button>
          <span>
            {heading}&nbsp;
            <span className="text-sm">{`(${form[field].length})`}</span>
          </span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-3 h-full">
        <Combobox
          field={field}
          placeholder={placeholder ?? `Type ${field}`}
          data={data ?? []}
          label={{ value: 'Sets', props: { className: 'sr-only' } }}
          item={
            items[field] ??
            ((i: DefaultMultiComboboxValue) => <span>{i.name}</span>)
          }
        />
      </AccordionContent>
    </AccordionItem>
  );
};
