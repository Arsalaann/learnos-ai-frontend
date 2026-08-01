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

  if (!documentId)
    return (
      <div className="flex flex-1 overflow-y-auto w-full justify-center items-center">
        <p className="text-muted-foreground">No document selected.</p>
      </div>
    );

  const { artifact, isLoading, isGenerating, error, generate } =
    useSummaryController({
      workspaceId,
      documentId,
    });

  if (isLoading) {
    return <SummaryLoading />;
  }

  if (error) {
    return <SummaryError onRetry={generate} />;
  }

  if (!artifact) {
    return null;
  }

  return (
    <SummaryPanel
      artifact={artifact}
      onRegenerate={generate}
      isGenerating={isGenerating}
    />
  );
}
