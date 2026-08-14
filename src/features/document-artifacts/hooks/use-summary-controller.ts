"use client";

import { useEffect, useCallback, useRef } from "react";

import { isNotFound } from "@/lib/http/is-not-found";

import { useGenerateSummary } from "./use-generate-summary";
import { useSummary } from "./use-summary";
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
  const hasAttemptedDocumentSummaryGeneration = useRef(false);

  const summaryQuery = useSummary(workspaceId, documentId);

  const conversationSummariesQuery = useConversationSummaries(
    workspaceId,
    documentId,
  );

  const generateSummaryMutation = useGenerateSummary();

  const generateConversationSummaryMutation = useGenerateConversationSummary();

  const deleteConversationSummaryMutation = useDeleteConversationSummary();

  const generateDocumentSummary = useCallback(() => {
    generateSummaryMutation.mutate({
      workspaceId,
      documentId,
    });
  }, [generateSummaryMutation, workspaceId, documentId]);

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

  useEffect(() => {
    if (!summaryQuery.isError) {
      return;
    }

    if (!isNotFound(summaryQuery.error)) {
      return;
    }

    if (hasAttemptedDocumentSummaryGeneration.current) {
      return;
    }

    hasAttemptedDocumentSummaryGeneration.current = true;

    generateDocumentSummary();
  }, [summaryQuery.isError, summaryQuery.error, generateDocumentSummary]);

  useEffect(() => {
    hasAttemptedDocumentSummaryGeneration.current = false;
  }, [documentId]);

  return {
    documentSummary: summaryQuery.data,

    conversationSummaries: conversationSummariesQuery.data ?? [],

    isLoadingDocumentSummary: summaryQuery.isPending && !summaryQuery.data,

    isLoadingConversationSummaries: conversationSummariesQuery.isPending,

    isGeneratingDocumentSummary: generateSummaryMutation.isPending,

    isGeneratingConversationSummary:
      generateConversationSummaryMutation.isPending,

    isRegeneratingConversationSummary:
      generateConversationSummaryMutation.isPending,

    deletingArtifactId: deleteConversationSummaryMutation.isPending
      ? (deleteConversationSummaryMutation.variables?.artifactId ?? null)
      : null,

    documentSummaryError:
      summaryQuery.isError && !isNotFound(summaryQuery.error)
        ? summaryQuery.error
        : null,

    conversationSummariesError: conversationSummariesQuery.isError
      ? conversationSummariesQuery.error
      : null,

    generateDocumentSummary,

    generateConversationSummary,

    regenerateConversationSummary,

    deleteConversationSummary,
  };
}
