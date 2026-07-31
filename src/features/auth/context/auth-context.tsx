"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { authStorage } from "@/features/auth/lib/auth-storage";

import type { Session } from "../types/session";

interface AuthContextValue {
  session: Session | null;
  isAuthenticated: boolean;

  login: (session: Session) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSessionState] = useState<Session | null>(null);

  useEffect(() => {
    const token = authStorage.getAccessToken();
    if (token) {
      setSessionState({
        accessToken: token,
      });
    }
  }, []);

  function login(session: Session) {
    authStorage.setAccessToken(session.accessToken);
    setSessionState(session);
  }

  function logout() {
    authStorage.removeAccessToken();
    setSessionState(null);
  }

  const value = useMemo(
    () => ({
      session,
      isAuthenticated: session !== null,
      login,
      logout,
    }),
    [session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider.");
  }

  return context;
}
