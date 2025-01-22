import { Message } from "@/components/features/chat/VitalsChat";
import { useState } from "react";

export const useEventSource = (
  url: string,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  setAssistantMessageBuffer: React.Dispatch<React.SetStateAction<string>>
) => {
  const [buffer, setBuffer] = useState("");

  const startEventSource = (onComplete: (finalBuffer: string) => void) => {
    const eventSource = new EventSource(url);

    eventSource.onmessage = (event) => {
      setBuffer((prev) => {
        const updatedBuffer = prev + event.data;
        setAssistantMessageBuffer(updatedBuffer);
        return updatedBuffer;
      });
    };

    eventSource.onerror = () => {
      setMessages((prev) => [...prev, { role: "assistant", text: buffer }]);
      setAssistantMessageBuffer("");
      eventSource.close();
      onComplete(buffer);
    };
  };

  return { startEventSource, buffer };
};
