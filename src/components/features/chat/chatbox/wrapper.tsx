import { handleVitalsChat } from "@/lib/utils";
import Chatbox from "./chatbox";
import { useMessageStore } from "@/store/useMessagesStore";
import { useState } from "react";
import { useSession } from "next-auth/react";
import useChatSession from "@/store/useChatSessionStore";

const ChatboxWrapper = ({
  sessionId,
  setAssistantMessageBuffer,
}: {
  sessionId: string;
  setAssistantMessageBuffer: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [userMessage, setUserMessage] = useState<string>("");

  const { status } = useSession();

  const appendMessage = useMessageStore((state) => state.appendMessage);
  const updateUserChatSession = useChatSession((state) => state.updateUserChatSession);

  return (
    <div className="absolute bg-background bottom-0 pb-6 pt-3 w-full flex justify-center text-neutral-500 dark:text-neutral-400 items-center">
      {/* input question */}
      <form
        onSubmit={(e) =>
          handleVitalsChat(
            e,
            status,
            sessionId,
            userMessage,
            appendMessage,
            setUserMessage,
            setAssistantMessageBuffer,
            updateUserChatSession
          )
        }
      >
        <Chatbox
          placeholder="Message VitalsGPT"
          setUserMessage={setUserMessage}
          userMessage={userMessage}
        />
      </form>
    </div>
  );
};

export default ChatboxWrapper;
