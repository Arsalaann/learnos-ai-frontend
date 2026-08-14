"use client";

import Header from "@/components/layout/header";
import NewChatButton from "@/features/conversations/components/new-chat-button";
import WorkspaceConversationList from "@/features/conversations/components/workspace-conversation-list";

import { useWorkspaceId } from "../hooks/use-workspace-id";
import { useWorkspace } from "../hooks/use-workspace";
import { useWorkspaces } from "../hooks/use-workspaces";
import { workspaceRoutes } from "../lib/workspace-routes";

import WorkspaceDocumentList from "./workspace-document-list";

export default function WorkspaceSidebar() {
  const workspaceId = useWorkspaceId();

  const { data: workspace } = useWorkspace(workspaceId);
  const { data: workspaces = [] } = useWorkspaces();

  const defaultWorkspace = workspaces.find((workspace) => workspace.isDefault);

  const homeHref = defaultWorkspace
    ? workspaceRoutes.detail(defaultWorkspace.id)
    : "/";

  return (
    <div className="flex flex-col flex-1 gap-4 overflow-hidden p-4 pt-0 max-w-90 bg-background-default">
      <Header homeHref={homeHref} />

      {!workspace?.isDefault && (
        <h1 className="truncate text-base border-b pb-4 font-semibold">
          {workspace?.title}
        </h1>
      )}

      {!workspace?.isDefault && (
        <section className="space-y-2">
          <NewChatButton />
          <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Conversations
          </h2>

          <WorkspaceConversationList />
        </section>
      )}

      <WorkspaceDocumentList />
    </div>
  );
}
