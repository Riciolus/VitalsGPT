import { cn } from "@/lib/utils";

type InputProps = {
  id?: string;
  className?: string;
  type?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onFocus?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.ChangeEventHandler<HTMLInputElement>;
};

const Input = ({
  id,
  value,
  type = "text",
  onChange,
  onFocus,
  onBlur,
  className,
  placeholder,
}: InputProps) => {
  return (
    <>
      <input
        id={id}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        value={value}
        type={type}
        autoComplete="off"
        inputMode="text"
        className={cn(
          "outline-none rounded-md border bg-neutral-100 dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600 text-sm placeholder:text-neutral-500 placeholder:dark:text-neutral-400 font-medium px-2 py-1",
          className
        )}
        placeholder={placeholder}
      />
    </>
  );
};

export default Input;
