import { Link } from '@/ui/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-2 justify-center min-h-[70vh]">
      <h2 className="text-2xl font-bold">Page Not Found</h2>
      <Link href="/" className="underline">
        Back to Home
      </Link>
    </div>
  );
}
