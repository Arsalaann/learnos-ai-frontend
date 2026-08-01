"use client";

import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
} from "react";

import type { User } from "../types/user";

interface UserContextValue {
  user: User | null;

  setUser: (user: User) => void;

  clearUser: () => void;
}

const UserContext = createContext<UserContextValue | null>(null);

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUserState] = useState<User | null>(null);

  const setUser = useCallback((user: User) => {
    setUserState(user);
  }, []);

  const clearUser = useCallback(() => {
    setUserState(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      setUser,
      clearUser,
    }),
    [user],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within UserProvider.");
  }

  return context;
}
