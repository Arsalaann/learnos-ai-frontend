"use client";

import { useEffect, useState } from "react";

import { getMe } from "@/features/user/api/user-api";
import { useUser } from "@/features/user/hooks/use-user";
import { useAuth } from "@/features/auth/hooks/use-auth";

interface AppInitializerProps {
  children: React.ReactNode;
}

export default function AppInitializer({ children }: AppInitializerProps) {
  const { session, logout } = useAuth();
  const { setUser, clearUser } = useUser();

  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    async function initialize() {
      if (!session) {
        clearUser();
        setIsInitializing(false);
        return;
      }

      try {
        const user = await getMe();

        setUser(user);
      } catch {
        logout();
      } finally {
        setIsInitializing(false);
      }
    }

    initialize();
  }, [session]);

  if (isInitializing) {
    return null;
  }

  return children;
}
