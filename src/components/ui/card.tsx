import { cn } from "@/lib/utils";
import React from "react";

type CardProps = {
  children: React.ReactNode | string;
  className?: string;
  variant?: "assistant" | "user";
};

const Card = ({ children, className, variant }: CardProps) => {
  return (
    <>
      <div
        className={cn(
          "p-3 rounded-md border bg-neutral-100 dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600 text-sm text-neutral-500 dark:text-neutral-400 ",
          className,
          variant === "assistant" && "dark:bg-neutral-50/5 px-3.5 py-3"
        )}
      >
        {children}
      </div>
    </>
  );
};

export default Card;
