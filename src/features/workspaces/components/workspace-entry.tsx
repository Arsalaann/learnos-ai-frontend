"use client";

import Chat from "@/features/messages/components/chat";

import { useWorkspace } from "../hooks/use-workspace";
import { useWorkspaceId } from "../hooks/use-workspace-id";

import WorkspaceHome from "./workspace-home";

export default function WorkspaceEntry() {
  const workspaceId = useWorkspaceId();
  const { data: workspace, isPending, isError } = useWorkspace(workspaceId);

  if (isPending) {
    return null;
  }

  if (isError || !workspace) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-destructive">
          We couldn't load this workspace.
        </p>
      </div>
    );
  }

  if (workspace.isDefault) {
    return <WorkspaceHome />;
  }

  return (
    <div className="ml-4 flex max-w-3xl flex-1 flex-col items-start">
      <main className="flex w-full flex-1">
        <Chat
          workspaceId={workspaceId}
          conversationId={null}
          showContextSelector
        />
      </main>
    </div>
  );
}
