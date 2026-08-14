"use client";

import Image from "next/image";
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
  const isPdf = document.contentType === "application/pdf";
  const icon = isPdf ? "/pdf.png" : "/docx.png";
  const iconAlt = isPdf ? "PDF" : "DOCX";

  return (
    <div
      className={cn(
        "flex items-center space-between rounded-none pl-3 text-sm transition-colors whitespace-nowrap truncate",
        isActive
          ? "bg-muted-foreground/15 font-medium"
          : "hover:bg-muted-foreground/10",
      )}
    >
      <Link
        href={documentRoutes.detail(workspaceId, document.id)}
        className="flex min-w-0 flex-1 items-center gap-3 py-2 pr-2 text-sm font-medium"
      >
        <Image
          src={icon}
          alt={iconAlt}
          width={28}
          height={28}
          className="shrink-0"
        />

        <span className="truncate max-w-65">
          {removeFileExtension(document.originalFilename)}
        </span>
      </Link>

      <DeleteDocumentDialog document={document} />
    </div>
  );
}
