import type { TCard, TCardFull } from '@/types/tcg';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export { type VariantProps, cva } from 'class-variance-authority';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getURL = (pathname: `/${string}` = '/') => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ??
    process?.env?.NEXT_PUBLIC_VERCEL_URL ??
    'http://localhost:3000';
  url = url.includes('http') ? url : `https://${url}`;
  return url + pathname;
};

type Replace<T> = { from: T; to: T };
type Config = {
  case: 'lowercase' | 'uppercase' | 'capitalize';
  'lv.': Replace<'lv.' | 'lv-'>;
  '&': Replace<'&' | 'and'>;
  "'s": Replace<"'s" | 's'>;
  space: Replace<' ' | '-'>;
  exceptions: string[];
};

function format(text: string, config: Partial<Config>) {
  config.exceptions ||= [];
  if (config.exceptions.includes(text)) return text;

  text = decodeURIComponent(text);
  const matches = text.match(/[a-zA-Z0-9é'&]+/gi) || [];
  text = matches.length ? matches.join('-') : text;

  Object.values(config).forEach((value) => {
    if (Array.isArray(value)) return;
    if (typeof value === 'string') {
      switch (value) {
        case 'capitalize':
          text = text
            .split(' ')
            .map((t) => t[0].toUpperCase() + t.substring(1))
            .join(' ');
          break;
        case 'lowercase':
          text = text.toLowerCase();
          break;
        case 'uppercase':
          text = text.toUpperCase();
      }
      return;
    }
    text = text.replaceAll(value.from, value.to);
  });

  return text;
}

export function createSearchParams(key: string, name: string | undefined) {
  const params = new URLSearchParams();
  name && params.set(key, name);
  return params;
}

export function getCardUrl(card: TCard) {
  const name = format(card.name, {
    case: 'lowercase',
    '&': { from: '&', to: 'and' },
    "'s": { from: "'s", to: 's' },
    'lv.': { from: 'lv.', to: 'lv-' },
  });
  return `/cards/${name}/${card.id}`;
}

export function getTraitUrl(trait: NonNullable<TCardFull['ancientTrait']>) {
  return `/search?${createSearchParams('trait', trait.name)}`;
}

export function getAbilityUrl(
  ability: NonNullable<TCardFull['abilities']>[number],
) {
  return `/search?${createSearchParams('abilities', ability.name)}`;
}

export function getAttackUrl(name: string) {
  return `/search?${createSearchParams('attacks', name)}`;
}

export function getPrice(currency: 'EUR' | 'USD', value?: number | null) {
  if (typeof value !== 'number') return '--';
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(value);
}
