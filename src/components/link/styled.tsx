import NextLink, { type LinkProps as NextLinkProps } from 'next/link';

type LinkProps = NextLinkProps & JSX.IntrinsicElements['a'];
export default function Link(props: LinkProps) {
	const className = `text-tw-secondary hover:text-tw-primary focus:text-tw-primary transition-colors ${props.className ? props.className : ""}`;

	if (!props.href.startsWith("/")) {
		return (
			<a {...props} ref={undefined} className={className}>
				{props.children}
			</a>
		)
	};

  return (
    <NextLink
      {...props}
      prefetch={false}
      ref={undefined}
      className={className}
    >
      {props.children}
    </NextLink>
  );
}
