"use client";

import Card from "@/components/ui/card";
import Input from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

type message = {
  role: "assistant" | "user";
  text: string;
};

const handleEventSource = (
  message: string,
  setMessages: React.Dispatch<React.SetStateAction<message[]>>, // Adjust type as needed
  setAssistantMessageBuffer: React.Dispatch<React.SetStateAction<string>>
) => {
  const url = `${process.env.NEXT_PUBLIC_VITALS_API_URL}?message=${encodeURIComponent(message)}`;
  const eventSource = new EventSource(url);
  let buffer = "";

  eventSource.onmessage = (event) => {
    buffer += event.data;
    setAssistantMessageBuffer(buffer); // Buffer for live updates
  };

  eventSource.onerror = () => {
    setMessages((prev) => [...prev, { role: "assistant", text: buffer }]); // Finalize message
    setAssistantMessageBuffer(""); // Clear buffer
    eventSource.close(); // Close the connection
  };
};

export default function ChatInterface() {
  const [messages, setMessages] = useState<message[]>([]);
  const [userMessage, setUserMessage] = useState<string>("");
  const [assistantMessageBuffer, setAssistantMessageBuffer] = useState<string>("");

  useEffect(() => {
    const initialMessage = sessionStorage.getItem("InitMsg");
    if (initialMessage) {
      setMessages((prev) => [...prev, { role: "user", text: initialMessage }]);

      handleEventSource(initialMessage, setMessages, setAssistantMessageBuffer);
    }
  }, []);

  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "start",
      });
    }
  }, [messages, assistantMessageBuffer]); // Scrolls to bottom whenever `messages` change

  const handleVitalsChat = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setUserMessage("");

    if (!userMessage.trim()) return;

    // append the user message
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);

    handleEventSource(userMessage, setMessages, setAssistantMessageBuffer);
  };

  return (
    <>
      <div className="md:relative w-full">
        {/* whole session interface */}

        {/* chat area */}
        {/* current height */}
        <div className="overflow-y-auto h-[calc(100vh-9.5rem)]">
          {/* the height is just temporary */}
          <div
            ref={chatContainerRef}
            className="gap-3 w-full  px-7 pt-5 overflow-y-auto overflow-x-hidden"
          >
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
                        msg.role === "user"
                          ? "max-w-[80%] md:max-w-[47%]"
                          : "max-w-[80%] md:max-w-[60%]"
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
          </div>
        </div>

        {/* lower fixed component */}
        <div className="absolute bg-background  bottom-0 pb-6 pt-3 w-full flex justify-center text-neutral-500 dark:text-neutral-400 items-center">
          {/* input question */}
          <form onSubmit={(e) => handleVitalsChat(e)}>
            <Input
              id="vitalsInput"
              onChange={(e) => setUserMessage(e.target.value)}
              value={userMessage}
              placeholder="I'd like to..."
              className="w-[calc(100vw-5rem)] sm:w-[30rem] md:w-[26rem] h-12"
            />
          </form>
        </div>
      </div>
    </>
  );
}
