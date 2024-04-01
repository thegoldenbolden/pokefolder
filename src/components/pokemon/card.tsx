import { cn } from "@/lib/utils";
import { Image, rgbDataURL } from "../ui/image";

type CardLinkProps = Omit<React.ComponentProps<typeof Image>, "alt" | "src"> & {
  name?: string;
  priorityImg?: string;
  priorityImgFallback?: string;
  types?: string[];
};

export function PokemonCard({
  priorityImg,
  types,
  priorityImgFallback,
  name,
  className,
  ...props
}: CardLinkProps) {
  return (
    <Image
      referrerPolicy="no-referrer"
      src={priorityImg || priorityImgFallback || "/back.png"}
      alt={name || "a pokemon card"}
      width={250}
      height={350}
      sizes="(max-width: 768px) 12rem, (max-width: 1280px) 16rem, 16rem"
      placeholder="blur"
      className={cn("aspect-card rounded-lg drop-shadow-md", className)}
      blurDataURL={getRGBDataUrl(types)}
      {...props}
    />
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
