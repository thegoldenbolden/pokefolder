import { cn } from "@/lib/utils";

export function Spinner({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "aspect-square h-8 w-8 rounded-full border-solid border-b-primary/50 border-l-primary/50 border-r-primary border-t-primary motion-safe:animate-spin",
        className,
      )}
    />
  );
}
