import { useTheme } from "next-themes";

export default function ChatInterface() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <div className="w-full bg-background">
        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="p-3 ">
          Toggle Theme
        </button>
      </div>
    </>
  );
}
