import { Message } from "../VitalsChat";
import ChatArea from "./chatArea";
import { useEffect, useRef } from "react";
import useChatSession from "@/store/useChatSessionStore";
import { useSession } from "next-auth/react";
import { generateTitle, getChatSession, handleEventSource } from "@/lib/utils";

const ChatAreaWrapper = ({
  sessionId,
  messages,
  assistantMessageBuffer,
  setMessages,
  setAssistantMessageBuffer,
}: {
  sessionId: string;
  messages: Message[];
  assistantMessageBuffer: string;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setAssistantMessageBuffer: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const renameUserChatSession = useChatSession((state) => state.renameUserChatSession);
  const { status } = useSession();
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  // sessionId

  // scroll into view
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "start",
      });
    }
  }, [messages, assistantMessageBuffer]); // Scrolls to bottom whenever `messages` change

  useEffect(() => {
    const initialMessage = sessionStorage.getItem("InitMsg");
    // handle user first message from VitalsMenu.tsx
    if (initialMessage) {
      setMessages((prev) => [...prev, { role: "user", text: initialMessage }]);

      sessionStorage.setItem("InitMsg", "");

      const handleInitialMessage = async () => {
        try {
          const initialAssistantResponse = await handleEventSource(
            initialMessage,
            setMessages,
            setAssistantMessageBuffer,
            sessionId
          );

          // generate a title if user is in authenticated.
          if (status === "authenticated") {
            generateTitle(initialAssistantResponse, sessionId, renameUserChatSession);
          }
        } catch (error) {
          console.error("Error handling EventSource:", error);
        }
      };

      handleInitialMessage(); // Call async function
    }

    // handle user access session from sidebar.
    else {
      if (status === "authenticated") {
        getChatSession(sessionId)
          .then((messagesFromDb) => {
            setMessages((prev) => [...prev, ...messagesFromDb]);
          })
          .catch((error) => {
            console.error("Error fetching chat session:", error);
          });
      }
    }
  }, [sessionId, status, renameUserChatSession, setAssistantMessageBuffer, setMessages]);

  return (
    <div className="scrollbar overflow-y-auto h-[calc(100vh-9.5rem)]">
      {/* the height is just temporary */}
      <div
        ref={chatContainerRef}
        className="gap-3 w-full  px-7 pt-5 overflow-y-auto overflow-x-hidden"
      >
        <ChatArea assistantMessageBuffer={assistantMessageBuffer} messages={messages} />
      </div>
    </div>
  );
};

export default ChatAreaWrapper;
