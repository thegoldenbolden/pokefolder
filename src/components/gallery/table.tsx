import { PokemonCard } from "@/components/pokemon/card";
import { TypeGroup } from "@/components/pokemon/type";
import { Anchor } from "@/components/ui/anchor";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Link } from "@/components/ui/link";
import {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  Table as TableRoot,
  TableRow,
} from "@/components/ui/table";
import { getCardPrice, getCardUrl, getSearchUrl } from "@/lib/utils";
import { CardObject } from "@/types/pokemon-tcg";

export function TableFallback({ size }: { size: number }) {
  return (
    <TableRoot role="status">
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
        {Array.from({ length: size }).map((_, i) => (
          <TableRow
            key={`row-fallback-${i}`}
            className="h-9 duration-500 odd:bg-muted even:bg-muted/75 motion-safe:animate-pulse"
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

export function Table({ cards }: { cards: CardObject[] }) {
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
        {cards.map((card) => (
          <HoverCard key={card.id}>
            <HoverCardTrigger asChild>
              <TableRow>
                <TableCell>
                  <Link href={getSearchUrl(`sets=${card.set.id}`)}>
                    {card.set.name}
                  </Link>
                </TableCell>
                <TableCell>{card.number.toString()}</TableCell>
                <TableCell>
                  <Link
                    variant="underline"
                    href={getCardUrl(card.id, card.name)}
                  >
                    {card.name}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link href={getSearchUrl(`rarities=${card.rarity}`)}>
                    {card.rarity}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link href={getSearchUrl(`supertypes=${card.supertype}`)}>
                    {card.supertype}
                  </Link>
                </TableCell>
                <TableCell>
                  <div className="inline-flex flex-wrap items-center gap-1">
                    <TypeGroup
                      id={card.id}
                      types={card.types?.map((type) => ({ type }))}
                    />
                  </div>
                </TableCell>
                <TableCell className="space-x-2">
                  {!card.subtypes || card.subtypes.length === 0
                    ? "--"
                    : card.subtypes.map((subtype) => (
                        <Link
                          href={getSearchUrl(`subtypes=${subtype}`)}
                          key={subtype}
                        >
                          {subtype}
                        </Link>
                      ))}
                </TableCell>
                <TableCell>
                  {card.tcgplayer?.url ? (
                    <Anchor href={card.tcgplayer.url}>
                      {getCardPrice("USD", card.tcgplayer?.prices?.normal?.low)}
                    </Anchor>
                  ) : (
                    <>
                      {getCardPrice("USD", card.tcgplayer?.prices?.normal?.low)}
                    </>
                  )}
                </TableCell>
                <TableCell>
                  {card.cardmarket?.url ? (
                    <Anchor href={card.cardmarket.url}>
                      {getCardPrice("EUR", card.cardmarket?.prices?.trendPrice)}
                    </Anchor>
                  ) : (
                    <>
                      {getCardPrice("EUR", card.cardmarket?.prices?.trendPrice)}
                    </>
                  )}
                </TableCell>
              </TableRow>
            </HoverCardTrigger>
            <HoverCardContent className="rounded-sm border-none  bg-transparent p-0">
              <PokemonCard
                name={card.name}
                priorityImg={card.images.small}
                alt={`${card.name} from ${card.set.name}`}
                priorityImgFallback={card.images.large}
                className="transition-transform hover:scale-105 focus-visible:scale-105"
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
