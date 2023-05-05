export default function Skeleton({
  height,
  width,
}: {
  height: string;
  width: string;
}) {
  (height ||= 'h-7'), (width ||= 'w-7');
  return (
    <div
      className={`${height} ${width} rounded-sm motion-safe:animate-pulse bg-tw-gray`}
    />
  );
}
