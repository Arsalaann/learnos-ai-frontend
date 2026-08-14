"use client";

import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query-keys";

import { getDocument } from "../api/document-api";

export function useDocument(workspaceId: number, documentId: number | null) {
  return useQuery({
    queryKey: queryKeys.documents.detail(workspaceId, documentId ?? 0),
    queryFn: () => {
      if (documentId === null) {
        throw new Error("Document ID is required");
      }

      return getDocument(workspaceId, documentId);
    },
    enabled: documentId !== null,
  });
}
