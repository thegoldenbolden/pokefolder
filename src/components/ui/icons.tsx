import type { SVGProps } from 'react';
export type Icon = (props: SVGProps<SVGSVGElement>) => JSX.Element;

const BaseIcon: Icon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {props.children}
    </svg>
  );
};

export const Moon: Icon = (props) => {
  return (
    <BaseIcon aria-label="moon icon" {...props}>
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </BaseIcon>
  );
};

export const Sun: Icon = (props) => {
  return (
    <BaseIcon aria-label="sun icon" {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </BaseIcon>
  );
};

export const Search: Icon = (props) => {
  return (
    <BaseIcon aria-label="search icon" {...props}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </BaseIcon>
  );
};

export const SearchX: Icon = (props) => {
  return (
    <BaseIcon aria-label="reset search" {...props}>
      <path d="m13.5 8.5-5 5" />
      <path d="m8.5 8.5 5 5" />
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </BaseIcon>
  );
};

export const Calendar: Icon = (props) => {
  return (
    <BaseIcon aria-label="calendar icon" {...props}>
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </BaseIcon>
  );
};

export const X: Icon = (props) => {
  return (
    <BaseIcon aria-label="x icon" {...props}>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </BaseIcon>
  );
};

export const Filter: Icon = (props) => {
  return (
    <BaseIcon aria-label="filter icon" {...props}>
      <line x1="21" x2="14" y1="4" y2="4" />
      <line x1="10" x2="3" y1="4" y2="4" />
      <line x1="21" x2="12" y1="12" y2="12" />
      <line x1="8" x2="3" y1="12" y2="12" />
      <line x1="21" x2="16" y1="20" y2="20" />
      <line x1="12" x2="3" y1="20" y2="20" />
      <line x1="14" x2="14" y1="2" y2="6" />
      <line x1="8" x2="8" y1="10" y2="14" />
      <line x1="16" x2="16" y1="18" y2="22" />
    </BaseIcon>
  );
};

export const ChevronUp: Icon = (props) => {
  return (
    <BaseIcon aria-label="chevron up icon" {...props}>
      <path d="m18 15-6-6-6 6" />
    </BaseIcon>
  );
};

export const ChevronDown: Icon = (props) => {
  return (
    <BaseIcon aria-label="chevron down icon" {...props}>
      <path d="m6 9 6 6 6-6" />
    </BaseIcon>
  );
};

export const ChevronUpDown: Icon = (props) => {
  return (
    <BaseIcon aria-label="chevron up down icon" {...props}>
      <path d="m7 15 5 5 5-5" />
      <path d="m7 9 5-5 5 5" />
    </BaseIcon>
  );
};

export const Check: Icon = (props) => {
  return (
    <BaseIcon aria-label="check icon" {...props}>
      <polyline points="20 6 9 17 4 12" />
    </BaseIcon>
  );
};

export const Gem: Icon = (props) => {
  return (
    <BaseIcon aria-label="gem icon" {...props}>
      <path d="M6 3h12l4 6-10 13L2 9Z" />
      <path d="M11 3 8 9l4 13 4-13-3-6" />
      <path d="M2 9h20" />
    </BaseIcon>
  );
};

export const Clock: Icon = (props) => {
  return (
    <BaseIcon aria-label="clock icon" {...props}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </BaseIcon>
  );
};

export const ArrowRightLong: Icon = (props) => {
  return (
    <BaseIcon aria-label="arrow right" {...props}>
      <path d="M18 8L22 12L18 16" />
      <path d="M2 12H22" />
    </BaseIcon>
  );
};

export const Ban: Icon = (props) => {
  return (
    <BaseIcon aria-label="ban icon" {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="m4.9 4.9 14.2 14.2" />
    </BaseIcon>
  );
};

export const ChevronRight: Icon = (props) => {
  return (
    <BaseIcon aria-label="chevron right icon" {...props}>
      <path d="m9 18 6-6-6-6" />
    </BaseIcon>
  );
};

export const ChevronLeft: Icon = (props) => {
  return (
    <BaseIcon aria-label="chevron left icon" {...props}>
      <path d="m15 18-6-6 6-6" />
    </BaseIcon>
  );
};

export const Table: Icon = (props) => {
  return (
    <BaseIcon aria-label="table icon" {...props}>
      <path d="M12 3v18" />
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M3 9h18" />
      <path d="M3 15h18" />
    </BaseIcon>
  );
};

export const Grid: Icon = (props) => {
  return (
    <BaseIcon aria-label="grid icon" {...props}>
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
    </BaseIcon>
  );
};

export const Minus: Icon = (props) => {
  return (
    <BaseIcon aria-label="minus icon" {...props}>
      <path d="M5 12h14" />
    </BaseIcon>
  );
};
