import { ComponentProps, forwardRef } from "react";

const Input = forwardRef<
  HTMLInputElement,
  Omit<ComponentProps<"input">, "ref">
>((props, ref) => {
  const { className, ...inputProps } = props;

  return (
    <input
      ref={ref}
      {...inputProps}
      className={
        "block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500  sm:text-sm sm:leading-6 " +
          className ?? ""
      }
    />
  );
});

export default Input;
