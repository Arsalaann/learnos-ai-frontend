"use client";

import ThemeProvider from "./theme-provider";
import QueryProvider from "./query-provider";
import AppInitializer from "./app-initializer";

import AuthProvider from "@/features/auth/context/auth-context";
import UserProvider from "@/features/user/context/user-context";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <QueryProvider>
        <AuthProvider>
          <UserProvider>
            <AppInitializer>{children}</AppInitializer>
          </UserProvider>
        </AuthProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
