"use client";

import { useState } from "react";

import { useDeleteConversationSummary } from "./use-delete-conversation-summary";

export function useDeleteConversationSummaryController() {
  const [artifactId, setArtifactId] = useState<number | null>(null);

  const mutation = useDeleteConversationSummary();

  function openDelete(artifactId: number) {
    setArtifactId(artifactId);
  }

  function closeDelete() {
    if (mutation.isPending) {
      return;
    }

    setArtifactId(null);
  }

  function confirmDelete(workspaceId: number, documentId: number) {
    if (artifactId === null) {
      return;
    }

    mutation.mutate(
      {
        workspaceId,
        documentId,
        artifactId,
      },
      {
        onSuccess() {
          setArtifactId(null);
        },
      },
    );
  }

  return {
    artifactId,
    isOpen: artifactId !== null,
    isDeleting: mutation.isPending,
    openDelete,
    closeDelete,
    confirmDelete,
  };
}
