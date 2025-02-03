import React from "react";
import SessionHistory from "../features/sessionHistory/SessionHistory";
import { useSession } from "next-auth/react";
import SignInMessage from "../features/sessionHistory/SignInMessage";
import ChatExamples from "../sidebar/ChatExamples";

const SessionHistoryWrapper = () => {
  const { status } = useSession();

  if (status === "authenticated") {
    return <SessionHistory />;
  } else if (status === "loading") {
    return <></>;
  } else {
    return (
      <div className="flex flex-col gap-2 overflow-hidden">
        <SignInMessage />
        <ChatExamples />
      </div>
    );
  }
};

export default SessionHistoryWrapper;
