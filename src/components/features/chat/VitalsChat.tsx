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
  const [assistantMessageBuffer, setAssistantMessageBuffer] = useState<string>("");
  const { id } = useParams<{ id: string }>();

  return (
    <div className="vitals-chat-wrapper md:relative w-full h-screen">
      {/* chat area */}
      <ChatAreaWrapper
        sessionId={id}
        assistantMessageBuffer={assistantMessageBuffer}
        setAssistantMessageBuffer={setAssistantMessageBuffer}
      />
      <ChatboxWrapper sessionId={id} setAssistantMessageBuffer={setAssistantMessageBuffer} />
    </div>
  );
}
