import { Link } from "@/components/ui/link";

export default function NotFound() {
  return (
    <div className="flex grow flex-col items-center justify-center gap-2">
      <h2 className="text-2xl font-bold">Page Not Found</h2>
      <Link href="/" className="underline">
        Back to Home
      </Link>
    </div>
  );
}
