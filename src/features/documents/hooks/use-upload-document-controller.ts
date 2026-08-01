"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

import { useUploadDocument } from "./use-upload-document";

import {
  uploadDocumentSchema,
  type UploadDocumentFormValues,
} from "../schemas/upload-document-schema";

import type { Document } from "../types/document";

export function useUploadDocumentController(
  onSuccess?: (document: Document) => void,
) {
  const workspaceId = useWorkspaceId();

  const uploadMutation = useUploadDocument();

  const form = useForm<UploadDocumentFormValues>({
    resolver: zodResolver(uploadDocumentSchema),
    defaultValues: {
      file: undefined as never,
    },
  });

  async function onSubmit(values: UploadDocumentFormValues) {
    const document = await uploadMutation.mutateAsync({
      workspaceId,
      file: values.file,
    });

    form.reset();

    onSuccess?.(document);
  }

  return {
    form,
    uploadMutation,
    onSubmit,
  };
}
