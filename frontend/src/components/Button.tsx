import React, { ComponentProps } from "react";

type Props = {
  children?: React.ReactNode;
  ghost?: boolean;
  danger?: boolean;
  onClick?: ComponentProps<"button">["onClick"];
  className?: string;
};

function Button({ children, ghost, onClick, className, danger }: Props) {
  return (
    <button
      className={`p-2 ${
        ghost
          ? "bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          : "text-white bg-primary-600 hover:bg-primary-500"
      } inline-flex w-full sm:w-auto justify-center rounded-md shadow-sm px-3 py-2 text-sm font-semibold ${
        danger ? "text-red-600" : ""
      } ${className ?? ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
