import { UserChatSession } from "@/components/features/sessionHistory/SessionHistory";
import { create } from "zustand";

interface CounterState {
  userChatSession: UserChatSession[];
  setUserChatSession: (userChatSession: UserChatSession[]) => void;
  renameUserChatSession: (sessionId: string, newTitle: string) => void;
}

const useChatSession = create<CounterState>((set) => ({
  userChatSession: [],
  // activeChatSession: "",

  setUserChatSession: (newSession) =>
    set((state) => ({
      userChatSession: [...newSession, ...state.userChatSession],
    })),

  renameUserChatSession: (sessionId, newTitle) =>
    set((state) => ({
      userChatSession: state.userChatSession.map((session) =>
        session.sessionId === sessionId ? { ...session, title: newTitle } : session
      ),
    })),
}));

export default useChatSession;
