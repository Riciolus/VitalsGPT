"use client";

import { usePathname } from "next/navigation";
import Navbar from "../layout/Navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();

  // Exclude navbar for auth routes
  const isAuthRoute = pathname.startsWith("/auth/");

  return !isAuthRoute ? <Navbar /> : null;
}
