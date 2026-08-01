"use client";

import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query-keys";

import { getDocument } from "../api/document-api";

export function useDocument(workspaceId: number, documentId: number) {
  return useQuery({
    queryKey: queryKeys.documents.detail(workspaceId, documentId),

    queryFn: () => getDocument(workspaceId, documentId),
  });
}
