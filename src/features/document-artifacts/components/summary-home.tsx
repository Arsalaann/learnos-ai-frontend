"use client";

import { useDocumentId } from "@/features/documents/hooks/use-document-id";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

import { useSummaryController } from "@/features/document-artifacts/hooks/use-summary-controller";

import SummaryLoading from "@/features/document-artifacts/components/summary-loading";
import SummaryPanel from "@/features/document-artifacts/components/summary-panel";

export default function SummaryHome() {
  const workspaceId = useWorkspaceId();
  const documentId = useDocumentId();

  if (!documentId) {
    return null;
  }

  const {
    summaryQuery,
    insightsStatus,
    isInsightsReady,
    isLoadingInsights,
    conversationSummaries,
    isLoadingConversationSummaries,
    isGeneratingConversationSummary,
    documentSummaryError,
    conversationSummariesError,
    deletingArtifactId,
    deleteConversationSummary,
  } = useSummaryController({
    workspaceId,
    documentId,
  });

  if (isLoadingInsights) {
    return <SummaryLoading />;
  }

  if (insightsStatus === "failed" || documentSummaryError) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-6">
        <div className="flex max-w-md flex-col items-center text-center">
          <h2 className="text-lg font-semibold text-destructive">
            Failed to generate document insights
          </h2>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            We couldn't generate the summary and topic overview for this
            document. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  if (!isInsightsReady) {
    return null;
  }

  return (
    <SummaryPanel
      documentSummary={summaryQuery.data}
      conversationSummaries={conversationSummaries}
      isLoadingConversationSummaries={isLoadingConversationSummaries}
      isGeneratingConversationSummary={isGeneratingConversationSummary}
      conversationSummariesError={conversationSummariesError}
      deletingArtifactId={deletingArtifactId}
      onDeleteConversationSummary={deleteConversationSummary}
    />
  );
}
