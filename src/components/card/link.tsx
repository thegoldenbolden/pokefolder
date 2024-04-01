import { Image, rgbDataURL } from "@/components/ui/image";
import { Link } from "@/components/ui/link";
import { getCardUrl } from "@/lib/utils";

type CardLinkProps = {
  id: string;
  name: string;
  setName: string;
  smallImg?: string;
  largeImg?: string;
  types?: string[];
};

export function CardLink({
  id,
  name,
  setName,
  smallImg,
  largeImg,
  types,
}: CardLinkProps) {
  return (
    <Link
      className="outline-none duration-300 hover:scale-105 focus-visible:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-canvas motion-safe:transform-gpu"
      href={getCardUrl(id, name)}
      variant={null}
      aria-label={`${name} from ${setName}`}
    >
      <Image
        referrerPolicy="no-referrer"
        src={smallImg || largeImg || "/back.png"}
        alt={name}
        width={250}
        height={350}
        sizes="(max-width: 768px) 12rem, (max-width: 1280px) 16rem, 16rem"
        placeholder="blur"
        className="aspect-card rounded-lg drop-shadow-md"
        blurDataURL={getRGBDataUrl(types)}
      />
    </Link>
  );
}

/**
 * Get the background color based on the card's type
 */
export function getRGBDataUrl(types?: string[]) {
  switch (types?.[0].toLowerCase()) {
    default:
      return rgbDataURL(222, 222, 224);
    case "colorless":
      return rgbDataURL(202, 202, 204);
    case "darkness":
      return rgbDataURL(54, 83, 108);
    case "dragon":
      return rgbDataURL(129, 110, 49);
    case "fairy":
      return rgbDataURL(154, 78, 125);
    case "fighting":
      return rgbDataURL(133, 52, 36);
    case "fire":
      return rgbDataURL(201, 33, 39);
    case "grass":
      return rgbDataURL(39, 123, 63);
    case "lightning":
      return rgbDataURL(216, 177, 55);
    case "metal":
      return rgbDataURL(111, 115, 120);
    case "psychic":
      return rgbDataURL(122, 64, 122);
    case "water":
      return rgbDataURL(39, 155, 196);
  }
}
