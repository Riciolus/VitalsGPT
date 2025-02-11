import ChatArea from "./chatArea";
import { useCallback, useEffect, useRef } from "react";
import useChatSession from "@/store/useChatSessionStore";
import { useSession } from "next-auth/react";
import { cn, generateTitle, getChatSession, handleEventSource } from "@/lib/utils";
import { useMessageStore } from "@/store/useMessagesStore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useModelStore from "@/store/useModelsStore";
import { motion } from "framer-motion";

const ModelType: React.FC = () => {
  const model = useModelStore((state) => state.model);
  return (
    <motion.div
      initial={{ y: -20 }}
      animate={{ y: 0 }}
      className={cn(
        "absolute top-0 right-0  dark:bg-white/5 w-fit backdrop-blur-sm border-b border-l border-l-neutral-300 dark:border-l-neutral-700 px-2.5 pb-1 pt-1.5 rounded-bl-xl border-neutral-300  dark:border-neutral-600  text-sm font-mono",
        model === "zephyr-7b-alpha" && "bg-yellow-50/85",
        model === "mistral-small" && "bg-blue-50/85"
      )}
    >
      <Link
        href={
          model === "zephyr-7b-alpha"
            ? "https://huggingface.co/HuggingFaceH4/zephyr-7b-alpha"
            : "https://openrouter.ai/mistralai/mistral-small"
        }
        className={cn(
          "rounded-br-xl",
          model === "zephyr-7b-alpha" && "text-gray-700 dark:text-yellow-400",
          model === "mistral-small" && "text-gray-700 dark:text-blue-300"
        )}
      >
        {model}
      </Link>
    </motion.div>
  );
};

const ChatAreaWrapper = ({
  sessionId,
  assistantMessageBuffer,
  setAssistantMessageBuffer,
}: {
  sessionId: string;
  assistantMessageBuffer: string;
  setAssistantMessageBuffer: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const setIsLoading = useMessageStore((state) => state.setLoading);
  const setMessages = useMessageStore((state) => state.setMessages);
  const appendMessage = useMessageStore((state) => state.appendMessage);
  const updateUserChatSession = useChatSession((state) => state.updateUserChatSession);
  const model = useModelStore((state) => state.model);
  const isLoading = useMessageStore((state) => state.isLoading);
  const messages = useMessageStore((state) => state.messages);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const { status } = useSession();
  const router = useRouter();
  const modelRef = useRef(model);
  // sessionId
  const handleInitialMessage = useCallback(
    async (initialMessage: string) => {
      try {
        const initialAssistantResponse = await handleEventSource(
          initialMessage,
          setAssistantMessageBuffer,
          sessionId,
          appendMessage,
          modelRef.current // Use ref to prevent unnecessary re-renders
        );
        setIsLoading(false);

        // Generate a title if the user is authenticated
        if (status === "authenticated") {
          generateTitle(initialAssistantResponse, sessionId, updateUserChatSession);
        }
      } catch (error) {
        console.error("Error handling EventSource:", error);
      }
    },
    [
      sessionId,
      status,
      appendMessage,
      updateUserChatSession,
      setAssistantMessageBuffer,
      setIsLoading,
    ] // Dependencies that affect the function
  );

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
      handleInitialMessage(initialMessage); // Call async function
      return;
    }

    // handle user access session from sidebar.
    if (status === "authenticated") {
      setIsLoading(true);
      getChatSession(sessionId)
        .then((data) => {
          setMessages(data.messages);
          setIsLoading(false);
        })
        .catch(() => {
          router.back();
        });
    } else if (status === "unauthenticated") {
      router.replace("/");
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
    handleInitialMessage,
  ]);

  return (
    <>
      <div className="scrollbar overflow-y-auto h-[87vh]">
        <ModelType />
        {/* the height is just temporary */}
        <div
          ref={chatContainerRef}
          className="gap-3 w-full px-7 pt-5 overflow-y-auto overflow-x-hidden"
        >
          {!isLoading && (
            <ChatArea assistantMessageBuffer={assistantMessageBuffer} messages={messages} />
          )}
        </div>
      </div>
    </>
  );
};

export default ChatAreaWrapper;
