"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Check, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { removeFileExtension } from "@/lib/remove-file-extension";

import { documentRoutes } from "@/features/documents/lib/document-routes";
import { useReprocessDocument } from "@/features/documents/hooks/use-reprocess-document";

import type { Document } from "@/features/documents/types/document";

import DeleteDocumentDialog from "@/features/documents/components/delete-document-dialog";

interface DocumentSidebarItemProps {
  workspaceId: number;
  document: Document;
  isActive: boolean;
}

function DocumentProgress({ progress }: { progress: number | null }) {
  const size = 34;
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const normalizedProgress = Math.min(Math.max(progress ?? 0, 0), 100);
  const offset = circumference - (normalizedProgress / 100) * circumference;

  return (
    <div className="relative flex size-9 shrink-0 items-center justify-center">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
        aria-hidden="true"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-muted-foreground/15"
        />

        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="text-primary transition-[stroke-dashoffset] duration-500 ease-out"
        />
      </svg>

      <span className="absolute inset-0 flex items-center justify-center text-[0.55rem] font-semibold tabular-nums text-foreground">
        {Math.round(normalizedProgress)}%
      </span>
    </div>
  );
}

function formatProcessingStage(stage: Document["stage"]): string {
  if (!stage) {
    return "Preparing";
  }

  return stage.charAt(0).toUpperCase() + stage.slice(1);
}

export default function DocumentSidebarItem({
  workspaceId,
  document,
  isActive,
}: DocumentSidebarItemProps) {
  const [hasSeenReady, setHasSeenReady] = useState(true);

  const isPdf = document.contentType === "application/pdf";
  const icon = isPdf ? "/pdf.png" : "/docx.png";
  const iconAlt = isPdf ? "PDF" : "DOCX";

  const isProcessing = document.status === "processing";
  const isReady = document.status === "ready";
  const isFailed = document.status === "failed";
  const isDisabled = isProcessing || isFailed;

  const reprocessMutation = useReprocessDocument();

  const readyStorageKey = `workspace:${workspaceId}:document:${document.id}:ready-seen`;

  useEffect(() => {
    if (!isReady) {
      setHasSeenReady(true);
      return;
    }

    const readySeen = sessionStorage.getItem(readyStorageKey) === "true";

    setHasSeenReady(readySeen);
  }, [isReady, readyStorageKey]);

  function handleDocumentOpen() {
    if (!isReady) {
      return;
    }

    sessionStorage.setItem(readyStorageKey, "true");
    setHasSeenReady(true);
  }

  function handleReprocess() {
    reprocessMutation.mutate({
      workspaceId,
      documentId: document.id,
    });
  }

  const documentContent = (
    <>
      <Image
        src={icon}
        alt={iconAlt}
        width={28}
        height={28}
        className="shrink-0"
      />

      <span className="min-w-0 max-w-65 flex-1 truncate">
        {removeFileExtension(document.originalFilename)}
      </span>

      {isProcessing && (
        <div className="flex shrink-0 items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">
            {formatProcessingStage(document.stage)}
          </span>

          <DocumentProgress progress={document.progress} />
        </div>
      )}

      {isReady && !hasSeenReady && (
        <span className="flex shrink-0 items-center gap-1 rounded-full border border-primary px-2 py-1 text-xs text-primary">
          <Check className="size-3.5" />
          Ready
        </span>
      )}

      {isFailed && (
        <span className="flex shrink-0 items-center rounded-full border border-destructive px-2 py-1 text-xs text-destructive">
          Failed
        </span>
      )}
    </>
  );

  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-none pl-3 text-sm whitespace-nowrap transition-colors",
        isActive
          ? "bg-muted-foreground/15 font-medium"
          : !isDisabled && "hover:bg-muted-foreground/10",
        isDisabled && "cursor-not-allowed opacity-60",
      )}
    >
      {isDisabled ? (
        <div
          className="flex min-w-0 flex-1 items-center gap-3 py-2 pr-2 text-sm font-medium"
          title={
            isProcessing
              ? `Document is ${formatProcessingStage(document.stage).toLowerCase()}`
              : document.processingError || "Document processing failed"
          }
        >
          {documentContent}
        </div>
      ) : (
        <Link
          href={documentRoutes.detail(workspaceId, document.id)}
          className="flex min-w-0 flex-1 items-center gap-3 py-2 pr-2 text-sm font-medium"
          onClick={handleDocumentOpen}
        >
          {documentContent}
        </Link>
      )}

      {isFailed && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="shrink-0 text-muted-foreground hover:bg-transparent"
          onClick={handleReprocess}
          disabled={reprocessMutation.isPending}
          title="Reprocess document"
        >
          {reprocessMutation.isPending ? (
            <div className="size-4 animate-spin rounded-full border-2 border-muted-foreground/20 border-t-muted-foreground" />
          ) : (
            <RotateCcw className="size-4" />
          )}

          <span className="sr-only">Reprocess document</span>
        </Button>
      )}

      {!isProcessing && <DeleteDocumentDialog document={document} />}
    </div>
  );
}
