import { cn } from '@/lib/utils';

export default function Spinner({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'aspect-square w-8 h-8 border-solid rounded-full border-t-primary border-r-primary border-l-primary/50 border-b-primary/50 motion-safe:animate-spin',
        className,
      )}
    />
  );
}
