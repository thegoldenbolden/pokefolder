import { cn } from '@/lib/utils';

export default function Loading({ className }: React.ComponentProps<'div'>) {
  return (
    <div
      data-loading={true}
      className={cn('flex items-center justify-center h-full grow', className)}
    >
      <span className="size-8 border-4 rounded-full border-transparent border-l-primary border-t-primary animate-spin" />
    </div>
  );
}
