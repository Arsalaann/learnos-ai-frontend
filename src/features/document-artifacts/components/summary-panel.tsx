"use client";

import { useState } from "react";
import {
  CheckCircle2,
  ChevronDown,
  FileText,
  LoaderCircle,
  MessageSquareText,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import ConfirmDialog from "@/components/dialogs/confirm-dialog";

import AssistantMessage from "@/features/messages/components/assistant-message";

import type { DocumentArtifact } from "../types/document-artifact";

interface SummaryPanelProps {
  documentSummary: DocumentArtifact | undefined;
  conversationSummaries: DocumentArtifact[];
  isLoadingConversationSummaries: boolean;
  isGeneratingConversationSummary: boolean;
  conversationSummariesError: unknown;
  deletingArtifactId: number | null;
  onDeleteConversationSummary: (artifactId: number) => void;
}

export default function SummaryPanel({
  documentSummary,
  conversationSummaries,
  isLoadingConversationSummaries,
  isGeneratingConversationSummary,
  conversationSummariesError,
  deletingArtifactId,
  onDeleteConversationSummary,
}: SummaryPanelProps) {
  const [deleteArtifactId, setDeleteArtifactId] = useState<number | null>(null);
  const [documentSummaryOpen, setDocumentSummaryOpen] = useState(true);

  const orderedConversationSummaries = [...conversationSummaries].sort(
    (a, b) => a.id - b.id,
  );

  const latestConversationSummary = orderedConversationSummaries.at(-1);

  const previousConversationSummaries = orderedConversationSummaries
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
      <div className="mx-auto ml-4 flex w-full max-w-3xl flex-1 flex-col items-start gap-10 pb-20">
        <section className="w-full overflow-hidden border border-border bg-background">
          <button
            type="button"
            onClick={() => setDocumentSummaryOpen((current) => !current)}
            className="flex w-full items-center justify-between gap-6 border-b border-border bg-muted/30 px-5 py-4 text-left transition-colors hover:bg-muted/50"
            aria-expanded={documentSummaryOpen}
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="grid size-9 shrink-0 place-items-center rounded-md bg-primary/10 text-primary">
                <FileText className="size-4" />
              </div>

              <div className="min-w-0">
                <h1 className="text-sm font-semibold">Document summary</h1>

                <p className="mt-0.5 text-xs text-muted-foreground">
                  Overview generated from the document.
                </p>
              </div>
            </div>

            <ChevronDown
              className={`size-4 shrink-0 text-muted-foreground transition-transform duration-200 ${
                documentSummaryOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {documentSummaryOpen && (
            <div className="px-5 py-6">
              {documentSummary ? (
                <AssistantMessage content={documentSummary.content} />
              ) : (
                <p className="text-sm text-muted-foreground">
                  No document summary is available.
                </p>
              )}
            </div>
          )}
        </section>

        <section className="w-full">
          <div className="mb-4 flex items-center justify-between gap-6 border-b border-border pb-4">
            <div className="flex items-center gap-3">
              <div className="grid size-9 shrink-0 place-items-center rounded-md bg-muted text-muted-foreground">
                <MessageSquareText className="size-4" />
              </div>

              <div>
                <h2 className="text-sm font-semibold">
                  Conversation summaries
                </h2>

                <p className="mt-0.5 text-xs text-muted-foreground">
                  Summaries generated from conversations about this document.
                </p>
              </div>
            </div>

            {conversationSummaries.length > 0 && (
              <span className="shrink-0 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                {conversationSummaries.length}
              </span>
            )}
          </div>

          {isLoadingConversationSummaries ? (
            <div className="px-2 py-8 text-sm text-muted-foreground">
              Loading conversation summaries...
            </div>
          ) : conversationSummariesError ? (
            <div className="px-2 py-8 text-sm text-destructive">
              Failed to load conversation summaries.
            </div>
          ) : !latestConversationSummary ? (
            <div className="border border-dashed border-border px-6 py-12 text-center">
              <p className="text-sm font-medium">
                No conversation summaries yet.
              </p>

              <p className="mx-auto mt-1 max-w-md text-xs leading-5 text-muted-foreground">
                Generate a summary when you want to capture the key points from
                your conversation.
              </p>

              {isGeneratingConversationSummary && (
                <LoaderCircle className="mr-2 size-4 animate-spin" />
              )}
            </div>
          ) : (
            <div className="overflow-hidden rounded-lg border border-border bg-background">
              <ConversationSummary
                label="Latest"
                summary={latestConversationSummary}
                onDelete={() =>
                  setDeleteArtifactId(latestConversationSummary.id)
                }
                isDeleting={deletingArtifactId === latestConversationSummary.id}
                defaultOpen
              />

              {previousConversationSummaries.map((summary, index) => (
                <ConversationSummary
                  key={summary.id}
                  label={`Previous ${
                    previousConversationSummaries.length - index
                  }`}
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

function ConversationSummary({
  label,
  summary,
  onDelete,
  isDeleting = false,
  defaultOpen = false,
}: {
  label: string;
  summary: DocumentArtifact;
  onDelete?: () => void;
  isDeleting?: boolean;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  const isLatest = label === "Latest";

  return (
    <article className="border-b border-border last:border-b-0">
      <div className="flex items-center gap-3 px-4 py-4">
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="flex min-w-0 flex-1 items-center gap-3 text-left"
          aria-expanded={open}
        >
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium">{label}</p>

              {isLatest && <CheckCircle2 className="size-4 text-primary" />}
            </div>

            <p className="mt-1 text-xs text-muted-foreground">
              {new Date(summary.createdAt).toLocaleString()}
            </p>
          </div>

          <ChevronDown
            className={`size-4 shrink-0 text-muted-foreground transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

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
      </div>

      {open && (
        <div className="border-t border-border px-5 py-6">
          <AssistantMessage content={summary.content} />
        </div>
      )}
    </article>
  );
}
