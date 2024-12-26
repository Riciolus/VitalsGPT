import Card from "@/components/ui/card";
import Input from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useState } from "react";

type message = {
  role: "assistant" | "user";
  text: string;
};

export default function ChatInterface() {
  const [messages, setMessages] = useState<message[]>([]);
  const [userMessage, setUserMessage] = useState("");
  const [assistantMessageBuffer, setAssistantMessageBuffer] = useState("");

  // const handleVitalsChat = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   if (!userMessage.trim()) return;

  //   setMessages((prev) => [...prev, { role: "user", text: userMessage }]);

  //   const url = `${process.env.NEXT_PUBLIC_VITALS_API_URL}?message=${encodeURIComponent(
  //     userMessage
  //   )}`;
  //   const eventSource = new EventSource(url);

  //   let assistantMessageIndex = -1; // Track the index of the assistant's message
  //   let buffer = ""; // Buffer to store unprocessed data

  //   const cleanText = (text) => {
  //     return text
  //       .replace(/\s+([,.!?])/g, "$1") // Remove spaces before punctuation
  //       .replace(/([,.!?])(?=\S)/g, "$1 ") // Add space after punctuation if missing
  //       .replace(/(\w)\s'\sre/g, "$1're") // Fix "you ' re" -> "you're"
  //       .replace(/\s+/g, " ") // Collapse multiple spaces
  //       .trim(); // Trim leading and trailing spaces
  //   };

  //   const updateMessages = (cleanedText) => {
  //     console.log("Updating Messages with:", cleanedText);

  //     setMessages((prev) => {
  //       console.log("Current Messages (before update):", prev);

  //       const updatedMessages = [...prev];

  //       if (assistantMessageIndex === -1) {
  //         // Initialize assistant's first message
  //         assistantMessageIndex = updatedMessages.length;
  //         console.log("Initializing assistant message at index:", assistantMessageIndex);
  //         updatedMessages.push({ role: "assistant", text: cleanedText });
  //       } else if (assistantMessageIndex >= 0 && assistantMessageIndex < updatedMessages.length) {
  //         const currentText = updatedMessages[assistantMessageIndex].text;

  //         // Avoid duplication
  //         if (!currentText.includes(cleanedText)) {
  //           console.log("Appending text to assistant message:", cleanedText);
  //           updatedMessages[assistantMessageIndex].text += " " + cleanedText;
  //         } else {
  //           console.log("Skipping duplicate text:", cleanedText);
  //         }
  //       } else {
  //         console.error("Invalid assistantMessageIndex:", assistantMessageIndex, updatedMessages);

  //         // Reinitialize the assistant message if index is invalid
  //         assistantMessageIndex = updatedMessages.length;
  //         updatedMessages.push({ role: "assistant", text: cleanedText });
  //       }

  //       console.log("Updated Messages (after update):", updatedMessages);
  //       return updatedMessages;
  //     });
  //   };

  //   eventSource.onmessage = (event) => {
  //     console.log("Raw Event Data:", event.data);

  //     buffer += event.data.trim() + " "; // Append new data to the buffer
  //     console.log("Buffer Before Split:", buffer);

  //     const sentences = buffer.split(/[.!?]/); // Split into sentences
  //     const completeSentences = sentences.slice(0, -1); // Get complete sentences
  //     buffer = sentences[sentences.length - 1]; // Retain last incomplete fragment

  //     console.log("Complete Sentences:", completeSentences);
  //     console.log("Buffer After Split:", buffer);

  //     completeSentences.forEach((sentence) => {
  //       const cleanedText = cleanText(sentence + ".");
  //       updateMessages(cleanedText); // Safely update messages
  //     });
  //   };

  //   eventSource.onopen = () => console.info("Stream opened");

  //   eventSource.onerror = () => {
  //     console.error("Error receiving stream");
  //     eventSource.close();
  //   };

  //   setUserMessage("");
  // };

  const handleVitalsChat = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userMessage.trim()) return;

    // append the user message
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);

    const url = `${process.env.NEXT_PUBLIC_VITALS_API_URL}?message=${encodeURIComponent(
      userMessage
    )}`;
    const eventSource = new EventSource(url);
    let buffer = "";

    eventSource.onmessage = (event) => {
      buffer += event.data;
      setAssistantMessageBuffer(buffer);
    };

    eventSource.onerror = () => {
      setMessages((prev) => [...prev, { role: "assistant", text: buffer }]);
      setAssistantMessageBuffer(() => "");
      eventSource.close();
    };
  };

  return (
    <>
      <div className="relative w-full   ">
        {/* whole session interface */}

        {/* chat area */}
        {/* current height */}
        <div className="overflow-y-auto h-[calc(100vh-9.5rem)]">
          {/* the height is just temporary */}
          <div className="gap-3 w-full  pr-7 pt-5  overflow-auto">
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
                        "bg-neutral-700  w-fit text-base p-2 rounded-lg ",
                        msg.role === "user" ? "max-w-[47%]" : "max-w-[60%]"
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
                    <Card className="bg-neutral-700  w-fit text-base p-2 rounded-lg max-w-[60%] ">
                      {assistantMessageBuffer}
                    </Card>
                  </div>
                </article>
              )}
            </div>
          </div>
        </div>

        {/* lower fixed component */}
        <div className="absolute bg-neutral-800  bottom-0 pb-6 pt-3 w-full flex justify-center items-center">
          {/* input question */}
          <form onSubmit={(e) => handleVitalsChat(e)}>
            <Input
              id="vitalsInput"
              onChange={(e) => setUserMessage(e.target.value)}
              placeholder="I'd like to..."
              className="w-[26rem] h-12"
            />
          </form>
        </div>
      </div>
    </>
  );
}
