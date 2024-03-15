export function Label(props: React.ComponentProps<"label">) {
  return (
    <label
      {...props}
      className="font-s emibold text-sm uppercase tracking-wide"
    />
  );
}
