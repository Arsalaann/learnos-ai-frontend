"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/features/auth/hooks/use-auth";

import { useWorkspaces } from "./use-workspaces";
import { workspaceRoutes } from "../lib/workspace-routes";

export function useDefaultWorkspaceRedirect() {
  const router = useRouter();
  const { isAuthenticated, isInitializing } = useAuth();

  const { data: workspaces = [], isPending, isError } = useWorkspaces();

  useEffect(() => {
    if (!isAuthenticated || isInitializing || isPending || isError) {
      return;
    }

    const defaultWorkspace = workspaces.find(
      (workspace) => workspace.isDefault,
    );

    if (!defaultWorkspace) {
      return;
    }

    router.replace(workspaceRoutes.detail(defaultWorkspace.id));
  }, [isAuthenticated, isInitializing, isPending, isError, workspaces, router]);

  return {
    isAuthenticated,
    isInitializing,
    isPending,
    isError,
  };
}
