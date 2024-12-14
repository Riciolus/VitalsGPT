import Card from "@/components/ui/card";
import Input from "@/components/ui/input";
import { cn } from "@/lib/utils";

const categories = [{ name: "Health" }, { name: "Diagnose" }, { name: "Example" }];

export default function ChatInterface() {
  return (
    <>
      <div className="w-full flex flex-col justify-end items-center  bg-background">
        <div className="p-5 flex flex-col justify-center items-center gap-3">
          <div>
            <h3 className="font-semibold tracking-wide text-xl">How can I assist you today?</h3>
          </div>

          <div className="flex gap-3">
            {categories.map((category) => {
              return (
                <Card
                  key={category.name}
                  className={cn("py-0.5 px-2  dark:text-neutral-300 text-xs")}
                >
                  {category.name}
                </Card>
              );
            })}
          </div>

          <Input placeholder="Should I take a multivitamin?" className="w-96 h-12" />
        </div>
      </div>
    </>
  );
}
