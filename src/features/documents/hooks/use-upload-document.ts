import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query-keys";

import { uploadDocument } from "../api/document-api";

export function useUploadDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadDocument,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.documents.all(variables.workspaceId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.workspaces.all(),
      });
    },
  });
}
