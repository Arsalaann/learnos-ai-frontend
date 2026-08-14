"use client";

import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useDocumentId } from "@/features/documents/hooks/use-document-id";

import { useSummaryController } from "../hooks/use-summary-controller";

import SummaryLoading from "./summary-loading";
import SummaryError from "./summary-error";
import SummaryPanel from "./summary-panel";

export default function SummaryContainer() {
  const workspaceId = useWorkspaceId();
  const documentId = useDocumentId();

  if (!documentId) {
    return (
      <div className="flex w-full flex-1 items-center justify-center overflow-y-auto">
        <p className="text-muted-foreground">No document selected.</p>
      </div>
    );
  }

  const {
    documentSummary,
    conversationSummaries,
    isLoadingDocumentSummary,
    isLoadingConversationSummaries,
    isGeneratingDocumentSummary,
    isGeneratingConversationSummary,
    isRegeneratingConversationSummary,
    documentSummaryError,
    conversationSummariesError,
    generateDocumentSummary,
    generateConversationSummary,
    regenerateConversationSummary,
    deletingArtifactId,
    deleteConversationSummary,
  } = useSummaryController({
    workspaceId,
    documentId,
  });

  if (isLoadingDocumentSummary) {
    return <SummaryLoading />;
  }

  if (documentSummaryError) {
    return <SummaryError onRetry={generateDocumentSummary} />;
  }

  return (
    <SummaryPanel
      documentSummary={documentSummary}
      conversationSummaries={conversationSummaries}
      isLoadingConversationSummaries={isLoadingConversationSummaries}
      isGeneratingDocumentSummary={isGeneratingDocumentSummary}
      isGeneratingConversationSummary={isGeneratingConversationSummary}
      isRegeneratingConversationSummary={isRegeneratingConversationSummary}
      conversationSummariesError={conversationSummariesError}
      deletingArtifactId={deletingArtifactId}
      onRegenerateDocumentSummary={generateDocumentSummary}
      onGenerateConversationSummary={generateConversationSummary}
      onRegenerateConversationSummary={regenerateConversationSummary}
      onDeleteConversationSummary={deleteConversationSummary}
    />
  );
}
