"use client";

import type { Expansion } from "@/lib/pokemon-tcg/constants";
import { getNumberFromRange } from "@/lib/pokemon-tcg/utils";
import { getQueryFallback } from "@/lib/utils";
import type { QueryKey } from "@/types";
import { useSearchParams } from "next/navigation";
import * as React from "react";

export type FormHPValue = number[];

export type FormValue = {
  id: string;
  name: string;
};

export type FormField = Exclude<
  QueryKey,
  "limit" | "order" | "page" | "sort" | "series" | "view"
>;

export type FormValues = {
  [P in FormField]: P extends "hp" ? FormHPValue : FormValue[];
};

const DEFAULT_FORM_VALUES: FormValues = {
  hp: getQueryFallback("hp"),
  cards: [],
  artists: [],
  abilities: [],
  traits: [],
  attacks: [],
  sets: [],
  rarities: [],
  subtypes: [],
  supertypes: [],
  types: [],
  region: [],
  legalities: [],
  marks: [],
};

const FormContext = React.createContext<{
  state: FormValues;
  dispatch: React.Dispatch<PayloadValue>;
} | null>(null);

export function useForm() {
  const context = React.use(FormContext);
  if (!context) {
    throw new Error("FormContext must be used inside <FormProvider />");
  }

  return context;
}

type FormProviderProps = React.PropsWithChildren<{
  expansions: Expansion[];
}>;

export function FormProvider({ expansions, children }: FormProviderProps) {
  const [state, dispatch] = React.useReducer(reducer, DEFAULT_FORM_VALUES);
  const params = useSearchParams();

  React.useEffect(() => {
    /**
     * Add search parameters to form
     */
    let values: Partial<FormValues> = {};
    const keys = Object.keys(DEFAULT_FORM_VALUES) as FormField[];

    keys.forEach((param) => {
      const value = params.get(param);
      if (!value) return;
      if (value.length < 1) return;

      if (param === "hp") {
        const range = value.split("-");
        const fallback = getQueryFallback("hp");

        let low = getNumberFromRange({
          value: range?.[0],
          min: fallback[0],
          max: fallback[1],
          fallback: fallback[0],
        });

        let high = getNumberFromRange({
          value: range?.[1],
          min: fallback[0],
          max: fallback[1],
          fallback: fallback[1],
        });

        (low = Math.min(low, high)), (high = Math.max(low, high));
        values.hp = [low, high];
        return;
      }

      const q = value.split(",");

      if (param === "sets") {
        values = {
          ...values,
          sets: q.map((v) => ({
            id: v,
            name: expansions.find((x) => x.id === v)?.name ?? v,
          })),
        };
        return;
      }

      values[param] = q.map((v) => ({ id: v, name: v }));
    });

    dispatch({ type: "initialize", values });
  }, [params, expansions]);

  return (
    <FormContext.Provider value={{ state, dispatch }}>
      {children}
    </FormContext.Provider>
  );
}

type PayloadValue =
  | SetAction
  | DeleteAction
  | AddAction
  | ResetAction
  | InitialAction;

type SetAction = {
  type: "set";
} & (
  | {
      key: Extract<FormField, "hp">;
      values: FormHPValue;
    }
  | {
      key: Exclude<FormField, "hp">;
      values: FormValue[];
    }
);

type DeleteAction = {
  type: "delete";
  key: Exclude<FormField, "hp">;
  id: string;
};

type AddAction = {
  type: "add";
  key: Exclude<FormField, "hp">;
  values: FormValue[];
};

type ResetAction = {
  type: "reset";
};

type InitialAction = {
  type: "initialize";
  values: Partial<Omit<FormValues, "hp">>;
};

function reducer(state: FormValues, payload: PayloadValue): FormValues {
  switch (payload.type) {
    default:
      throw new Error("Invalid payload");
    case "delete":
      return {
        ...state,
        [payload.key]: state[payload.key].filter(
          (value) => value.id !== payload.id,
        ),
      };
    case "set":
      return {
        ...state,
        [payload.key]: payload.values,
      };
    case "add":
      return {
        ...state,
        [payload.key]: [...payload.values, ...state[payload.key]],
      };
    case "reset":
      return DEFAULT_FORM_VALUES;
    case "initialize":
      return {
        ...DEFAULT_FORM_VALUES,
        ...payload.values,
      };
  }
}
