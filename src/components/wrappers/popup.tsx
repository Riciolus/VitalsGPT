import { motion } from "framer-motion";
import { cn } from "@/lib/utils"; // Adjust this based on your utility function
import { useEffect, useRef } from "react";

const PopupWrapper = ({
  children,
  variant = "left",
  isVisible,
  classname,
  onClose,
}: {
  children: React.ReactNode;
  variant: "left" | "right";
  isVisible: boolean;
  classname?: string;
  onClose: () => void;
}) => {
  const popUpRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popUpRef.current &&
        event.target instanceof Node &&
        !popUpRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <motion.div
      ref={popUpRef}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.8 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className={cn(
        "absolute z-50 bottom-full mb-2 grid text-left dark:bg-neutral-700 bg-neutral-100 py-1 px-1 rounded-xl border border-neutral-300 dark:border-neutral-500 shadow-xl",
        variant === "left" ? "left-0" : "right-0",
        classname
      )}
    >
      {children}
    </motion.div>
  );
};

export default PopupWrapper;
