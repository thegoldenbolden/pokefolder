import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/ui/hover-card';
import { Optional, TypesImage } from '@/components/card/typings';
import { getCardUrl, getPrice } from '@/lib/utils';
import { PageControls } from './page-controls';
import { useCards } from '@/hooks/use-cards';
import { Link } from '@/ui/link';
import { Image } from '@/ui/image';
import {
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  Table as TableRoot,
  TableRow,
} from '@/ui/table';

export function Table() {
  const { cards, isLoading, error } = useCards();

  if (isLoading) {
    return (
      <TableRoot>
        <TableCaption>
          <PageControls />
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Set</TableHead>
            <TableHead>No.</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Rarity</TableHead>
            <TableHead>Supertype</TableHead>
            <TableHead>Types</TableHead>
            <TableHead>Subtypes</TableHead>
            <TableHead>TCGPlayer</TableHead>
            <TableHead>Cardmarket</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="min-h-[648px]">
          {Array.from({ length: 20 }).map((_, i) => (
            <TableRow
              key={`row-fallback-${i}`}
              className="motion-safe:animate-pulse duration-500 h-9 odd:bg-muted even:bg-muted/75 "
            >
              {Array.from({ length: 9 }).map((_, i) => (
                <TableCell key={`cell-fallback-${i}`} />
              ))}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow className="hover:bg-primary focus-visible:bg-primary">
            <TableHead>Set</TableHead>
            <TableHead>No.</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Rarity</TableHead>
            <TableHead>Supertype</TableHead>
            <TableHead>Types</TableHead>
            <TableHead>Subtypes</TableHead>
            <TableHead>TCGPlayer</TableHead>
            <TableHead>Cardmarket</TableHead>
          </TableRow>
        </TableFooter>
      </TableRoot>
    );
  }

  if (error) {
    return <span>An error occurred</span>;
  }

  if (!cards?.count) {
    return <span>No cards were found</span>;
  }

  return (
    <TableRoot>
      <TableHeader>
        <TableRow>
          <TableHead>Set</TableHead>
          <TableHead>No.</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Rarity</TableHead>
          <TableHead>Supertype</TableHead>
          <TableHead>Types</TableHead>
          <TableHead>Subtypes</TableHead>
          <TableHead>TCGPlayer</TableHead>
          <TableHead>Cardmarket</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cards.data.map((card) => (
          <HoverCard key={card.id}>
            <HoverCardTrigger asChild>
              <TableRow>
                <TableCell>
                  <Link variant="link" href={`/search?sets=${card.set.id}`}>
                    {card.set.name}
                  </Link>
                </TableCell>
                <TableCell>{card.number}</TableCell>
                <TableCell>
                  <Link variant="link" href={getCardUrl(card)}>
                    {card.name}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link variant="link" href={`/search?rarities=${card.rarity}`}>
                    {card.rarity}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link
                    variant="link"
                    href={`/search?supertypes=${card.supertype}`}
                  >
                    {card.supertype}
                  </Link>
                </TableCell>
                <TableCell>
                  <Optional data={card.types}>
                    <span className="inline-flex gap-1 flex-wrap items-centerj">
                      <TypesImage q="types" id="types" data={card.types!} />
                    </span>
                  </Optional>
                </TableCell>
                <TableCell className="space-x-2">
                  <Optional data={card.subtypes}>
                    {card.subtypes &&
                      card.subtypes.map((subtype) => (
                        <Link
                          href={`/search?subtypes=${subtype}`}
                          key={subtype}
                        >
                          {subtype}
                        </Link>
                      ))}
                  </Optional>
                </TableCell>
                <TableCell>
                  {card.tcgplayer?.url ? (
                    <Link
                      variant="link"
                      href={card.tcgplayer.url}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      {getPrice(
                        'USD',
                        card.tcgplayer?.prices?.holofoil?.market,
                      )}
                    </Link>
                  ) : (
                    <>
                      {getPrice(
                        'USD',
                        card.tcgplayer?.prices?.holofoil?.market,
                      )}
                    </>
                  )}
                </TableCell>
                <TableCell>
                  {card.cardmarket?.url ? (
                    <Link
                      variant="link"
                      href={card.cardmarket.url}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      {getPrice('EUR', card.cardmarket?.prices?.trendPrice)}
                    </Link>
                  ) : (
                    <>{getPrice('EUR', card.cardmarket?.prices?.trendPrice)}</>
                  )}
                </TableCell>
              </TableRow>
            </HoverCardTrigger>
            <HoverCardContent className="p-0 border-none  bg-transparent rounded-sm">
              <Image
                src={card.images.large || card.images.small || '/back.png'}
                alt={card.name}
                width={250}
                height={350}
                sizes="(max-width: 768px) 12rem, (max-width: 1280px) 16rem, 16rem"
                className="transition-transform hover:scale-105 focus-visible:scale-105"
                placeholder="blur"
              />
            </HoverCardContent>
          </HoverCard>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableHead>Set</TableHead>
          <TableHead>No.</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Rarity</TableHead>
          <TableHead>Supertype</TableHead>
          <TableHead>Types</TableHead>
          <TableHead>Subtypes</TableHead>
          <TableHead>TCGPlayer</TableHead>
          <TableHead>Cardmarket</TableHead>
        </TableRow>
      </TableFooter>
    </TableRoot>
  );
}
