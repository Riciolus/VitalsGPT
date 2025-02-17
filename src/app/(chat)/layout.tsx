"use client";

import Sidebar from "@/components/layout/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-screen h-lvh flex overflow-hidden">
      <Sidebar />
      <main className="w-full">{children}</main>
    </div>
  );
}
