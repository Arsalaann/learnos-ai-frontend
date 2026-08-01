"use client";

import { useState } from "react";

import { useDocuments } from "@/features/documents/hooks/use-documents";
import { useUpdateDocument } from "@/features/documents/hooks/use-update-document";

export function useDocumentContextSelectorController(workspaceId: number) {
  const { data: documents = [], isPending } = useDocuments(workspaceId);

  const updateDocumentMutation = useUpdateDocument();

  const [updatingIds, setUpdatingIds] = useState<Set<number>>(new Set());

  async function toggleDocument(
    documentId: number,
    includeInWorkspaceContext: boolean,
  ) {
    if (updatingIds.has(documentId)) {
      return;
    }

    setUpdatingIds((current) => {
      const next = new Set(current);
      next.add(documentId);
      return next;
    });

    try {
      await updateDocumentMutation.mutateAsync({
        workspaceId,
        documentId,
        includeInWorkspaceContext,
      });
    } finally {
      setUpdatingIds((current) => {
        const next = new Set(current);
        next.delete(documentId);
        return next;
      });
    }
  }

  return {
    documents,
    isPending,
    updatingIds,
    toggleDocument,
  };
}
