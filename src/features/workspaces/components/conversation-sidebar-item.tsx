"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";

import { conversationRoutes } from "../../conversations/lib/conversation-page-routes";
import type { Conversation } from "../../conversations/types/conversation";

import ConversationSidebarMenu from "./conversation-sidebar-menu";

import { useConversationSidebarItemController } from "../hooks/use-conversation-sidebar-item-controller";

interface ConversationSidebarItemProps {
  workspaceId: number;
  conversation: Conversation;
  isActive: boolean;

  onDelete: (conversation: Conversation) => void;
}

export default function ConversationSidebarItem({
  workspaceId,
  conversation,
  isActive,
  onDelete,
}: ConversationSidebarItemProps) {
  const {
    title,
    inputRef,
    isEditing,
    setTitle,
    saveRename,
    cancelRename,
    startRename,
    renameConversationMutation,
  } = useConversationSidebarItemController({
    workspaceId,
    conversation,
  });

  return (
    <div
      className={cn(
        " flex space-between items-center rounded-none pl-3 text-sm transition-colors whitespace-nowrap truncate",
        isActive
          ? "bg-muted-foreground/15 font-medium"
          : "hover:bg-muted-foreground/10",
      )}
    >
      <div className="min-w-0 flex-1 py-4">
        {isEditing ? (
          <input
            ref={inputRef}
            value={title}
            disabled={renameConversationMutation.isPending}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={saveRename}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                saveRename();
              }

              if (e.key === "Escape") {
                e.preventDefault();
                cancelRename();
              }
            }}
            className="w-full bg-transparent text-sm font-medium outline-none"
          />
        ) : (
          <Link
            href={conversationRoutes.detail(workspaceId, conversation.id)}
            className="truncate text-sm font-medium"
          >
            <div className="w-full ">{conversation.title}</div>
          </Link>
        )}
      </div>

      <ConversationSidebarMenu
        conversation={conversation}
        onDelete={onDelete}
        onRename={startRename}
      />
    </div>
  );
}
