"use client";

import ThemeProvider from "./theme-provider";
import QueryProvider from "./query-provider";
import AuthProvider from "@/features/auth/context/auth-context";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <QueryProvider>
        <AuthProvider>{children}</AuthProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
