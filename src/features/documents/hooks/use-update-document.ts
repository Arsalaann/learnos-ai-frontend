"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query-keys";

import { updateDocument } from "../api/document-api";

interface UpdateDocumentVariables {
  workspaceId: number;
  documentId: number;
  includeInWorkspaceContext: boolean;
}

export function useUpdateDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      workspaceId,
      documentId,
      includeInWorkspaceContext,
    }: UpdateDocumentVariables) =>
      updateDocument(workspaceId, documentId, includeInWorkspaceContext),

    onSuccess: (_, { workspaceId }) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.documents.all(workspaceId),
      });
    },
  });
}
