"use client";

import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const handleChangeTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="bg-background text-foreground h-screen dark:bg-foreground dark:text-background">
      <button onClick={handleChangeTheme} className="p-3 ">
        Toggle Theme
      </button>
    </div>
  );
}
