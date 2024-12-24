import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/wrappers/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import { Poppins } from "next/font/google";

export const metadata: Metadata = {
  title: "VitalsGPT",
  description:
    "VitalsGPT is an intelligent assistant for monitoring and analyzing health data, offering personalized insights and recommendations.",
};

// const inter = Inter({ subsets: ["latin"] });

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.className} bg-background text-foreground  overflow-  antialiased   h-screen max-h-screen`}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          <Navbar />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
