"use client";

import ChatboxWrapper from "./chatbox/wrapper";
import ChatAreaWrapper from "./chatArea/wrapper";
import { useState } from "react";
import { useParams } from "next/navigation";

export type Message = {
  role: "assistant" | "user";
  text: string;
};

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userMessage, setUserMessage] = useState<string>("");
  const [assistantMessageBuffer, setAssistantMessageBuffer] = useState<string>("");
  const { id } = useParams<{ id: string }>();

  return (
    <div className="vitals-chat-wrapper md:relative w-full">
      {/* chat area */}
      <ChatAreaWrapper
        sessionId={id}
        messages={messages}
        assistantMessageBuffer={assistantMessageBuffer}
        setAssistantMessageBuffer={setAssistantMessageBuffer}
        setMessages={setMessages}
      />

      <ChatboxWrapper
        sessionId={id}
        userMessage={userMessage}
        setUserMessage={setUserMessage}
        setMessages={setMessages}
        setAssistantMessageBuffer={setAssistantMessageBuffer}
      />
    </div>
  );
}
