'use client';
import useSearch from '@hooks/useSearch';
import DefaultText from '@inputs/text';

// Adds previous inputs as default values.
type FormInput = { id: keyof ReturnType<typeof useSearch> };
export function Text(props: FormInput & JSX.IntrinsicElements['input']) {
  const params = useSearch();
  return (
    <DefaultText
      {...(params[props.id] && { defaultValue: params[props.id] })}
      {...props}
    />
  );
}

export function Select(props: FormInput & JSX.IntrinsicElements['select']) {
  const params = useSearch();
  return (
    <div className="flex text-white flex-col gap-2 bg-transparent">
      <label className="capitalize" htmlFor={props.id}>
        {props.name}
      </label>
      <select
        {...props}
        id={props.id}
        name={props.name}
        className="py-2 px-px bg-transparent border-solid border-2 border-tw-gray rounded-md"
        {...((params[props.id]?.includes(props.name!) ||
          params[props.id]?.includes(props.id)) && { defaultValue: props.id })}
      >
        {props.children}
      </select>
    </div>
  );
}
