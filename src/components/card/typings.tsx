import { QToTCGTableKeys } from '@/lib/tcg';
import { cn } from '@/lib/utils';
import { TCardFull } from '@/types/tcg';
import Image from '@/ui/image';
import { Link } from '@/ui/link';

type Props<T> = React.PropsWithChildren<{
  id: string;
  data: T;
  className?: string;
  q: QToTCGTableKeys;
}>;

type Comp<T> = (x: Props<T>) => JSX.Element;

const TypesImage: Comp<TCardFull['types']> = (props) => {
  if (!props.data?.length) {
    return <>--</>;
  }

  return (
    <>
      {props.data.map((type, i) => (
        <SearchLink key={type} q={props.q} value={type}>
          <Image
            key={`${props.id}-${type}.${i}`}
            src={`/types/${type.toLowerCase()}.png`}
            height={24}
            width={24}
            className={cn('object-contain', props.className)}
            alt={`${type} icon`}
          />
          {props.children}
        </SearchLink>
      ))}
    </>
  );
};

type SearcLinkProps = React.PropsWithChildren<{ q: string; value: any }>;
const SearchLink = ({ children, q, value }: SearcLinkProps) => {
  return (
    <Link focus="none" variant="underline" href={`/search?${q}=${value}`}>
      {children}
    </Link>
  );
};

// pretty dumb imo
const Optional = (
  props: Pick<Parameters<Comp<any>>[0], 'data' | 'children'>,
) => {
  if (!props.data?.length) return <>--</>;
  return <>{props.children}</>;
};

export { TypesImage, SearchLink, Optional };
