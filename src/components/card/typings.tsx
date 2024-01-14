import type { QueryParams } from '@/lib/tcg';
import type { TCardFull } from '@/types/tcg';
import { cn } from '@/lib/utils';
import { Image } from '@/ui/image';
import { Link } from '@/ui/link';

type Props<T> = React.PropsWithChildren<{
  id: string;
  data: T;
  className?: string;
  q: QueryParams;
}>;

export function TypesImage(props: Props<TCardFull['types']>) {
  if (!props.data?.length) {
    return <>--</>;
  }

  return (
    <>
      {props.data.map((type, i) => (
        <Link href={`/search?${props.q}=${type}`} key={type}>
          <Image
            key={`${props.id}-${type}.${i}`}
            src={`/types/${type.toLowerCase()}.png`}
            height={24}
            width={24}
            className={cn('object-contain size-4', props.className)}
            alt={`${type} icon`}
          />
          {props.children}
        </Link>
      ))}
    </>
  );
}

export function Optional({
  data = [],
  children,
}: Pick<Props<unknown[] | string | undefined>, 'data' | 'children'>) {
  if (!data?.length) return <>--</>;
  return <>{children}</>;
}
