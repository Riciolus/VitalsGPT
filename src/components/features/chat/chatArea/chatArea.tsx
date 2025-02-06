import Card from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Message } from "../VitalsChat";

const ChatArea = ({
  messages,
  assistantMessageBuffer,
}: {
  messages: Message[];
  assistantMessageBuffer: string;
}) => {
  return (
    <div className="flex flex-col gap-3 xl:mx-36 mt-10">
      {messages.map((msg, index) => (
        <article key={index}>
          <div
            className={cn(
              " flex  items-start md:gap-2 justify-start",
              msg.role === "user" ? "justify-end" : "justify-start flex-col md:flex-row"
            )}
          >
            {msg.role === "assistant" && (
              <div className="p-1 bg-slate-300 dark:bg-slate-500 rounded-full cursor-default">
                💊
              </div>
            )}
            <Card
              variant={msg.role}
              className={cn(
                "w-fit text-base p-2 rounded-lg",
                msg.role === "user"
                  ? "max-w-[80%] md:max-w-[47%]"
                  : "max-w-[95%] md:max-w-[60%] mt-2.5 rounded-tl-sm"
              )}
            >
              {msg.text}
            </Card>
          </div>
        </article>
      ))}

      {assistantMessageBuffer && (
        <article>
          <div className=" flex  items-start md:gap-2 justify-start flex-col md:flex-row">
            <div className="p-1 bg-slate-300 dark:bg-slate-500 rounded-full cursor-default">💊</div>

            <Card
              variant="assistant"
              className="w-fit text-base p-2 rounded-lg max-w-[95%] md:max-w-[60%] mt-2.5 rounded-tl-sm"
            >
              {assistantMessageBuffer}
            </Card>
          </div>
        </article>
      )}
    </div>
  );
};

export default ChatArea;
