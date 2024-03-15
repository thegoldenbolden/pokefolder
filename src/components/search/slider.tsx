"use client";
import { Label } from "@/components/ui/label";
import type { SliderProps } from "@/components/ui/slider";
import { MultiSlider } from "@/components/ui/slider";
import { useForm, type FormField } from "@/hooks/use-form";

type Props = SliderProps & {
  id: Extract<FormField, "hp">;
  name: string;
};

export function Slider({ name, id, ...props }: Props) {
  const { state, dispatch } = useForm();

  return (
    <div className="flex flex-col gap-4 px-3 py-6">
      <div className="flex flex-col items-start justify-between gap-1 text-start">
        <Label htmlFor={id}>{name}</Label>
        <span className="text-xs italic">{`${state.hp[0]} - ${state.hp[1]}`}</span>
      </div>
      <MultiSlider
        id={id}
        {...props}
        defaultValue={state.hp}
        minStepsBetweenThumbs={1}
        onValueChange={(values) => dispatch({ type: "set", key: "hp", values })}
        value={state[id]}
      />
    </div>
  );
}
