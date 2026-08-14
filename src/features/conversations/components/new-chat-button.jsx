"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { workspaceRoutes } from "@/features/workspaces/lib/workspace-routes";

export default function NewChatButton() {
  const router = useRouter();
  const workspaceId = useWorkspaceId();

  const draftPath = workspaceRoutes.detail(workspaceId);
  // const isDraftChat = pathname === draftPath;

  return (
    <Button
      className="h-12 justify-start w-full rounded-full text-interactive bg-interactive/10 hover:bg-interactive/15 hover:text-interactive dark:hover:bg-interactive/15 dark:hover:text-interactive"
      variant="ghost"
      onClick={() => router.push(draftPath)}
    >
      <Plus className="mr-2 h-4 w-4" />
      New Conversation
    </Button>
  );
}
