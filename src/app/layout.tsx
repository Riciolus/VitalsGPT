import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/wrappers/ThemeProvider";
import { Poppins } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import NavbarWrapper from "@/components/wrappers/NavbarWrapper";

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
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, interactive-widget=resizes-content"
        />
      </head>
      <body
        className={`${poppins.className} bg-background text-foreground  overflow-hidden  antialiased   h-screen max-h-screen`}
      >
        <SessionProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
            <NavbarWrapper />
            <main>{children}</main>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
