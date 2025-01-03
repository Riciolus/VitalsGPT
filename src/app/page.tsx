"use client";

import VitalsMenu from "@/components/features/chat/VitalsMenu";
import Sidebar from "@/components/layout/Sidebar";

export default function Main() {
  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <Sidebar />

      <VitalsMenu />
    </div>
  );
}
