import Link from '@link/styled';

type PriceListProps = {
  market: 'Cardmarket' | 'TCGPlayer';
  url: string;
  updatedAt?: string;
  prices?: { [key: string]: number };
};
type PriceItemProps = {
  euros?: boolean;
  type: string;
  value: { [key: string]: number } | number;
};

export default function PriceList({ market, url, prices, updatedAt }: PriceListProps) {
  const priceEntries = prices ? Object.entries(prices) : null;
  if (!priceEntries || !priceEntries.length) return null;

  return (
    <div className="flex flex-col gap-2">
      <h3 className="flex flex-col">
        <Link
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`go to ${market}`}
          href={url}
          className="text-xl capitalize w-max break-words"
        >
          Buy From {market}
        </Link>
        {updatedAt && <span className="text-sm font-bold">Updated @ {updatedAt}</span>}
      </h3>
      <ul className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
        {priceEntries.map(([type, value]) => (
          <PriceItem key={type} type={type} value={value} euros={market === 'Cardmarket'} />
        ))}
      </ul>
    </div>
  );
}

function PriceItem({ type, value, euros }: PriceItemProps) {
  if (!value) return null;
  if (typeof value !== 'number') {
    return (
      <>
        {Object.entries(value).map(([type, value]) => (
          <PriceItem key={type} type={type} value={value} euros={euros} />
        ))}
      </>
    );
  }

  const price = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: euros ? 'EUR' : 'USD',
    maximumFractionDigits: 2
  }).format(value);

  type = type.replace(/([A-Z])/g, ' $1');
  type = type.replace(/(avg1|avg7|avg30)/gi, (match) => `${match.slice(3)} Day Average`);

  return (
    <li className="flex flex-col">
      <span className="uppercase text-[.8rem] tracking-wider">{type}</span>
      <span className="font-bold">{price}</span>
    </li>
  );
}
