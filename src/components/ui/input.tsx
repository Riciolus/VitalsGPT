import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

type InputProps = {
  id?: string;
  className?: string;
  type?: string;
  placeholder?: string;
  value?: string | number;
  name?: string;
  required?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
};

// Wrap the Input component with forwardRef
const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      value,
      name,
      type = "text",
      required = false,
      onChange,
      onFocus,
      onBlur,
      className,
      placeholder,
    }: InputProps,
    ref
  ) => {
    return (
      <input
        ref={ref} // Pass the ref to the input element
        id={id}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        value={value}
        name={name}
        type={type}
        required={required}
        autoComplete="off"
        inputMode="text"
        className={cn(
          "outline-none rounded-md border bg-neutral-100 dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600 text-sm placeholder:text-neutral-500 placeholder:dark:text-neutral-400 font-medium px-2 py-1",
          className
        )}
        placeholder={placeholder}
      />
    );
  }
);

Input.displayName = "Input"; // Necessary for forwardRef components to display correctly in dev tools

export default Input;
