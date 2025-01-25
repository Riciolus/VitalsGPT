import { UserChatSession } from "@/components/features/sessionHistory/SessionHistory";
import { create } from "zustand";

interface CounterState {
  userChatSession: UserChatSession[];
  setUserChatSession: (userChatSession: UserChatSession[]) => void;
  // renameUserChatSession: (sessionId: string, newTitle: string) => void;
  updateUserChatSession: (sessionId: string, session: UserChatSession) => void;
  deleteUserChatSession: (sessionId: string) => void;
}

const useChatSession = create<CounterState>((set) => ({
  userChatSession: [],

  setUserChatSession: (newSession) =>
    set((state) => ({
      userChatSession: [...newSession, ...state.userChatSession],
    })),

  // renameUserChatSession: (sessionId, newTitle) =>
  //   set((state) => ({
  //     userChatSession: state.userChatSession.map((session) =>
  //       session.sessionId === sessionId ? { ...session, title: newTitle } : session
  //     ),
  //   })),

  updateUserChatSession: (sessionId, newSessionData) =>
    set((state) => ({
      userChatSession: state.userChatSession.map((session) =>
        session.sessionId === sessionId ? { ...session, ...newSessionData } : session
      ),
    })),

  deleteUserChatSession: (sessionId) => {
    set((state) => ({
      userChatSession: state.userChatSession.filter((session) => session.sessionId !== sessionId),
    }));
  },
}));

export default useChatSession;
