"use client";

import { useParams } from "next/navigation";

export function useDocumentId() {
  const params = useParams();

  if (!params.documentId) {
    return null;
  }

  return Number(params.documentId);
}
