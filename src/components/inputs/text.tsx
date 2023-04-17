export default function Text(props: JSX.IntrinsicElements['input'] & { srOnly?: boolean }) {
  return (
    <>
      <label htmlFor={props.id} className="sr-only">
        {props.name}
      </label>
      <input {...props} />
    </>
  );
}
