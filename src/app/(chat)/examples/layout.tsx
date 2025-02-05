"use client";

import Footer from "@/components/features/examples/Footer";
import { usePathname } from "next/navigation";

const pageIndex = [
  {
    title: "General Health",
    url: "general-health",
    previous: "mental-health",
    next: "common-illnesses",
  },
  {
    title: "Common Illnesses",
    url: "common-illnesses",
    previous: "general-health",
    next: "mental-health",
  },
  {
    title: "Mental Health",
    url: "mental-health",
    previous: "common-illnesses",
    next: "general-health",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);
  const titleParams = parts[parts.length - 1]?.split("#")[0]; // Remove hash fragment

  // Find the correct page index
  const currentPage = pageIndex.find((page) => page.url === titleParams);

  return (
    <div className="scrollbar px-4 pt-10 md:px-32 py-8 overflow-auto h-full">
      {children}
      {currentPage && <Footer pageIndex={currentPage} />}
    </div>
  );
}
