import Button from "@/components/ui/button";
import { useTheme } from "next-themes";

export default function ChatInterface() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <div className="w-full  bg-background">
        <div className="p-5">
          <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>Theme</Button>
        </div>
      </div>
    </>
  );
}
