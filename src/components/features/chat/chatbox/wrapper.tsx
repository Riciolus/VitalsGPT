import { handleVitalsChat } from "@/lib/utils";
import Chatbox from "./chatbox";
import { useMessageStore } from "@/store/useMessagesStore";
import { memo, useCallback, useState } from "react";
import { useSession } from "next-auth/react";
import useChatSession from "@/store/useChatSessionStore";
import useModelStore from "@/store/useModelsStore";

const ChatboxWrapper = memo(
  ({
    sessionId,
    setAssistantMessageBuffer,
  }: {
    sessionId: string;
    setAssistantMessageBuffer: React.Dispatch<React.SetStateAction<string>>;
  }) => {
    const [userMessage, setUserMessage] = useState<string>("");
    const { status } = useSession();

    const appendMessage = useMessageStore(
      useCallback((state) => state.appendMessage, [])
    );
    const updateUserChatSession = useChatSession(
      useCallback((state) => state.updateUserChatSession, [])
    );
    const model = useModelStore(useCallback((state) => state.model, []));

    const handleSubmit = useCallback(
      (e: React.FormEvent<HTMLFormElement>) => {
        handleVitalsChat(
          e,
          status,
          sessionId,
          userMessage,
          appendMessage,
          setUserMessage,
          setAssistantMessageBuffer,
          updateUserChatSession,
          model
        );
      },
      [
        status,
        sessionId,
        userMessage,
        appendMessage,
        setUserMessage,
        setAssistantMessageBuffer,
        updateUserChatSession,
        model,
      ]
    );

    const handleMessageChange = useCallback((newMessage: string) => {
      setUserMessage(newMessage);
    }, []);

    return (
      <div className="pt-2.5 pb-3 bg-background w-full flex justify-center items-center text-neutral-500 dark:text-neutral-400 ">
        {/* input question */}
        <form onSubmit={handleSubmit}>
          <Chatbox
            placeholder="Message VitalsGPT"
            setUserMessage={handleMessageChange}
            userMessage={userMessage}
          />
        </form>
      </div>
    );
  }
);

ChatboxWrapper.displayName = "Chatbox";

export default ChatboxWrapper;
