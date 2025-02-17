import Card from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Message } from "../VitalsChat";
import ReactMarkdown, { Components } from "react-markdown";

const MarkdownComponents: Components = {
  p: ({ children }) => <p className="mb-0">{children}</p>,
  strong: ({ children }) => (
    <strong className=" text-neutral-700 dark:text-neutral-200 fon-medium">{children}</strong>
  ),

  // Style headers
  h1: ({ children }) => <h1 className="text-2xl font-bold mb-2">{children}</h1>,
  h2: ({ children }) => <h2 className="text-xl  font-bold mb-2">{children}</h2>,
  h3: ({ children }) => <h3 className="text-sm  font-bold mb-2">{children}</h3>,

  // Style lists
  ul: ({ children }) => <ul className="list-disc  ml-4 mb-2">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal  ml-4 mb-2">{children}</ol>,

  // Style code blocks
  code: ({ children }) => (
    <code className="bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5">{children}</code>
  ),

  // Style blockquotes
  blockquote: ({ children }) => (
    <blockquote className="border-l-4  border-gray-300 dark:border-gray-600 pl-4 italic">
      {children}
    </blockquote>
  ),
};

const MessageContent = ({ content }: { content: string }) => (
  <ReactMarkdown
    components={MarkdownComponents}
    className="prose dark:prose-invert max-w-none prose-sm"
  >
    {content}
  </ReactMarkdown>
);

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
              "flex items-start md:gap-2 justify-start",
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
                "w-fit text-base p-2 rounded-lg break-words",
                msg.role === "user"
                  ? "max-w-[80%] md:max-w-[47%]"
                  : "max-w-[95%] md:max-w-[60%] mt-2.5 rounded-tl-sm"
              )}
            >
              <MessageContent content={msg.text} />
              {/* {msg.text} */}
            </Card>
          </div>
        </article>
      ))}

      {assistantMessageBuffer && (
        <article>
          <div className="flex items-start md:gap-2 justify-start flex-col md:flex-row">
            <div className="p-1 bg-slate-300 dark:bg-slate-500 rounded-full cursor-default">💊</div>

            <Card
              variant="assistant"
              className="w-fit text-base p-2 rounded-lg max-w-[95%] md:max-w-[60%] mt-2.5 rounded-tl-sm break-words"
            >
              <MessageContent content={assistantMessageBuffer} />
            </Card>
          </div>
        </article>
      )}
    </div>
  );
};

export default ChatArea;
