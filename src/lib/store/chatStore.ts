import { create } from "zustand";

export const useChatStore = create((set) => ({
  messages: [], // Holds chat messages
  addMessage: (message: string) =>
    set((state: string) => ({ messages: [...state.messages, message] })),
  clearMessages: () => set({ messages: [] }), // Optional for clearing
}));
