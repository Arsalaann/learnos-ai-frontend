"use client";

import ConfirmDialog from "@/components/dialogs/confirm-dialog";

import { useDeleteConversationController } from "../hooks/use-delete-conversation-controller";

import type { Conversation } from "../types/conversation";

interface Props {
  workspaceId: number;
  conversation: Conversation;
  onClose: () => void;
}

export default function DeleteConversationDialog({
  workspaceId,
  conversation,
  onClose,
}: Props) {
  const { onDelete, deleteConversationMutation } =
    useDeleteConversationController({
      workspaceId,
      conversation,
      onClose,
    });

  return (
    <ConfirmDialog
      open
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
      title="Delete Conversation"
      description="This conversation and all of its messages will be permanently deleted."
      actionLabel="Delete Conversation"
      loading={deleteConversationMutation.isPending}
      onConfirm={onDelete}
    />
  );
}
