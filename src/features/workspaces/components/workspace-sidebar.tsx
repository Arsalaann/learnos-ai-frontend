"use client";
import Header from "@/components/layout/header";
import NewChatButton from "@/features/conversations/components/new-chat-button";
import WorkspaceConversationList from "@/features/conversations/components/workspace-conversation-list";

import { useWorkspaceId } from "../hooks/use-workspace-id";
import { useWorkspace } from "../hooks/use-workspace";

import WorkspaceDocumentList from "./workspace-document-list";

export default function WorkspaceSidebar() {
  const workspaceId = useWorkspaceId();
  const { data: workspace } = useWorkspace(workspaceId);

  return (
    <div className="flex flex-col flex-1 gap-4 overflow-y-auto p-4 pt-0 max-w-90 bg-background-default">
      <Header />
      <h1 className="truncate text-base border-b pb-3 font-semibold">
        {workspace?.title}
      </h1>

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
