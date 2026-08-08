"use client";

import { Controller } from "react-hook-form";
import { LoaderCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Message } from "@/components/form/message";

import { useUploadDocumentController } from "../hooks/use-upload-document-controller";

import UploadDocumentPicker from "./upload-document-picker";

import type { Document } from "../types/document";

interface UploadDocumentFormProps {
  onSuccess?: (document: Document) => void;
}

export default function UploadDocumentForm({
  onSuccess,
}: UploadDocumentFormProps) {
  const { form, uploadMutation, onSubmit } =
    useUploadDocumentController(onSuccess);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-6">
      <Controller
        control={form.control}
        name="file"
        render={({ field }) => (
          <UploadDocumentPicker
            value={field.value ?? null}
            onChange={field.onChange}
            disabled={uploadMutation.isPending}
          />
        )}
      />

      <Message error={form.formState.errors.file} />

      <Button
        type="submit"
        className="w-full rounded-none h-10"
        disabled={uploadMutation.isPending}
      >
        {uploadMutation.isPending && (
          <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
        )}
        Upload Document
      </Button>

      {uploadMutation.isError && (
        <p className="text-center text-sm text-destructive">
          Failed to upload document.
        </p>
      )}
    </form>
  );
}
