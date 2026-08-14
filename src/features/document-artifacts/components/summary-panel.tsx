"use client";

import { useState } from "react";
import { LoaderCircle, Trash2, ArrowBigDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import ConfirmDialog from "@/components/dialogs/confirm-dialog";

import AssistantMessage from "@/features/messages/components/assistant-message";

import type { DocumentArtifact } from "../types/document-artifact";

interface SummaryPanelProps {
  documentSummary: DocumentArtifact | undefined;
  conversationSummaries: DocumentArtifact[];
  isLoadingConversationSummaries: boolean;
  isGeneratingDocumentSummary: boolean;
  isGeneratingConversationSummary: boolean;
  isRegeneratingConversationSummary: boolean;
  conversationSummariesError: unknown;
  deletingArtifactId: number | null;
  onRegenerateDocumentSummary: () => void;
  onGenerateConversationSummary: () => void;
  onRegenerateConversationSummary: () => void;
  onDeleteConversationSummary: (artifactId: number) => void;
}

export default function SummaryPanel({
  documentSummary,
  conversationSummaries,
  isLoadingConversationSummaries,
  isGeneratingDocumentSummary,
  isGeneratingConversationSummary,
  isRegeneratingConversationSummary,
  conversationSummariesError,
  deletingArtifactId,
  onRegenerateDocumentSummary,
  onGenerateConversationSummary,
  onRegenerateConversationSummary,
  onDeleteConversationSummary,
}: SummaryPanelProps) {
  const [deleteArtifactId, setDeleteArtifactId] = useState<number | null>(null);

  const latestConversationSummary = conversationSummaries.at(-1);

  const previousConversationSummaries = conversationSummaries
    .slice(0, -1)
    .reverse();

  const summaryToDelete = conversationSummaries.find(
    (summary) => summary.id === deleteArtifactId,
  );

  const isDeleting =
    deleteArtifactId !== null && deletingArtifactId === deleteArtifactId;

  function handleDeleteConfirm() {
    if (deleteArtifactId === null) {
      return;
    }

    onDeleteConversationSummary(deleteArtifactId);
    setDeleteArtifactId(null);
  }

  return (
    <>
      <div className="mx-auto flex w-full flex-col pb-20 pt-8">
        <DocumentSummarySection
          summary={documentSummary}
          isGenerating={isGeneratingDocumentSummary}
          onRegenerate={onRegenerateDocumentSummary}
        />

        <section className="mt-12">
          <div className="flex cursor-pointer list-none items-center justify-between px-2 py-4 border-b-2 bg-primary/5 mb-6">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Conversation summaries
              </h2>
            </div>

            {conversationSummaries.length > 0 && (
              <span className="font-mono text-2xl text-muted-foreground">
                {String(conversationSummaries.length).padStart(2, "0")}
              </span>
            )}
          </div>

          {isLoadingConversationSummaries ? (
            <p className="text-sm text-muted-foreground">
              Loading conversation summaries...
            </p>
          ) : conversationSummariesError ? (
            <p className="text-sm text-destructive">
              Failed to load conversation summaries.
            </p>
          ) : !latestConversationSummary ? (
            <div className="flex flex-1 justify-center items-center py-10">
              <p className="text-sm text-muted-foreground">
                No conversation summary has been generated yet.
              </p>

              <Button
                type="button"
                variant="outline"
                className="mt-5"
                onClick={onGenerateConversationSummary}
                disabled={isGeneratingConversationSummary}
              >
                {isGeneratingConversationSummary && (
                  <LoaderCircle className="mr-2 size-4 animate-spin rounded-full h-10" />
                )}
                Generate Summary
              </Button>
            </div>
          ) : (
            <div className="space-y-10">
              <ConversationSummary
                label="Latest"
                summary={latestConversationSummary}
                isRegenerating={isRegeneratingConversationSummary}
                onRegenerate={onRegenerateConversationSummary}
                onDelete={() =>
                  setDeleteArtifactId(latestConversationSummary.id)
                }
                isDeleting={deletingArtifactId === latestConversationSummary.id}
              />

              {previousConversationSummaries.map((summary, index) => (
                <ConversationSummary
                  key={summary.id}
                  label={`Previous ${previousConversationSummaries.length - index}`}
                  summary={summary}
                  onDelete={() => setDeleteArtifactId(summary.id)}
                  isDeleting={deletingArtifactId === summary.id}
                />
              ))}
            </div>
          )}
        </section>
      </div>

      <ConfirmDialog
        open={deleteArtifactId !== null}
        onOpenChange={(open) => {
          if (!open && !deletingArtifactId) {
            setDeleteArtifactId(null);
          }
        }}
        title="Delete conversation summary?"
        description={
          summaryToDelete
            ? "This summary will be permanently removed. This action cannot be undone."
            : "This conversation summary will be permanently removed."
        }
        actionLabel="Delete Summary"
        loading={isDeleting}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}

function DocumentSummarySection({
  summary,
  isGenerating,
  onRegenerate,
}: {
  summary: DocumentArtifact | undefined;
  isGenerating: boolean;
  onRegenerate: () => void;
}) {
  return (
    <details className="group border-b-2 bg-primary/10 p-2 px-4">
      <summary className="flex cursor-pointer list-none items-center justify-between py-2">
        <div>
          <p className="text-2xl font-semibold tracking-tight">
            Document summary
          </p>
        </div>

        <span className="text-sm text-muted-foreground transition-transform group-open:rotate-180">
          <ArrowBigDown />
        </span>
      </summary>

      <div className="pb-8">
        {summary ? (
          <>
            <div className="mt-8 mb-4 w-full flex justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={onRegenerate}
                className="rounded-full h-10"
                disabled={isGenerating}
              >
                {isGenerating && (
                  <LoaderCircle className="mr-2 size-4 animate-spin" />
                )}
                Regenerate Document Summary
              </Button>
            </div>
            <AssistantMessage content={summary.content} />
          </>
        ) : (
          <p className="text-sm text-muted-foreground">
            No document summary is available.
          </p>
        )}
      </div>
    </details>
  );
}

function ConversationSummary({
  label,
  summary,
  isRegenerating = false,
  onRegenerate,
  onDelete,
  isDeleting = false,
}: {
  label: string;
  summary: DocumentArtifact;
  isRegenerating?: boolean;
  onRegenerate?: () => void;
  onDelete?: () => void;
  isDeleting?: boolean;
}) {
  return (
    <article className="pb-10">
      <div className="bg-muted p-2 mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-sm uppercase tracking-[0.2em] text-primary">
            {label}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            {new Date(summary.createdAt).toLocaleString()}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {onDelete && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onDelete}
              disabled={isDeleting}
              aria-label="Delete summary"
            >
              {isDeleting ? (
                <LoaderCircle className="size-4 animate-spin" />
              ) : (
                <Trash2 className="size-4" />
              )}
            </Button>
          )}

          {onRegenerate && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-full h-10"
              onClick={onRegenerate}
              disabled={isRegenerating}
            >
              {isRegenerating && (
                <LoaderCircle className="mr-2 size-4 animate-spin" />
              )}
              Regenerate Summary
            </Button>
          )}
        </div>
      </div>

      <AssistantMessage content={summary.content} />
    </article>
  );
}
