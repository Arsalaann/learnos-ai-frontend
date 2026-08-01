"use client";

import { usePathname } from "next/navigation";

import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

import { documentRoutes } from "../lib/document-routes";
import { useDocumentId } from "./use-document-id";

export interface DocumentTab {
  label: string;
  href: string;
  isActive: boolean;
}

export function useDocumentTabs() {
  const pathname = usePathname();

  const workspaceId = useWorkspaceId();
  const documentId = useDocumentId();

  if (!documentId) {
    return {
      tabs: [],
    };
  }

  const tabs: DocumentTab[] = [
    {
      label: "Summary",
      href: documentRoutes.summary(workspaceId, documentId),
      isActive: pathname === documentRoutes.summary(workspaceId, documentId),
    },
    {
      label: "Chat",
      href: documentRoutes.chat(workspaceId, documentId),
      isActive: pathname === documentRoutes.chat(workspaceId, documentId),
    },
  ];

  return {
    tabs,
  };
}
