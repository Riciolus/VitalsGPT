import React from "react";
import SessionHistory from "../features/sessionHistory/SessionHistory";
import { useSession } from "next-auth/react";
import SignInMessage from "../features/sessionHistory/SignInMessage";

const SessionHistoryWrapper = () => {
  const { status } = useSession();

  return <>{status === "authenticated" ? <SessionHistory /> : <SignInMessage />}</>;
};

export default SessionHistoryWrapper;
