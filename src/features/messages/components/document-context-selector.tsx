"use client";

import { Check, LoaderCircle, File } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Checkbox } from "@/components/ui/checkbox";

import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

import { useDocumentContextSelectorController } from "../hooks/use-document-context-selector-controller";

import DocumentContextSelectorSkeleton from "./document-context-selector-skeleton";

export default function DocumentContextSelector() {
  const workspaceId = useWorkspaceId();

  const { documents, isPending, updatingIds, toggleDocument } =
    useDocumentContextSelectorController(workspaceId);

  const includedCount = documents.filter(
    (document) => document.includeInWorkspaceContext,
  ).length;

  return (
    <Popover>
      <PopoverTrigger
        render={(props) => (
          <Button
            {...props}
            type="button"
            variant="secondary"
            className="h-12 w-12 rounded-full"
            press={false}
          >
            <File size={38} />
          </Button>
        )}
      />

      <PopoverContent align="start" className="w-80 p-2">
        <div className="px-2 py-2">
          <p className="text-sm font-medium">Included context</p>

          <p className="text-xs text-muted-foreground">
            Choose which documents the workspace chat can use.
          </p>
        </div>

        <div className="mt-1 border-t pt-1">
          {isPending ? (
            <DocumentContextSelectorSkeleton />
          ) : documents.length === 0 ? (
            <p className="px-2 py-4 text-center text-sm text-muted-foreground">
              No documents yet.
            </p>
          ) : (
            <div className="max-h-64 space-y-1 overflow-y-auto">
              {documents.map((document) => {
                const isUpdating = updatingIds.has(document.id);
                const isIncluded = document.includeInWorkspaceContext;

                return (
                  <button
                    key={document.id}
                    type="button"
                    disabled={isUpdating}
                    onClick={() =>
                      void toggleDocument(document.id, !isIncluded)
                    }
                    className="flex w-full min-w-0 items-center gap-3 rounded-md px-2 py-2 text-left hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Checkbox
                      checked={isIncluded}
                      disabled={isUpdating}
                      tabIndex={-1}
                      className="pointer-events-none"
                    />

                    <span className="min-w-0 flex-1 truncate text-sm">
                      {document.originalFilename}
                    </span>

                    {isUpdating ? (
                      <LoaderCircle className="h-4 w-4 shrink-0 animate-spin text-muted-foreground" />
                    ) : isIncluded ? (
                      <Check className="h-4 w-4 shrink-0 text-muted-foreground" />
                    ) : null}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {!isPending && documents.length > 0 && (
          <div className="border-t px-2 pt-2">
            <p className="text-xs text-muted-foreground">
              {includedCount} {includedCount === 1 ? "document" : "documents"}{" "}
              included
            </p>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
