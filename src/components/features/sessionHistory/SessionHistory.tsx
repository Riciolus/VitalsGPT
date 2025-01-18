import Link from "next/link";
import { useEffect, useState } from "react";

interface UserMessage {
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
  const [userMessageSession, setUserMessageSession] = useState<UserMessage[]>([]);

  useEffect(() => {
    getUserChatSession()
      .then((res) => setUserMessageSession(res))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="h-full mt-5">
      <div className=" flex flex-col gap-1 text-sm font-medium text-neutral-600 dark:text-neutral-300/80 ">
        {userMessageSession &&
          userMessageSession.map((message, index) => (
            <Link
              href={`/chat/${message.sessionId}`}
              key={index}
              className="text-left line-clamp-2 hover:dark:bg-neutral-700/50 hover:bg-neutral-200/50 px-2 py-2 whitespace-pre-line text-ellipsis overflow-hidden ps-2 rounded-lg"
            >
              {message.title}
            </Link>
          ))}
      </div>
    </div>
  );
};

export default SessionHistory;
