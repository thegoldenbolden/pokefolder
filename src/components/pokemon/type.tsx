import { Image } from "@/components/ui/image";
import { Link } from "@/components/ui/link";
import { cn, getQueryKey, getSearchUrl } from "@/lib/utils";

type TypeLinkProps = Omit<React.ComponentProps<typeof Link>, "href"> & {
  type: string;
};

export function TypeLink({ type, ...props }: TypeLinkProps) {
  const key = getQueryKey("types");
  return <Link href={getSearchUrl(`${key}=${type}`)} {...props} />;
}

type TypeImage = Omit<React.ComponentProps<typeof Image>, "src" | "alt"> & {
  name: string;
};

export function TypeImage({ name, className, ...props }: TypeImage) {
  return (
    <Image
      src={`/types/${name.toLowerCase()}.png`}
      className={cn("size-4 object-contain", className)}
      alt={`${name || `unknown`} icon`}
      {...props}
    />
  );
}

type TypeGroup = {
  types?: { type: string; value?: string }[];
  id: string;
};

export function TypeGroup({ types, id }: TypeGroup) {
  if (!types || !types.length) return <>--</>;
  return (
    <>
      {types.map(({ type, value }, i) => {
        return (
          <TypeLink
            key={`${id}-${type}-${i}`}
            type={type}
            variant={null}
            className="flex shrink-0 flex-wrap items-center gap-2 outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-canvas motion-safe:transition-colors"
          >
            <TypeImage
              name={type}
              height={24}
              width={24}
              className="size-4 shrink-0 object-contain"
            />
            {value}
          </TypeLink>
        );
      })}
    </>
  );
}
