"use client";

import ThemeButton from "@/components/features/theme/ThemeButton";
import Navbar from "@/components/layout/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <div className="absolute bottom-1.5 left-2 hidden md:flex">
        <ThemeButton />
      </div>
    </div>
  );
}
