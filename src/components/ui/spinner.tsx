type SpinnerProps = {
  width: `w-${number}`;
  height: `h-${number}`;
  borderColor: `border-t-${string} border-r-${string} border-l-${string} border-b-${string}`;
  borderWidth: `border-${number}`;
};

export default function Spinner(props: Partial<SpinnerProps>) {
  const width = props.width ?? 'w-8',
    height = props.height ?? 'h-8',
    //prettier-ignore
    borderColor = props.borderColor || 'border-t-tw-primary border-r-tw-red border-l-primary/50 border-b-primary/50',
    borderWidth = props.borderWidth || 'border-2';

  return (
    <span
      className={`${width} ${height} ${borderColor} ${borderWidth} aspect-square border-solid rounded-full motion-safe:animate-spin`}
    />
  );
}
