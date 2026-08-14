import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query-keys";

import { uploadDocument } from "../api/document-api";
import type { Document } from "../types/document";

export function useUploadDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadDocument,

    onSuccess: (document, variables) => {
      queryClient.setQueryData<Document[]>(
        queryKeys.documents.all(variables.workspaceId),
        (documents = []) => [...documents, document],
      );
    },
  });
}
