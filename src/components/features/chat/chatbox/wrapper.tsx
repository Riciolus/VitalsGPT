import { handleVitalsChat } from "@/lib/utils";
import Chatbox from "./chatbox";
import { useMessageStore } from "@/store/useMessagesStore";
import { useState } from "react";
import { useSession } from "next-auth/react";
import useChatSession from "@/store/useChatSessionStore";
import useModelStore from "@/store/useModelsStore";

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
  const model = useModelStore((state) => state.model);

  return (
    <div className="pt-2.5 pb-3 bg-background w-full flex justify-center items-center text-neutral-500 dark:text-neutral-400 ">
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
            updateUserChatSession,
            model
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
