'use client';
import * as React from 'react';

import { useSearchParams } from 'next/navigation';
import type { TSet } from '@/types/tcg';
import {
  DEFAULT_HP,
  QUERY_PARAMS,
  QueryParams,
  getNumberFromRange,
} from '@/lib/tcg';

export type State = Record<Exclude<StateKeys, 'hp'>, StateValues> & {
  hp: number[];
};

export type StateKeys = Exclude<QueryParams | 'orderBy', 'series'>;
export type StateKeysWithoutHP = Exclude<StateKeys, 'hp'>;

export type StateValues = Array<{
  id: string;
  name: string;
  excluded: boolean;
}>;

const initial: State = {
  orderBy: [],
  hp: [10, 400],
  pokedex: [],
  traits: [],
  abilities: [],
  marks: [],
  cards: [],
  artists: [],
  rarities: [],
  supertypes: [],
  subtypes: [],
  attacks: [],
  sets: [],
  types: [],
  legalities: [],
};

function reducer(state: State, action: FormAction): State {
  if (action.key && state[action.key] === undefined) {
    throw new Error(`Invalid key: ${action.key}`);
  }

  switch (action.type) {
    default:
      throw new Error(`Action not supported`);
    case 'reset':
      if (!action.key) {
        return { ...initial };
      }

      return {
        ...state,
        [action.key]: initial[action.key],
      };
    case 'set':
      return {
        ...state,
        [action.key]: action.values,
      };
    case 'delete':
      return {
        ...state,
        [action.key]: state[action.key].filter((v) => v.id !== action.id),
      };
  }
}

type FormContext = {
  state: State;
  dispatch: React.Dispatch<FormAction<StateKeys>>;
};

const FormContext = React.createContext<FormContext | null>(null);

export function useForm() {
  const ctx = React.useContext(FormContext);

  if (!ctx) {
    throw new Error('useForm must be used inside FormProvider');
  }

  return ctx;
}

type FormProvider = React.PropsWithChildren<{
  sets?: TSet[] | null;
}>;

export function FormProvider({ sets, children }: FormProvider) {
  const [state, dispatch] = React.useReducer(reducer, initial);
  const searchParams = useSearchParams();

  React.useEffect(() => {
    [...QUERY_PARAMS, 'orderBy' as const].forEach((key) => {
      if (key === 'series') return;
      const values: StateValues = [];

      if (key === 'orderBy') {
        const orderBy = searchParams.get('orderBy');
        if (!orderBy) return;
        const args = orderBy.split(',');

        args.forEach((arg) => {
          const excluded = arg.startsWith('-');
          const id = excluded ? arg.substring(1) : arg;
          const name = excluded ? arg.substring(1) : arg;
          values.push({ excluded, name, id });
        });

        dispatch({
          type: 'set',
          key: 'orderBy',
          values,
        });
        return;
      }

      if (key === 'hp') {
        const hp = searchParams.get('hp');
        if (!hp) return;
        const range = hp.split('-');

        let low = getNumberFromRange({
          value: range?.[0],
          min: DEFAULT_HP[0],
          max: DEFAULT_HP[1],
          fallback: DEFAULT_HP[0],
        });

        let high = getNumberFromRange({
          value: range?.[1],
          min: DEFAULT_HP[0],
          max: DEFAULT_HP[1],
          fallback: DEFAULT_HP[1],
        });

        (low = Math.min(low, high)), (high = Math.max(low, high));

        dispatch({
          type: 'set',
          key: 'hp',
          values: [low, high],
        });
        return;
      }

      const included = searchParams.get(`${key}`);
      const excluded = searchParams.get(`excluded_${key}`);

      included?.split(',').forEach((value) => {
        let name = value;

        switch (key) {
          case 'legalities':
            name = value.replace('_', ': ');
            break;
          case 'sets':
            if (sets) {
              const set = sets.find((s) => s.id === value);
              name = set ? set.name : name;
            }
            break;
        }
        values.push({
          id: value,
          excluded: false,
          name,
        });
      });
      excluded?.split(',').forEach((value) => {
        let name = value;

        switch (key) {
          case 'legalities':
            name = value.replace('_', ': ');
            break;
          case 'sets':
            if (sets) {
              const set = sets.find((s) => s.id === value);
              name = set ? set.name : name;
            }
            break;
        }

        values.push({
          id: value,
          excluded: true,
          name,
        });
      });

      dispatch({ type: 'set', key, values });
    });
  }, [searchParams, sets]);

  return (
    <FormContext.Provider value={{ state, dispatch }}>
      {children}
    </FormContext.Provider>
  );
}

type FormAction<T extends StateKeys = StateKeys> =
  | SetAction<T>
  | DeleteAction
  | ResetAction;

type SetAction<T extends StateKeys> = {
  type: 'set';
  key: T;
  values: T extends 'exclude'
    ? boolean
    : T extends 'hp'
      ? number[]
      : StateValues;
};

type DeleteAction = {
  type: 'delete';
  key: Exclude<StateKeys, 'hp'>;
  id: string;
};

type ResetAction = {
  type: 'reset';
  key?: StateKeys | null;
};
