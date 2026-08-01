"use client";

import { useState } from "react";

import type { Conversation } from "../types/conversation";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

import { useConversationId } from "../hooks/use-conversation-id";
import { useConversations } from "../hooks/use-conversations";

import ConversationSidebarItem from "../../workspaces/components/conversation-sidebar-item";

import WorkspaceSidebarSkeleton from "@/features/workspaces/components/workspace-sidebar-skeleton";

import DeleteConversationDialog from "./delete-conversation-dialog";

export default function WorkspaceConversationList() {
  const workspaceId = useWorkspaceId();
  const activeConversationId = useConversationId();

  const [pendingDeleteConversation, setPendingDeleteConversation] =
    useState<Conversation | null>(null);

  const { data: conversations = [], isPending } = useConversations(workspaceId);

  const workspaceConversations = conversations.filter(
    (conversation) => conversation.conversationType === "workspace",
  );

  if (isPending) {
    return <WorkspaceSidebarSkeleton />;
  }

  if (workspaceConversations.length === 0) {
    return (
      <p className="px-2 text-sm text-muted-foreground">
        No conversations yet.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {workspaceConversations.map((conversation) => (
        <ConversationSidebarItem
          key={conversation.id}
          workspaceId={workspaceId}
          conversation={conversation}
          isActive={conversation.id === activeConversationId}
          onDelete={setPendingDeleteConversation}
        />
      ))}
      {pendingDeleteConversation && (
        <DeleteConversationDialog
          workspaceId={workspaceId}
          conversation={pendingDeleteConversation}
          onClose={() => setPendingDeleteConversation(null)}
        />
      )}
    </div>
  );
}
