import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AppProviders from "@/components/providers/app-providers";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LearnOS AI",
  description: "AI-powered learning platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground antialiased overflow-x-hidden`}
      >
        <AppProviders>
          <main className="relative min-h-screen flex-1">{children}</main>
        </AppProviders>
      </body>
    </html>
  );
}
