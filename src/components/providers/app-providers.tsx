"use client";

import { type ReactNode } from "react";
import ThemeProvider from "./theme-provider";
import QueryProvider from "./query-provider";

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <QueryProvider>{children}</QueryProvider>
    </ThemeProvider>
  );
}
