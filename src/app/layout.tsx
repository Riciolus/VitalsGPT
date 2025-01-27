import type { Metadata } from "next";
import type { Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/wrappers/ThemeProvider";
import { Poppins } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  // viewport: "width=device-width, initial-scale=1, interactive-widget=resizes-content",
  title: "VitalsGPT",
  description:
    "VitalsGPT is an AI-powered web application designed to assist with medical inquiries.",
  openGraph: {
    title: "VitalsGPT",
    description: "AI-powered web application designed to assist with medical inquiries.",
    images: [
      {
        url: "/og-image.png", // Path to your OG image
        width: 1200,
        height: 630,
        alt: "Preview of your page",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VitalsGPT",
    description: "AI-powered web application designed to assist with medical inquiries.",
    images: ["/og-image.png"], // Twitter accepts an array of image URLs
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  interactiveWidget: "resizes-content",
};

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Favicon for most browsers */}
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        {/* Apple Touch Icon */}
        <link rel="apple-touch-icon" href="/icon.svg" type="image/svg+xml" />
      </head>
      <body
        className={`${poppins.className} bg-background text-foreground  overflow-hidden  antialiased   h-screen max-h-screen`}
      >
        <SessionProvider>
          <ThemeProvider attribute="class" defaultTheme="light">
            <Navbar />
            <div className="w-full h-full">{children}</div>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
