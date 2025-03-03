import { Message } from "@/components/features/chat/VitalsChat";
import { UserChatSession } from "@/components/features/sessionHistory/SessionHistory";
import { Model } from "@/store/useModelsStore";
import clsx from "clsx";
import { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleVitalsChat = async (
  e: React.FormEvent<HTMLFormElement>,
  status: string,
  sessionId: string,
  userMessage: string,
  appendMessage: (message: Message) => void,
  setUserMessage: React.Dispatch<React.SetStateAction<string>>,
  setAssistantMessageBuffer: React.Dispatch<React.SetStateAction<string>>,
  updateUserChatSession: (userId: string, chatSession: UserChatSession) => void,
  model: Model
) => {
  e.preventDefault();

  if (!userMessage.trim()) return;

  setUserMessage("");

  appendMessage({ role: "user", text: userMessage });

  if (status === "authenticated") {
    updateUserChatSession(sessionId, { updatedAt: new Date().toISOString() });
  }

  handleEventSource(userMessage, setAssistantMessageBuffer, sessionId, appendMessage, model);
};

export const handleEventSource = (
  message: string,
  setAssistantMessageBuffer: React.Dispatch<React.SetStateAction<string>>,
  sessionId: string,
  appendMessage: (message: Message) => void,
  model: Model
): Promise<string> => {
  return new Promise((resolve) => {
    const url = `${process.env.NEXT_PUBLIC_VITALS_API_URL}?message=${encodeURIComponent(
      message
    )}&sessionId=${sessionId}&model=${model}`;
    const eventSource = new EventSource(url);
    let buffer = "";

    eventSource.onmessage = (event) => {
      // Properly handle markdown line breaks in the buffer
      if (event.data.trim()) {
        // If it's not just whitespace, add the content
        buffer += event.data;
      } else {
        // If it's an empty line, add a markdown paragraph break
        buffer += "\n\n";
      }

      // Clean up the buffer to ensure proper markdown formatting
      const formattedBuffer = buffer
        // Ensure proper spacing for markdown elements
        .replace(/\n(#{1,6})/g, "\n\n$1") // Headers
        .replace(/\n([*-])/g, "\n\n$1") // List items
        .replace(/\n(>)/g, "\n\n$1") // Blockquotes
        // Replace multiple newlines with exactly two
        .replace(/\n{3,}/g, "\n\n")
        .trim();

      setAssistantMessageBuffer(formattedBuffer);
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
  updateUserChatSession: (sessionId: string, NewDataSession: UserChatSession) => void
) => {
  const response = await fetch("/api/chat/title", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Ensure the content type is JSON
    },
    body: JSON.stringify({ initialAssistantResponse, sessionId }),
  });

  const titleResponse = await response.json();

  updateUserChatSession(sessionId, {
    title: titleResponse.title as string,
    updatedAt: new Date(),
  });
};

export const getChatSession = async (sessionId: string) => {
  const response = await fetch(`/api/session/${sessionId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json", // Ensure the content type is JSON
    },
  });
  const data = await response.json();
  return data;
};

export function validateSessionId(id: string, uuidRegex: RegExp) {
  if (!id || !uuidRegex.test(id)) {
    throw new Error("Invalid request: 'sessionId' is missing or not a valid UUID");
  }
}

export function formatTextWithNewlines(text: string): string {
  return text.split("").join("\n");
}
