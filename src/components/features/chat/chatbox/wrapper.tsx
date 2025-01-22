import { handleVitalsChat } from "@/lib/utils";
import Chatbox from "./chatbox";
import { Message } from "../VitalsChat";

const ChatboxWrapper = ({
  sessionId,
  userMessage,
  setMessages,
  setUserMessage,
  setAssistantMessageBuffer,
}: {
  sessionId: string;
  userMessage: string;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setUserMessage: React.Dispatch<React.SetStateAction<string>>;
  setAssistantMessageBuffer: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="absolute bg-background  bottom-0 pb-6 pt-3 w-full flex justify-center text-neutral-500 dark:text-neutral-400 items-center">
      {/* input question */}
      <form
        onSubmit={(e) =>
          handleVitalsChat(
            e,
            sessionId,
            userMessage,
            setMessages,
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
