"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="grid min-h-96 place-content-center">
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again?</button>
    </div>
  );
}
