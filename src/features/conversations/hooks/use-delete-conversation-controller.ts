"use client";

import { useRouter } from "next/navigation";

import { useDeleteConversation } from "./use-delete-conversation";
import { useConversationId } from "./use-conversation-id";

import { workspaceRoutes } from "@/features/workspaces/lib/workspace-routes";

import type { Conversation } from "../types/conversation";

interface UseDeleteConversationControllerProps {
  workspaceId: number;
  conversation: Conversation;
  onClose: () => void;
}

export function useDeleteConversationController({
  workspaceId,
  conversation,
  onClose,
}: UseDeleteConversationControllerProps) {
  const router = useRouter();

  const activeConversationId = useConversationId();

  const deleteConversationMutation = useDeleteConversation();

  async function onDelete() {
    await deleteConversationMutation.mutateAsync({
      workspaceId: workspaceId, // see note below
      conversationId: conversation.id,
    });

    onClose();

    if (conversation.id === activeConversationId) {
      router.push(workspaceRoutes.detail(workspaceId));
    }
  }

  return {
    onDelete,
    deleteConversationMutation,
  };
}
