"use client";

import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import { useAuth } from "../context/auth-context";

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { logout } = useAuth();

  function handleLogout() {
    logout();

    queryClient.clear();

    router.replace("/");
  }

  return handleLogout;
}
