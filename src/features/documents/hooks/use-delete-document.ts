import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query-keys";

import { deleteDocument } from "../api/document-api";

interface DeleteDocumentVariables {
  workspaceId: number;
  documentId: number;
}

export function useDeleteDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ workspaceId, documentId }: DeleteDocumentVariables) =>
      deleteDocument(workspaceId, documentId),

    onSuccess: (_, { workspaceId, documentId }) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.documents.all(workspaceId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.workspaces.all(),
      });

      queryClient.removeQueries({
        queryKey: queryKeys.documents.detail(workspaceId, documentId),
      });
    },
  });
}
