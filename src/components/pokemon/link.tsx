import { Link } from "@/components/ui/link";
import { getCardUrl } from "@/lib/utils";

type CardLinkProps = Omit<
  React.ComponentProps<typeof Link>,
  "href" | "aria-label"
> & {
  id: string;
  name: string;
  setName: string;
};

export function CardLink({ id, name, setName, ...props }: CardLinkProps) {
  return (
    <Link
      className="outline-none duration-300 hover:scale-105 focus-visible:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-canvas motion-safe:transform-gpu"
      href={getCardUrl(id, name)}
      variant={null}
      aria-label={`${name} from ${setName}`}
      {...props}
    />
  );
}