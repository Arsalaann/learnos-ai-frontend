"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import { useUser } from "@/features/user/hooks/use-user";

import { useAuth } from "./use-auth";

export function useLogoutController() {
  const router = useRouter();

  const queryClient = useQueryClient();

  const { logout } = useAuth();

  const { clearUser } = useUser();

  const onLogout = useCallback(() => {
    router.replace("/");

    logout();

    clearUser();

    queryClient.clear();
  }, [logout, clearUser, queryClient, router]);

  return {
    logout: onLogout,
  };
}
