import { ComponentProps, Ref, forwardRef } from "react";

type Props = {
  id: string;
  label?: string;
  error?: string;
  options?: string[];
} & (ComponentProps<"input"> & ComponentProps<"select">);

const FormField = forwardRef<HTMLElement, Props>(
  ({ id, label, error, options, ...inputProps }, ref) => {
    return (
      <div>
        {!!label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            {label}
          </label>
        )}
        {options ? (
          <select
            name={id}
            id={id}
            ref={ref as Ref<HTMLSelectElement>}
            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500  sm:text-sm sm:leading-6"
            {...inputProps}
          >
            <option value="">None</option>
            {options.map((option, i) => (
              <option key={i} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            name={id}
            id={id}
            ref={ref as Ref<HTMLInputElement>}
            {...inputProps}
            className={
              "block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500  sm:text-sm sm:leading-6"
            }
          />
        )}
        {error && <p className="text-red-800 text-xs mt-1">{error}</p>}
      </div>
    );
  }
);

export default FormField;
