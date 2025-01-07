"use client";

import ChatInterface from "@/components/features/chat/VitalsChat";
import Sidebar from "@/components/layout/Sidebar";

export default function Main() {
  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-y-hidden">
      <Sidebar />

      <ChatInterface />
    </div>
  );
}
