import { Message } from "@/components/features/chat/VitalsChat";
import { create } from "zustand";

type MessageStore = {
  messages: Message[];
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  setMessages: (newMessages: Message[]) => void; // Overwrites the entire array
  appendMessage: (message: Message) => void; // Appends a single message
};

export const useMessageStore = create<MessageStore>((set) => ({
  messages: [],

  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),

  setMessages: (newMessages) => set({ messages: newMessages, isLoading: false }),
  appendMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
}));
