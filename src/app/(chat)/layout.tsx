"use client";

import Sidebar from "@/components/layout/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="w-screen h-[calc(100vh-4rem)] flex">
        <Sidebar />
        <main className="w-full h-full">{children}</main>
      </div>
    </>
  );
}
