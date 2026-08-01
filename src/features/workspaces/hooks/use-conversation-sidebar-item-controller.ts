"use client";

import { useEffect, useRef, useState } from "react";

import { useRenameConversation } from "@/features/conversations/hooks/use-rename-conversation";

import type { Conversation } from "@/features/conversations/types/conversation";

interface UseConversationSidebarItemControllerProps {
  workspaceId: number;
  conversation: Conversation;
}

export function useConversationSidebarItemController({
  workspaceId,
  conversation,
}: UseConversationSidebarItemControllerProps) {
  const renameConversationMutation = useRenameConversation();

  const inputRef = useRef<HTMLInputElement>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(conversation.title);

  useEffect(() => {
    setTitle(conversation.title);
  }, [conversation.title]);

  useEffect(() => {
    if (!isEditing) {
      return;
    }

    inputRef.current?.focus();
    inputRef.current?.select();
  }, [isEditing]);

  function startRename() {
    setIsEditing(true);
  }

  function cancelRename() {
    setTitle(conversation.title);
    setIsEditing(false);
  }

  async function saveRename() {
    const newTitle = title.trim();

    if (!newTitle) {
      cancelRename();
      return;
    }

    if (newTitle === conversation.title) {
      setIsEditing(false);
      return;
    }

    await renameConversationMutation.mutateAsync({
      workspaceId,
      conversationId: conversation.id,
      title: newTitle,
    });

    setIsEditing(false);
  }

  return {
    inputRef,

    title,
    setTitle,

    isEditing,

    startRename,
    cancelRename,
    saveRename,

    renameConversationMutation,
  };
}
