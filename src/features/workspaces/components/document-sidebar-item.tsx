"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { removeFileExtension } from "@/lib/remove-file-extension";

import { documentRoutes } from "@/features/documents/lib/document-routes";

import type { Document } from "@/features/documents/types/document";

import DeleteDocumentDialog from "@/features/documents/components/delete-document-dialog";

interface DocumentSidebarItemProps {
  workspaceId: number;
  document: Document;
  isActive: boolean;
}

export default function DocumentSidebarItem({
  workspaceId,
  document,
  isActive,
}: DocumentSidebarItemProps) {
  return (
    <div
      className={cn(
        " flex space-between items-center rounded-md pl-3 py-1 text-sm transition-colors whitespace-nowrap truncate",
        isActive
          ? "bg-muted-foreground/15 font-medium"
          : "hover:bg-muted-foreground/10",
      )}
    >
      <Link
        href={documentRoutes.detail(workspaceId, document.id)}
        className="flex-1 truncate text-sm font-medium"
      >
        {removeFileExtension(document.originalFilename)}
      </Link>
      <DeleteDocumentDialog document={document} />
    </div>
  );
}
