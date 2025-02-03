import { cn } from "@/lib/utils";
import Link from "next/link";
import { UserChatSession } from "./SessionHistory";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useChatSession from "@/store/useChatSessionStore";
import PopupWrapper from "@/components/wrappers/popup";
import useSidebarStore from "@/store/useSidebarStore";

const SessionTitle = ({
  isActive,
  chatSession,
}: {
  isActive: boolean;
  chatSession: UserChatSession;
}) => {
  const [isOption, setIsOption] = useState(false);
  const deleteChatSession = useChatSession((state) => state.deleteUserChatSession);
  const setToggleSidebar = useSidebarStore((state) => state.setToggleSidebar);

  // temporary idk if this true. only for dev speed
  const router = useRouter();

  const handleDeleteChatSession = async () => {
    const response = await fetch(`/api/session/${chatSession.sessionId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (result.status) {
      deleteChatSession(chatSession.sessionId as string);

      router.push("/");
    } else {
      console.error(result.message);
    }
  };

  const handleToggleSidebar = () => {
    // sidebar will toggled off in mobile view
    if (window.innerWidth < 762) setToggleSidebar(false);
  };

  return (
    <Link
      onClick={handleToggleSidebar}
      href={`/chat/${chatSession.sessionId}`}
      aria-disabled={isActive}
      className={cn(
        "relative hover:dark:bg-neutral-700/50 hover:bg-neutral-200/50  px-2 py-2 ps-2 rounded-lg flex justify-between",
        chatSession.title === "New Chat" && "animate-pulse",
        isOption && "hover:bg-transparent hover:dark:bg-transparent"
      )}
    >
      <span className="line-clamp-1 text-left font-mono whitespace-pre-line text-ellipsis text-neutral-600 dark:text-neutral-300/80">
        📝{chatSession.title}
      </span>
      {isActive && (
        <>
          <button onClick={() => setIsOption(true)} className="relative">
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
          </button>

          {isOption && (
            <PopupWrapper isVisible={isOption} onClose={() => setIsOption(false)}>
              <div
                onClick={handleDeleteChatSession}
                className="text-red-500 dark:text-red-400 transition-colors hover:bg-red-100 dark:hover:bg-red-800/80 py-1.5 px-2 rounded-lg grid gap-1"
              >
                <span className="flex gap-2 font-normal">
                  <svg
                    width="18px"
                    height="18px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 12V17"
                      className="stroke-red-500 dark:stroke-red-400"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14 12V17"
                      className="stroke-red-500 dark:stroke-red-400"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4 7H20"
                      className="stroke-red-500 dark:stroke-red-400"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10"
                      className="stroke-red-500 dark:stroke-red-400"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                      className="stroke-red-500 dark:stroke-red-400"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Delete
                </span>
              </div>
            </PopupWrapper>
          )}
        </>
      )}
    </Link>
  );
};

export default SessionTitle;
