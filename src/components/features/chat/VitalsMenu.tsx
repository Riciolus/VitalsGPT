"use client";

import Card from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Chatbox from "./chatbox/chatbox";
import useChatSession from "@/store/useChatSessionStore";
import { useMessageStore } from "@/store/useMessagesStore";

const categories = [
  {
    name: "Health",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.375 17V16.25C12.9608 16.25 12.625 16.5858 12.625 17H13.375ZM10.625 17H11.375C11.375 16.5858 11.0392 16.25 10.625 16.25V17ZM15 8.66667L15 7.91667H15V8.66667ZM13.4333 8.66667L13.4333 9.41667H13.4333V8.66667ZM10.5667 8.66667L10.5667 7.91667H10.5667V8.66667ZM4 3.75H20V2.25H4V3.75ZM20.25 4V17H21.75V4H20.25ZM3.75 17V4H2.25V17H3.75ZM20 3.75C20.1381 3.75 20.25 3.86193 20.25 4H21.75C21.75 3.0335 20.9665 2.25 20 2.25V3.75ZM4 2.25C3.0335 2.25 2.25 3.0335 2.25 4H3.75C3.75 3.86193 3.86193 3.75 4 3.75V2.25ZM4.97906 21.75H19.0209V20.25H4.97906V21.75ZM22.9791 16.25H13.375V17.75H22.9791V16.25ZM10.625 16.25H1.02094V17.75H10.625V16.25ZM11.375 17.3333V17H9.875V17.3333H11.375ZM12.625 17V17.3333H14.125V17H12.625ZM12.375 17.5833H11.625V19.0833H12.375V17.5833ZM12.625 17.3333C12.625 17.4714 12.5131 17.5833 12.375 17.5833V19.0833C13.3415 19.0833 14.125 18.2998 14.125 17.3333H12.625ZM9.875 17.3333C9.875 18.2998 10.6585 19.0833 11.625 19.0833V17.5833C11.4869 17.5833 11.375 17.4714 11.375 17.3333H9.875ZM19.0209 21.75C21.6327 21.75 23.75 19.6327 23.75 17.0209H22.25C22.25 18.8043 20.8043 20.25 19.0209 20.25V21.75ZM0.25 17.0209C0.25 19.6327 2.36727 21.75 4.97906 21.75V20.25C3.1957 20.25 1.75 18.8043 1.75 17.0209H0.25ZM1.75 17.0209C1.75 17.4236 1.42359 17.75 1.02094 17.75V16.25C0.595165 16.25 0.25 16.5952 0.25 17.0209H1.75ZM23.75 17.0209C23.75 16.5952 23.4048 16.25 22.9791 16.25V17.75C22.5764 17.75 22.25 17.4236 22.25 17.0209H23.75ZM12.3333 6.75C12.4714 6.75 12.5833 6.86193 12.5833 7H14.0833C14.0833 6.0335 13.2998 5.25 12.3333 5.25V6.75ZM11.6667 6.75H12.3333V5.25H11.6667V6.75ZM11.4167 7C11.4167 6.86193 11.5286 6.75 11.6667 6.75V5.25C10.7002 5.25 9.91667 6.0335 9.91667 7H11.4167ZM11.4167 8.56667V7H9.91667V8.56667H11.4167ZM9 9.41667H10.5667V7.91667H9V9.41667ZM8.75 9.66667C8.75 9.5286 8.86193 9.41667 9 9.41667V7.91667C8.0335 7.91667 7.25 8.70017 7.25 9.66667H8.75ZM8.75 10.3333V9.66667H7.25V10.3333H8.75ZM9 10.5833C8.86193 10.5833 8.75 10.4714 8.75 10.3333H7.25C7.25 11.2998 8.0335 12.0833 9 12.0833V10.5833ZM10.5667 10.5833H9V12.0833H10.5667V10.5833ZM11.4167 13V11.4333H9.91667V13H11.4167ZM11.6667 13.25C11.5286 13.25 11.4167 13.1381 11.4167 13H9.91667C9.91667 13.9665 10.7002 14.75 11.6667 14.75V13.25ZM12.3333 13.25H11.6667V14.75H12.3333V13.25ZM12.5833 13C12.5833 13.1381 12.4714 13.25 12.3333 13.25V14.75C13.2998 14.75 14.0833 13.9665 14.0833 13H12.5833ZM12.5833 11.4333V13H14.0833V11.4333H12.5833ZM15 10.5833H13.4333V12.0833H15V10.5833ZM15.25 10.3333C15.25 10.4714 15.1381 10.5833 15 10.5833V12.0833C15.9665 12.0833 16.75 11.2998 16.75 10.3333H15.25ZM15.25 9.66667V10.3333H16.75V9.66667H15.25ZM15 9.41667C15.1381 9.41667 15.25 9.5286 15.25 9.66667H16.75C16.75 8.70017 15.9665 7.91667 15 7.91667L15 9.41667ZM13.4333 9.41667H15V7.91667H13.4333V9.41667ZM12.5833 7V8.56667H14.0833V7H12.5833ZM13.4333 7.91667C13.7923 7.91667 14.0833 8.20769 14.0833 8.56667H12.5833C12.5833 9.0361 12.9639 9.41667 13.4333 9.41667L13.4333 7.91667ZM14.0833 11.4333C14.0833 11.7923 13.7923 12.0833 13.4333 12.0833V10.5833C12.9639 10.5833 12.5833 10.9639 12.5833 11.4333H14.0833ZM10.5667 12.0833C10.2077 12.0833 9.91667 11.7923 9.91667 11.4333H11.4167C11.4167 10.9639 11.0361 10.5833 10.5667 10.5833V12.0833ZM9.91667 8.56667C9.91667 8.20769 10.2077 7.91667 10.5667 7.91667L10.5667 9.41667C11.0361 9.41667 11.4167 9.0361 11.4167 8.56667H9.91667Z"
          fill="black"
          className="fill-pink-300"
        />
      </svg>
    ),
  },
  {
    name: "Diagnose",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_1607_9500)">
          <path
            d="M20 12C20 16.4183 16.4183 20 12 20M20 12C20 7.58172 16.4183 4 12 4M20 12H23M12 20C7.58172 20 4 16.4183 4 12M12 20V23M4 12C4 7.58172 7.58172 4 12 4M4 12H1M12 4V1M13.2455 1L10.7545 1M10.7545 23H13.2455M23 13.2455V10.7546M1 10.7545L1 13.2454M19.7782 4.22183L17.6569 6.34315M4.22183 19.7782L6.34315 17.6569M20.6589 5.10252L18.8975 3.34113M3.34114 18.8975L5.10252 20.6589M19.7782 19.7782L17.6569 17.6569M4.22183 4.22183L6.34315 6.34315M18.8974 20.6589L20.6588 18.8975M5.10256 3.34109L3.34118 5.10248M12 9.5C12 10.3284 11.3284 11 10.5 11C9.67157 11 9 10.3284 9 9.5C9 8.67157 9.67157 8 10.5 8C11.3284 8 12 8.67157 12 9.5ZM12 16C12 16.5523 11.5523 17 11 17C10.4477 17 10 16.5523 10 16C10 15.4477 10.4477 15 11 15C11.5523 15 12 15.4477 12 16ZM17 12C17 12.5523 16.5523 13 16 13C15.4477 13 15 12.5523 15 12C15 11.4477 15.4477 11 16 11C16.5523 11 17 11.4477 17 12Z"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="stroke-green-400"
          />
        </g>
        <defs>
          <clipPath id="clip0_1607_9500">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
  },
  {
    name: "Analyze",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_1607_9630)">
          <path
            d="M3.96425 5.95965V5.9913M19.9276 17.9322V17.9638M7.95509 5.95965V5.9913M15.9368 17.9322V17.9638M21.5323 21.5323C19.5841 23.4804 16.4124 23.4936 14.4642 21.5455L2.45455 9.53575C0.506398 7.5876 0.51956 4.41586 2.46771 2.46771C4.41586 0.519561 7.5876 0.506397 9.53575 2.45455L21.5454 14.4642C23.4936 16.4124 23.4804 19.5841 21.5323 21.5323ZM5.95967 13.0144L13.0145 5.95957L17.8157 10.7607L10.7608 17.8156L5.95967 13.0144Z"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="stroke-sky-300"
          />
        </g>
        <defs>
          <clipPath id="clip0_1607_9630">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
  },
];

const createSession = async (userId: string) => {
  const response = await fetch("api/session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
  });
  const data = await response.json();

  return data;
};

export default function VitalsMenu() {
  const [userMessage, setUserMessage] = useState<string>("");
  const setUserChatSession = useChatSession((state) => state.setUserChatSession);
  const setMessages = useMessageStore((state) => state.setMessages);
  const { status, data } = useSession();
  const router = useRouter();

  const handleStartSession = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userMessage.trim()) return;

    // clear up previous messages data from previous session.
    setMessages([]);

    if (status === "authenticated") {
      // handle chat/sessionId
      await createSession(data.user.id).then((res) => {
        if (res.status) {
          sessionStorage.setItem("InitMsg", userMessage);
          setUserChatSession([
            {
              sessionId: res.chatSessionId,
              title: "New Chat",
              updatedAt: new Date(),
            },
          ]);
          router.push(`/chat/${res.chatSessionId}`);
        } else {
          console.error("Failed creating chat session");
        }
      });
    } else {
      sessionStorage.setItem("InitMsg", userMessage);
      router.push("/chat/guest");
    }
  };

  return (
    <>
      <div className="w-full  flex flex-col justify-center items-center h-full ">
        {/* whole no session interface */}
        <div className="flex flex-col justify-center items-center gap-3   w-full h-full">
          {/* welcome greets */}
          <div className="flex flex-col items-center gap-1 ">
            <h3 className="font-semibold tracking-wide text-xl text-neutral-600 dark:text-neutral-200">
              How can I assist you today?
            </h3>
            <div className="flex gap-3">
              {categories.map((category) => {
                return (
                  <Card
                    key={category.name}
                    className="py-1 px-2  dark:text-neutral-300 text-xs flex items-center gap-2"
                  >
                    {category.icon}
                    <span>{category.name}</span>
                  </Card>
                );
              })}
            </div>
          </div>

          <div>
            {/* input question */}
            <form onSubmit={(e) => handleStartSession(e)}>
              <Chatbox
                placeholder="Should I take a multivitamin?"
                setUserMessage={setUserMessage}
                userMessage={userMessage}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
