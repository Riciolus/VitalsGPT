import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/wrappers/ThemeProvider";
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "VitalsGPT",
  description:
    "VitalsGPT is an intelligent assistant for monitoring and analyzing health data, offering personalized insights and recommendations.",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
          <Navbar />
          <main className="h-screen">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
