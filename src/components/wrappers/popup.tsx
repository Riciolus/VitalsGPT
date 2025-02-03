import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import { motion } from "motion/react";

const PopupWrapper = ({
  children,
  isVisible,
  classname,
  onClose,
}: {
  children: React.ReactNode;
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
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "absolute z-10 mt-5 top-0 grid  text-left   dark:bg-neutral-700 bg-neutral-100 py-1 px-1 rounded-xl border border-neutral-300 dark:border-neutral-500 shadow-xl",
        classname
      )}
    >
      <div ref={popUpRef}>{children}</div>
    </motion.div>
  );
};

export default PopupWrapper;
