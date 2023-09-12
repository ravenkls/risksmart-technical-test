import React, { ComponentProps } from "react";

type Props = {
  id: string;
  label: string;
  errors?: string[];
} & ComponentProps<"input">;

function FormField({ id, label, errors, ...inputProps }: Props) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <input
        name={id}
        id={id}
        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500  sm:text-sm sm:leading-6"
        {...inputProps}
      />
    </div>
  );
}

export default FormField;
