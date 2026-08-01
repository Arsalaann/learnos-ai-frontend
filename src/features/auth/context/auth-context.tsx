"use client";

import React, {
  createContext,
  useCallback,
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
  isInitializing: boolean;

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

  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const token = authStorage.getAccessToken();

    if (token) {
      setSessionState({
        accessToken: token,
      });
    }

    setIsInitializing(false);
  }, []);

  const login = useCallback((session: Session) => {
    authStorage.setAccessToken(session.accessToken);
    setSessionState(session);
  }, []);

  const logout = useCallback(() => {
    authStorage.removeAccessToken();
    setSessionState(null);
  }, []);

  const value = useMemo(
    () => ({
      session,
      isAuthenticated: session !== null,
      isInitializing,

      login,
      logout,
    }),
    [session, isInitializing, login, logout],
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
