"use client";

import { useCallback, useEffect, useRef } from "react";

import { useGenerateInsights } from "./use-generate-insights";
import { useInsights } from "./use-insights";
import { useInsightsStatus } from "./use-insights-status";

interface UseInsightsControllerProps {
  workspaceId: number;
  documentId: number | null;
}

export function useInsightsController({
  workspaceId,
  documentId,
}: UseInsightsControllerProps) {
  const hasStartedGeneration = useRef(false);

  const insightsQuery = useInsights(workspaceId, documentId);
  const insightsStatusQuery = useInsightsStatus(workspaceId, documentId);
  const generateInsightsMutation = useGenerateInsights();

  const generateInsights = useCallback(() => {
    if (documentId === null || generateInsightsMutation.isPending) {
      return;
    }

    generateInsightsMutation.mutate(
      {
        workspaceId,
        documentId,
      },
      {
        onSuccess(response) {
          if (response.status === "ready") {
            void insightsQuery.refetch();
          }
        },
      },
    );
  }, [documentId, workspaceId, generateInsightsMutation, insightsQuery]);

  useEffect(() => {
    hasStartedGeneration.current = false;
  }, [documentId]);

  useEffect(() => {
    if (documentId === null || hasStartedGeneration.current) {
      return;
    }

    hasStartedGeneration.current = true;
    generateInsights();
  }, [documentId, generateInsights]);

  const status = insightsStatusQuery.data?.status;

  const isGeneratingInsights =
    status === "generating" || generateInsightsMutation.isPending;

  const isInsightsReady = status === "ready" && !!insightsQuery.data;

  const isLoadingInsights =
    documentId !== null &&
    !isInsightsReady &&
    !insightsQuery.isError &&
    !insightsStatusQuery.isError &&
    !generateInsightsMutation.isError;

  const insightsError =
    status === "failed"
      ? (insightsStatusQuery.data?.error ?? "Failed to generate insights.")
      : (insightsQuery.error ?? generateInsightsMutation.error);

  return {
    insights: insightsQuery.data,
    status,
    isLoadingInsights,
    isInsightsReady,
    isGeneratingInsights,
    insightsError,
    refetchInsights: insightsQuery.refetch,
  };
}
