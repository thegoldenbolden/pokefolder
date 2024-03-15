export default function Loading() {
  return (
    <div className="grid grid-cols-fluid gap-2 p-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 24 }).map((_, i) => (
        <div key={`expansions-fallback-${i}`} className="aspect-video h-40" />
      ))}
    </div>
  );
}
