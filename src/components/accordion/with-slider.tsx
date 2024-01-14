'use client';
import type { SliderProps } from '@/ui/slider';
import { MultiSlider } from '@/ui/slider';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/ui/accordion';
import { type StateKeys, useForm } from '@/hooks/use-form';

type Props = React.PropsWithChildren<{
  heading: string;
  stateKey: Extract<StateKeys, 'hp'>;
  slider: SliderProps;
}>;

export const AccordionWithSlider = ({ heading, stateKey, slider }: Props) => {
  const { state, dispatch } = useForm();

  return (
    <AccordionItem value={heading} className="border-border group">
      <AccordionTrigger className="px-3 gap-1 flex py-2 group-hover:bg-foreground/5 group-focus-within:bg-foreground/5">
        <div className="flex flex-col gap-1 text-start">
          <span className="text-sm uppercase tracking-wide">
            {heading}&nbsp;
          </span>
          <span className="text-xs italic">{`${state.hp[0]} - ${state.hp[1]}`}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-3 h-full">
        <label htmlFor="hp-filter" className="sr-only">
          filter by hp
        </label>
        <MultiSlider
          className="py-1.5"
          id="hp-filter"
          {...slider}
          defaultValue={state.hp}
          minStepsBetweenThumbs={1}
          onValueChange={(values) =>
            dispatch({ type: 'set', key: 'hp', values })
          }
          value={state[stateKey]}
        />
      </AccordionContent>
    </AccordionItem>
  );
};
