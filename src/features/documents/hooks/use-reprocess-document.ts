import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query-keys";

import { reprocessDocument } from "../api/document-api";

import type { Document as DocumentType } from "../types/document";

interface ReprocessDocumentVariables {
  workspaceId: number;
  documentId: number;
}

export function useReprocessDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ workspaceId, documentId }: ReprocessDocumentVariables) =>
      reprocessDocument(workspaceId, documentId),

    onSuccess: (document, { workspaceId }) => {
      queryClient.setQueryData<DocumentType[]>(
        queryKeys.documents.all(workspaceId),
        (documents) => {
          if (!documents) {
            return documents;
          }

          return documents.map((existingDocument) =>
            existingDocument.id === document.id ? document : existingDocument,
          );
        },
      );
    },
  });
}
