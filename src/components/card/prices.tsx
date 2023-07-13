import { getPrice } from '@/lib/utils';
import { CardMarket, TCGPlayer } from '@/types/tcg';
import { Link } from '@/ui/link';

type PriceListProps = {
  market: 'Cardmarket' | 'TCGPlayer';
  url: string;
  updatedAt?: string;
  prices?: TCGPlayer['prices'] | CardMarket['prices'];
};
type PriceItemProps = {
  euros?: boolean;
  type: string;
  value: TCGPlayer['prices'] | CardMarket['prices'];
};

export default function PriceList({
  market,
  url,
  prices,
  updatedAt,
}: PriceListProps) {
  const priceEntries = prices ? Object.entries(prices) : null;
  if (!priceEntries?.length) return null;

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
        {updatedAt && (
          <span className="text-sm font-bold">Updated @ {updatedAt}</span>
        )}
      </h3>
      <ul className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
        {priceEntries.map(([type, value]) => (
          <PriceItem
            key={type}
            type={type}
            value={value}
            euros={market === 'Cardmarket'}
          />
        ))}
      </ul>
    </div>
  );
}

function PriceItem({ type, value, euros }: PriceItemProps) {
  if (!value) return null;

  // Recursively go through price object until a number is found
  if (typeof value !== 'number') {
    return (
      <>
        {Object.entries(value).map(([type, value]) => (
          <PriceItem key={type} type={type} value={value} euros={euros} />
        ))}
      </>
    );
  }

  const price = getPrice(euros ? 'EUR' : 'USD', value);
  type = type.replace(/([A-Z])/g, ' $1');
  type = type.replace(
    /(avg1|avg7|avg30)/gi,
    (match) => `${match.slice(3)} Day Average`,
  );

  return (
    <li className="flex flex-col">
      <span className="uppercase text-[.8rem] tracking-wider">{type}</span>
      <span className="font-bold">{price}</span>
    </li>
  );
}
