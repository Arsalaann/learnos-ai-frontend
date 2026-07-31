"use client";

import { createContext, useContext } from "react";

import type { AuthMode } from "../hooks/use-auth-modal-controller";

interface AuthModalContextValue {
  mode: AuthMode;
  switchMode: (mode: AuthMode) => void;
  close: () => void;
}

const AuthModalContext = createContext<AuthModalContextValue | null>(null);

interface AuthModalProviderProps {
  children: React.ReactNode;
  value: AuthModalContextValue;
}

export function AuthModalProvider({ children, value }: AuthModalProviderProps) {
  return (
    <AuthModalContext.Provider value={value}>
      {children}
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const context = useContext(AuthModalContext);

  if (!context) {
    throw new Error("useAuthModal must be used within AuthModalProvider.");
  }

  return context;
}
