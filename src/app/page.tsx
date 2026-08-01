"use client";

import GuestHomePage from "@/components/guest/home-page";
import WorkspaceHome from "@/features/workspaces/components/workspace-home";

import { useAuth } from "@/features/auth/hooks/use-auth";

export default function HomePage() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <WorkspaceHome /> : <GuestHomePage />;
}
