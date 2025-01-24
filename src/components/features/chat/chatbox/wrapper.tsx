import { handleVitalsChat } from "@/lib/utils";
import Chatbox from "./chatbox";
import { useMessageStore } from "@/store/useMessagesStore";
import { useState } from "react";

const ChatboxWrapper = ({
  sessionId,
  setAssistantMessageBuffer,
}: {
  sessionId: string;
  setAssistantMessageBuffer: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [userMessage, setUserMessage] = useState<string>("");

  const appendMessage = useMessageStore((state) => state.appendMessage);

  return (
    <div className="absolute bg-background  bottom-0 pb-6 pt-3 w-full flex justify-center text-neutral-500 dark:text-neutral-400 items-center">
      {/* input question */}
      <form
        onSubmit={(e) =>
          handleVitalsChat(
            e,
            sessionId,
            userMessage,
            appendMessage,
            setUserMessage,
            setAssistantMessageBuffer
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
