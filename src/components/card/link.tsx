import { Image } from "@/components/ui/image";
import { Link } from "@/components/ui/link";
import { getCardUrl } from "@/lib/utils";
import type { SimpleCard } from "@/types/api/pokemon-tcg";

export function CardLink(card: SimpleCard) {
  return (
    <Link
      className="outline-none duration-300 hover:scale-105 focus-visible:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background motion-safe:transform-gpu"
      href={getCardUrl(card)}
      variant={null}
      aria-label={`${card.name} from ${card.set.name}`}
    >
      <Image
        referrerPolicy="no-referrer"
        src={card.images.small || card.images.large || "/back.png"}
        alt={card.name}
        width={250}
        height={350}
        sizes="(max-width: 768px) 12rem, (max-width: 1280px) 16rem, 16rem"
        placeholder="blur"
        className="aspect-card rounded-lg drop-shadow-md"
      />
    </Link>
  );
}
