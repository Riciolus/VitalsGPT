import { cn } from "@/lib/utils";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

const Button = ({ children, onClick, className }: ButtonProps) => {
  return (
    <>
      <button
        onClick={onClick}
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
