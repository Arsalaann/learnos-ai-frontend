"use client";

import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query-keys";

import { getQuizzes } from "../api/document-artifact-api";

export function useQuizzes(workspaceId: number, documentId: number | null) {
  return useQuery({
    queryKey: queryKeys.documentArtifacts.quizzes(workspaceId, documentId ?? 0),
    queryFn: () => getQuizzes(workspaceId, documentId as number),
    enabled: documentId !== null,
  });
}
