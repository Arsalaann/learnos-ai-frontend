"use client";

import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query-keys";

import { getQuizzes } from "../api/document-artifact-api";

export function useQuizzes(workspaceId: number, documentId: number) {
  return useQuery({
    queryKey: queryKeys.documentArtifacts.quizzes(workspaceId, documentId),
    queryFn: () => getQuizzes(workspaceId, documentId),
  });
}
