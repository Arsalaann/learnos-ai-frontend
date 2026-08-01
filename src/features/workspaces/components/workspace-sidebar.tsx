"use client";

import NewChatButton from "@/features/conversations/components/new-chat-button";
import WorkspaceConversationList from "@/features/conversations/components/workspace-conversation-list";

import { useWorkspaceId } from "../hooks/use-workspace-id";
import { useWorkspace } from "../hooks/use-workspace";

import WorkspaceDocumentList from "./workspace-document-list";

export default function WorkspaceSidebarContent() {
  const workspaceId = useWorkspaceId();
  const { data: workspace } = useWorkspace(workspaceId);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="truncate text-base font-semibold">{workspace?.title}</h1>

      <section className="space-y-3">
        <NewChatButton />

        <div className="space-y-2">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Conversations
          </h2>

          <WorkspaceConversationList />
        </div>
      </section>

      <WorkspaceDocumentList />
    </div>
  );
}
