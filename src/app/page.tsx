"use client";

import ChatInterface from "@/components/features/chat/VitalsChat";
import Sidebar from "@/components/layout/Sidebar";

export default function ThemeToggle() {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <ChatInterface />
    </div>
  );
}
