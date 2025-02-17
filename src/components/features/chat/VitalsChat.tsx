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
    <div className="vitals-chat-wrapper md:relative flex flex-col w-full h-[100dvh]">
      {/* chat area */}
      <div className="flex-1 min-h-0">
        <ChatAreaWrapper
          sessionId={id}
          assistantMessageBuffer={assistantMessageBuffer}
          setAssistantMessageBuffer={setAssistantMessageBuffer}
        />
      </div>
      <ChatboxWrapper sessionId={id} setAssistantMessageBuffer={setAssistantMessageBuffer} />
    </div>
  );
}
