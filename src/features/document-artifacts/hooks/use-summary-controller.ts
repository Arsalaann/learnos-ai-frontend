"use client";

import { useCallback } from "react";

import { useInsightsController } from "./use-insights-controller";
import { useConversationSummaries } from "./use-conversation-summaries";
import { useGenerateConversationSummary } from "./use-generate-conversation-summary";
import { useDeleteConversationSummary } from "./use-delete-conversation-summary";

interface UseSummaryControllerProps {
  workspaceId: number;
  documentId: number;
}

export function useSummaryController({
  workspaceId,
  documentId,
}: UseSummaryControllerProps) {
  const {
    insights,
    status: insightsStatus,
    isInsightsReady,
    isGeneratingInsights,
    isLoadingInsights,
    insightsError: documentSummaryError,
  } = useInsightsController({
    workspaceId,
    documentId,
  });

  const conversationSummariesQuery = useConversationSummaries(
    workspaceId,
    documentId,
  );

  const generateConversationSummaryMutation = useGenerateConversationSummary();

  const deleteConversationSummaryMutation = useDeleteConversationSummary();

  const generateConversationSummary = useCallback(() => {
    generateConversationSummaryMutation.mutate({
      workspaceId,
      documentId,
    });
  }, [generateConversationSummaryMutation, workspaceId, documentId]);

  const regenerateConversationSummary = useCallback(() => {
    generateConversationSummaryMutation.mutate({
      workspaceId,
      documentId,
    });
  }, [generateConversationSummaryMutation, workspaceId, documentId]);

  const deleteConversationSummary = useCallback(
    (artifactId: number) => {
      deleteConversationSummaryMutation.mutate({
        workspaceId,
        documentId,
        artifactId,
      });
    },
    [deleteConversationSummaryMutation, workspaceId, documentId],
  );

  return {
    summaryQuery: {
      data: insights?.summary,
    },

    insightsStatus,

    isInsightsReady,

    isLoadingInsights,

    isGeneratingInsights,

    conversationSummaries: conversationSummariesQuery.data ?? [],

    isLoadingConversationSummaries: conversationSummariesQuery.isPending,

    isGeneratingConversationSummary:
      generateConversationSummaryMutation.isPending,

    deletingArtifactId: deleteConversationSummaryMutation.isPending
      ? (deleteConversationSummaryMutation.variables?.artifactId ?? null)
      : null,

    documentSummaryError,

    conversationSummariesError: conversationSummariesQuery.isError
      ? conversationSummariesQuery.error
      : null,

    generateConversationSummary,

    regenerateConversationSummary,

    deleteConversationSummary,
  };
}
