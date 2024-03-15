import { Image } from "@/components/ui/image";
import { Link } from "@/components/ui/link";
import { cn, getQueryKey, getSearchUrl } from "@/lib/utils";

type CardTypeProps = React.PropsWithChildren<{
  id: string;
  data: any;
  className?: string;
}>;

export function TypesImage({ id, data, className, children }: CardTypeProps) {
  if (!data?.length) {
    return <>--</>;
  }

  const typesKey = getQueryKey("types");

  return (
    <>
      {data.map((type, i) => (
        <Link href={getSearchUrl(`${typesKey}=${type}`)} key={type}>
          <Image
            key={`${id}-${type}.${i}`}
            src={`/types/${type.toLowerCase()}.png`}
            height={24}
            width={24}
            className={cn("size-4 object-contain", className)}
            alt={`${type} icon`}
          />
          {children}
        </Link>
      ))}
    </>
  );
}
