type Replace<T> = { from: T; to: T };
type Config = {
  case: 'lowercase' | 'uppercase' | 'capitalize';
  'lv.': Replace<'lv.' | 'lv-'>;
  '&': Replace<'&' | 'and'>;
  "'s": Replace<"'s" | 's'>;
  space: Replace<' ' | '-'>;
  exceptions: string[];
};

export default function format(text: string, config: Partial<Config>) {
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

export function formatSetName(name: string, config?: Partial<Config>) {
  return format(name, {
    case: 'lowercase',
    '&': { from: '&', to: 'and' },
    "'s": { from: "'s", to: 's' },
    ...config,
  });
}

export function createSearchParams(key: string, name: string | undefined) {
  const params = new URLSearchParams();
  name && params.set(key, name);
  return params;
}
