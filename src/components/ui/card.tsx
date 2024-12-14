import { cn } from "@/lib/utils";
import React from "react";

type CardProps = {
  children: string;
  className: string;
};

const Card = ({ children, className }: CardProps) => {
  return (
    <>
      <div
        className={cn(
          "p-3 rounded-md border bg-neutral-100 dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600 text-sm text-neutral-500 dark:text-neutral-400 ",
          className
        )}
      >
        {children}
      </div>
    </>
  );
};

export default Card;
