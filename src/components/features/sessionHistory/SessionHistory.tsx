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
    <div className="h-full mt-5 mx-2 ">
      <div className=" flex flex-col gap-4 text-sm font-medium text-neutral-600 dark:text-neutral-300 ">
        {userMessageSession &&
          userMessageSession.map((message, index) => (
            <Link
              href={`/chat/${message.sessionId}`}
              key={index}
              className="text-left line-clamp-2"
            >
              {message.title}
            </Link>
          ))}
      </div>
    </div>
  );
};

export default SessionHistory;
