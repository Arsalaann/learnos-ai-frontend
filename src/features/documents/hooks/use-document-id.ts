"use client";

import { useParams } from "next/navigation";

export function useDocumentId(): number | null {
  const params = useParams();

  if (!params.documentId) {
    return null;
  }

  const documentId = Number(params.documentId);

  return Number.isFinite(documentId) ? documentId : null;
}
