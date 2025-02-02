import { UserChatSession } from "@/components/features/sessionHistory/SessionHistory";
import { create } from "zustand";

type CounterState = {
  userChatSession: UserChatSession[];
  searchHistory: UserChatSession[];
  query: string;
  setUserChatSession: (userChatSession: UserChatSession[]) => void;
  // renameUserChatSession: (sessionId: string, newTitle: string) => void;
  updateUserChatSession: (sessionId: string, session: UserChatSession) => void;
  deleteUserChatSession: (sessionId: string) => void;
  setSearchHistory: (query: string) => void;
  clearSearchHistory: () => void;
};

const useChatSession = create<CounterState>((set) => ({
  userChatSession: [],
  searchHistory: [],
  query: "",

  setUserChatSession: (newSession) =>
    set((state) => ({
      userChatSession: [...newSession, ...state.userChatSession],
    })),

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

  setSearchHistory: (query) => {
    set((state) => ({
      query,
      searchHistory: state.userChatSession
        .filter(
          (session) => session.title && session.title.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 10),
    }));
  },

  clearSearchHistory: () => set({ searchHistory: [], query: "" }),
}));

export default useChatSession;
