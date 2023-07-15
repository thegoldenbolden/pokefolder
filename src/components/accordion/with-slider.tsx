'use client';
import type { SliderProps } from '@/ui/slider';
import { Button } from '@/ui/button';
import dynamic from 'next/dynamic';
import { X } from '@/ui/icons';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/ui/accordion';
import {
  type FormKeys,
  useFormContext,
  useDispatchContext,
} from '@/context/search';

const MultiSlider = dynamic(() =>
  import('@/ui/slider').then((mod) => mod.MultiSlider),
);

type Props = React.PropsWithChildren<{
  heading: string;
  field: Extract<FormKeys, 'hp'>;
  slider: SliderProps;
}>;

const AccordionWithSlider = ({ heading, field, slider }: Props) => {
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
            <span className="text-sm">{`(${form[field].join(' - ')})`}</span>
          </span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-3 h-full">
        <div className="flex flex-col gap-1 py-1.5">
          <MultiSlider
            className="py-1.5"
            {...slider}
            minStepsBetweenThumbs={1}
            onValueChange={(value) =>
              dispatch({ type: 'set', key: field, value })
            }
            value={form[field]}
          />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default AccordionWithSlider;
