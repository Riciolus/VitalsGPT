import { cn } from "@/lib/utils";

type ButtonProps = {
  isDefault?: boolean;
  children: React.ReactNode | string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

const Button = ({
  isDefault = false,
  children,
  onClick,
  className,
  disabled = false,
  type = "button",
}: ButtonProps) => {
  return (
    <>
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={cn(
          !isDefault &&
            "border-neutral-200 dark:border-neutral-700 text-sm font-medium transition-colors rounded-lg px-3 py-2",
          className
        )}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
