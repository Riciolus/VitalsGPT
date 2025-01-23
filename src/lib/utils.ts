import { Message } from "@/components/features/chat/VitalsChat";
import clsx from "clsx";
import { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleVitalsChat = async (
  e: React.FormEvent<HTMLFormElement>,
  id: string,
  userMessage: string,
  appendMessage: (message: Message) => void,
  setUserMessage: React.Dispatch<React.SetStateAction<string>>,
  setAssistantMessageBuffer: React.Dispatch<React.SetStateAction<string>>
) => {
  e.preventDefault();

  setUserMessage("");

  if (!userMessage.trim()) return;

  // append the user message
  // setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
  appendMessage({ role: "user", text: userMessage });

  handleEventSource(userMessage, setAssistantMessageBuffer, id, appendMessage);
};

export const handleEventSource = (
  message: string,
  setAssistantMessageBuffer: React.Dispatch<React.SetStateAction<string>>,
  sessionId: string,
  appendMessage: (message: Message) => void
): Promise<string> => {
  return new Promise((resolve) => {
    const url = `${process.env.NEXT_PUBLIC_VITALS_API_URL}?message=${encodeURIComponent(
      message
    )}&sessionId=${sessionId}`;
    const eventSource = new EventSource(url);
    let buffer = "";

    eventSource.onmessage = (event) => {
      buffer += event.data;
      setAssistantMessageBuffer(buffer); // Buffer for live updates
    };

    eventSource.onerror = () => {
      appendMessage({ role: "assistant", text: buffer }); // Finalize message
      setAssistantMessageBuffer(""); // Clear buffer
      eventSource.close(); // Close the connection

      resolve(buffer); // Resolve with the final message buffer
    };
  });
};

export const generateTitle = async (
  initialAssistantResponse: string,
  sessionId: string,
  renameUserChatSession: (sessionId: string, newTitle: string) => void
) => {
  const response = await fetch("/api/chat/title", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Ensure the content type is JSON
    },
    body: JSON.stringify({ initialAssistantResponse, sessionId }),
  });

  const data = await response.json();

  renameUserChatSession(sessionId, data.title);
};

export const getChatSession = async (sessionId: string) => {
  const response = await fetch(`/api/session/${sessionId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json", // Ensure the content type is JSON
    },
  });
  const data = await response.json();

  return data.messages;
};
