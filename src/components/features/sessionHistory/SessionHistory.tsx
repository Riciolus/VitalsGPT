import { cn } from "@/lib/utils";
import useChatSession from "@/store/useChatSessionStore";
import Link from "next/link";
import { useEffect } from "react";

export interface UserChatSession {
  sessionId: string; // or number, depending on your actual data type
  title: string;
}

const getUserChatSession = async () => {
  const response = await fetch(`/api/session`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json", // Ensure the content type is JSON
    },
  });

  const data = await response.json();

  return data;
};

const SessionHistory = () => {
  const userChatSession = useChatSession((state) => state.userChatSession);
  const setUserChatSession = useChatSession((state) => state.setUserChatSession);

  useEffect(() => {
    getUserChatSession()
      .then((res) => {
        setUserChatSession(res);
      })
      .catch((error) => console.log(error));
  }, [setUserChatSession]);

  return (
    <div className="no-scrollbar h-full overflow-y-auto">
      <div className="flex flex-col gap-1.5 text-sm font-medium text-neutral-600 dark:text-neutral-300/80 ">
        {userChatSession &&
          userChatSession.map((message, index) => (
            <Link
              href={`/chat/${message.sessionId}`}
              key={index}
              className={cn(
                "text-left  hover:dark:bg-neutral-700/50 hover:bg-neutral-200/50 px-2 py-2 ps-2 rounded-lg",
                message.title === "New Chat" && "animate-pulse"
              )}
            >
              <span className="line-clamp-1 whitespace-pre-line text-ellipsis">
                {message.title}
              </span>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default SessionHistory;
