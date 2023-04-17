import NextLink, { type LinkProps as NextLinkProps } from 'next/link';

type LinkProps = NextLinkProps & JSX.IntrinsicElements['a'];
export default function Link(props: LinkProps) {
  return (
    <NextLink
      {...props}
      prefetch={false}
      ref={undefined}
      className={`text-tw-secondary hover:text-tw-primary focus:text-tw-primary transition-colors ${
        props.className ?? ''
      }`}
    >
      {props.children}
    </NextLink>
  );
}
