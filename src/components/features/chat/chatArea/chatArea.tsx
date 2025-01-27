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
    <div className="flex flex-col gap-3">
      {messages.map((msg, index) => (
        <article key={index}>
          <div
            className={cn(
              " flex  items-center",
              msg.role === "user" ? "justify-end" : "justify-start"
            )}
          >
            <Card
              className={cn(
                "w-fit text-base p-2 rounded-lg ",
                msg.role === "user" ? "max-w-[80%] md:max-w-[47%]" : "max-w-[90%] md:max-w-[60%]"
              )}
            >
              {msg.text}
            </Card>
          </div>
        </article>
      ))}

      {assistantMessageBuffer && (
        <article>
          <div className=" flex  items-center justify-start">
            <Card className="w-fit text-base p-2 rounded-lg max-w-[80%] md:max-w-[60%] ">
              {assistantMessageBuffer}
            </Card>
          </div>
        </article>
      )}
    </div>
  );
};

export default ChatArea;
