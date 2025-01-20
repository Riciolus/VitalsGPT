import { cn } from "@/lib/utils";
import Link from "next/link";
import { UserChatSession } from "./SessionHistory";

const SessionTitle = ({
  isActive,
  chatSession,
}: {
  isActive: boolean;
  chatSession: UserChatSession;
}) => {
  return (
    <Link
      href={`/chat/${chatSession.sessionId}`}
      className={cn(
        "  hover:dark:bg-neutral-700/50 hover:bg-neutral-200/50  px-2 py-2 ps-2 rounded-lg flex justify-between",
        chatSession.title === "New Chat" && "animate-pulse"
      )}
    >
      <span className="line-clamp-1 text-left whitespace-pre-line text-ellipsis text-neutral-600 dark:text-neutral-300/80">
        {chatSession.title}
      </span>
      {isActive && (
        <div>
          <svg
            width="18px"
            height="18px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 13.75C12.9665 13.75 13.75 12.9665 13.75 12C13.75 11.0335 12.9665 10.25 12 10.25C11.0335 10.25 10.25 11.0335 10.25 12C10.25 12.9665 11.0335 13.75 12 13.75Z"
              className="fill-neutral-600 dark:fill-neutral-300/80"
            />
            <path
              d="M12 6.75C12.9665 6.75 13.75 5.9665 13.75 5C13.75 4.0335 12.9665 3.25 12 3.25C11.0335 3.25 10.25 4.0335 10.25 5C10.25 5.9665 11.0335 6.75 12 6.75Z"
              className="fill-neutral-600 dark:fill-neutral-300/80"
            />
            <path
              d="M12 20.75C12.9665 20.75 13.75 19.9665 13.75 19C13.75 18.0335 12.9665 17.25 12 17.25C11.0335 17.25 10.25 18.0335 10.25 19C10.25 19.9665 11.0335 20.75 12 20.75Z"
              className="fill-neutral-600 dark:fill-neutral-300/80"
            />
          </svg>
        </div>
      )}
    </Link>
  );
};

export default SessionTitle;
