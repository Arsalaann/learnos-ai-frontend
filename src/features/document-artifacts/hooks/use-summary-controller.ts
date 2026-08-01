"use client";

import { useEffect, useCallback, useRef } from "react";

import { isNotFound } from "@/lib/http/is-not-found";

import { useGenerateSummary } from "./use-generate-summary";
import { useSummary } from "./use-summary";

interface UseSummaryControllerProps {
  workspaceId: number;
  documentId: number;
}

export function useSummaryController({
  workspaceId,
  documentId,
}: UseSummaryControllerProps) {
  const hasAttemptedGeneration = useRef(false);
  const summaryQuery = useSummary(workspaceId, documentId);
  const generateSummaryMutation = useGenerateSummary();

  const generate = useCallback(() => {
    generateSummaryMutation.mutate({
      workspaceId,
      documentId,
    });
  }, [generateSummaryMutation, workspaceId, documentId]);

  useEffect(() => {
    if (!summaryQuery.isError) {
      return;
    }

    if (!isNotFound(summaryQuery.error)) {
      return;
    }

    if (hasAttemptedGeneration.current) {
      return;
    }

    hasAttemptedGeneration.current = true;

    generate();
  }, [summaryQuery.isError, summaryQuery.error, generate]);

  useEffect(() => {
    hasAttemptedGeneration.current = false;
  }, [documentId]);

  return {
    artifact: summaryQuery.data,

    isLoading: summaryQuery.isPending && !summaryQuery.data,

    isGenerating: generateSummaryMutation.isPending,

    error:
      summaryQuery.isError && !isNotFound(summaryQuery.error)
        ? summaryQuery.error
        : null,

    generate,
  };
}
