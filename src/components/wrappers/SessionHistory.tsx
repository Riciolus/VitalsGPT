import React from "react";
import SessionHistory from "../features/sessionHistory/SessionHistory";
import { useSession } from "next-auth/react";
import SignInMessage from "../features/sessionHistory/SignInMessage";

const SessionHistoryWrapper = () => {
  const { status } = useSession();

  if (status === "authenticated") {
    return <SessionHistory />;
  } else if (status === "loading") {
    return <></>;
  } else {
    return <SignInMessage />;
  }
};

export default SessionHistoryWrapper;
