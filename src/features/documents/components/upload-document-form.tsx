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
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="mt-4 w-full min-w-0 max-w-full space-y-6 overflow-hidden"
    >
      <div className="w-full min-w-0 max-w-full overflow-hidden">
        <Controller
          control={form.control}
          name="file"
          render={({ field }) => (
            <div className="w-full min-w-0 max-w-full overflow-hidden">
              <UploadDocumentPicker
                value={field.value ?? null}
                onChange={field.onChange}
                disabled={uploadMutation.isPending}
              />
            </div>
          )}
        />
      </div>

      <Message error={form.formState.errors.file} />

      <Button
        type="submit"
        className="h-10 w-full rounded-none"
        disabled={uploadMutation.isPending}
      >
        {uploadMutation.isPending && (
          <LoaderCircle className="mr-2 size-4 animate-spin" />
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
