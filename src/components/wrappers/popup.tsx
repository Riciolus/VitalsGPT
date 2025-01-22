import { useEffect, useRef } from "react";

const PopupWrapper = ({
  children,
  isVisible,
  onClose,
}: {
  children: React.ReactNode;
  isVisible: boolean;
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
    <div
      ref={popUpRef}
      className="absolute z-10 right-0 mt-7 grid  text-left  transition-all dark:bg-neutral-700 bg-neutral-100 py-1 px-1 rounded-xl border border-neutral-300 dark:border-neutral-500 shadow-xl"
    >
      {children}
    </div>
  );
};

export default PopupWrapper;
