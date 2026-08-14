"use client";

import GuestHomePage from "@/components/guest/home-page";

import { useDefaultWorkspaceRedirect } from "@/features/workspaces/hooks/use-default-workspace-redirect";

export default function HomePage() {
  const { isAuthenticated, isInitializing, isPending, isError } =
    useDefaultWorkspaceRedirect();

  if (isInitializing || (isAuthenticated && isPending)) {
    return null;
  }

  if (!isAuthenticated) {
    return <GuestHomePage />;
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-destructive">
          We couldn't load your workspace.
        </p>
      </div>
    );
  }

  return null;
}
