import ChatArea from "./chatArea";
import { useEffect, useRef } from "react";
import useChatSession from "@/store/useChatSessionStore";
import { useSession } from "next-auth/react";
import { generateTitle, getChatSession, handleEventSource } from "@/lib/utils";
import { useMessageStore } from "@/store/useMessagesStore";
import { useRouter } from "next/navigation";

const ChatAreaWrapper = ({
  sessionId,
  assistantMessageBuffer,
  setAssistantMessageBuffer,
}: {
  sessionId: string;
  assistantMessageBuffer: string;
  setAssistantMessageBuffer: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const messages = useMessageStore((state) => state.messages);
  const isLoading = useMessageStore((state) => state.isLoading);
  const setIsLoading = useMessageStore((state) => state.setLoading);
  const setMessages = useMessageStore((state) => state.setMessages);
  const appendMessage = useMessageStore((state) => state.appendMessage);
  const updateUserChatSession = useChatSession((state) => state.updateUserChatSession);
  const { status } = useSession();
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
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
      appendMessage({ role: "user", text: initialMessage });

      sessionStorage.setItem("InitMsg", "");

      const handleInitialMessage = async () => {
        try {
          const initialAssistantResponse = await handleEventSource(
            initialMessage,
            setAssistantMessageBuffer,
            sessionId,
            appendMessage
          );

          setIsLoading(false);

          // generate a title if user is in authenticated.
          if (status === "authenticated") {
            generateTitle(initialAssistantResponse, sessionId, updateUserChatSession);
          }
        } catch (error) {
          console.error("Error handling EventSource:", error);
        }
      };

      handleInitialMessage(); // Call async function
    }

    // handle user access session from sidebar.
    else {
      setIsLoading(true);

      if (status === "authenticated") {
        getChatSession(sessionId)
          .then((messagesFromDb) => {
            setMessages([...messagesFromDb]);
            setIsLoading(false);
          })
          .catch(() => {
            router.back();
          });
      } else if (status === "unauthenticated") {
        router.replace("/");
      }
    }
  }, [
    sessionId,
    status,
    // renameUserChatSession,
    updateUserChatSession,
    setAssistantMessageBuffer,
    setMessages,
    appendMessage,
    setIsLoading,
    router,
  ]);

  return (
    <div className="scrollbar overflow-y-auto h-[calc(100vh-5.5rem)]">
      {/* the height is just temporary */}
      <div
        ref={chatContainerRef}
        className="gap-3 w-full  px-7 pt-5 overflow-y-auto overflow-x-hidden"
      >
        {!isLoading && (
          <ChatArea assistantMessageBuffer={assistantMessageBuffer} messages={messages} />
        )}
      </div>
    </div>
  );
};

export default ChatAreaWrapper;
