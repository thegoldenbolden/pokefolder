import { PokemonCard } from "@/components/pokemon/card";
import { CardLink } from "@/components/pokemon/link";
import { CardObject } from "@/types/pokemon-tcg";

export function ImagesFallback({ size }: { size: number }) {
  return (
    <ul
      role="status"
      className="grid w-full grid-cols-2 items-center gap-4 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
    >
      {Array.from({ length: size }).map((_, i) => (
        <li
          key={`fallback-${i}`}
          className="aspect-card max-h-[350px] w-full rounded-lg bg-muted drop-shadow-lg motion-safe:animate-pulse"
        />
      ))}
    </ul>
  );
}

export function Images({ cards }: { cards: CardObject[] }) {
  return (
    <ul className="grid w-full grid-cols-2 items-center gap-4 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {cards.map((card) => (
        <li key={`${card.id}-list`}>
          <CardLink id={card.id} name={card.name} setName={card.set.name}>
            <PokemonCard
              name={card.name}
              priorityImg={card.images.small}
              types={card.types}
              alt={`${card.name} from ${card.set.name}`}
            />
          </CardLink>
        </li>
      ))}
    </ul>
  );
}
