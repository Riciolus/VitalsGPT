"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Chatbox from "./chatbox/chatbox";
import useChatSession from "@/store/useChatSessionStore";
import { useMessageStore } from "@/store/useMessagesStore";
import GreetsCard from "../menu/GreetsCard";

const createSession = async (userId: string) => {
  const response = await fetch("api/session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
  });
  const data = await response.json();

  return data;
};

export default function VitalsMenu() {
  const [userMessage, setUserMessage] = useState<string>("");
  const setMessages = useMessageStore((state) => state.setMessages);
  const setUserChatSession = useChatSession((state) => state.setUserChatSession);
  const { status, data } = useSession();
  const router = useRouter();

  const text = "Should I take a multivitamin?";
  const [placeholder, setPlaceholder] = useState("");
  const indexRef = useRef(0); // Use useRef to persist index across renders

  useEffect(() => {
    const typeWriter = () => {
      if (indexRef.current <= text.length) {
        setPlaceholder(text.slice(0, indexRef.current)); // Use slicing to prevent ordering issues
        indexRef.current++;
        setTimeout(typeWriter, 70);
      }
    };

    typeWriter();
  }, []);

  const handleStartSession = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userMessage.trim()) return;

    setMessages([]);

    if (status === "authenticated") {
      // handle chat/sessionId
      await createSession(data.user.id).then((res) => {
        if (res.status) {
          sessionStorage.setItem("InitMsg", userMessage);
          setUserChatSession([
            {
              sessionId: res.chatSessionId,
              title: "New Chat",
              updatedAt: new Date(),
            },
          ]);
          router.push(`/chat/${res.chatSessionId}`);
        } else {
          console.error("Failed creating chat session");
        }
      });
    } else {
      sessionStorage.setItem("InitMsg", userMessage);
      router.push("/chat/guest");
    }
  };

  return (
    <>
      <div className="w-full  flex flex-col justify-center items-center h-full ">
        <div className="flex flex-col justify-center items-center gap-3   w-full h-full">
          {/* welcome greets */}
          <GreetsCard />

          <div>
            {/* input question */}
            <form onSubmit={(e) => handleStartSession(e)}>
              <Chatbox
                userMessage={userMessage}
                placeholder={placeholder}
                setUserMessage={setUserMessage}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
