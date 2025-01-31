import { cn } from "@/lib/utils";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

const Button = ({
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
