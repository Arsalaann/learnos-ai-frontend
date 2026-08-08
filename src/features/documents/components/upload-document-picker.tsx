"use client";

import { useRef } from "react";

import { Button } from "@/components/ui/button";

import { formatFileSize } from "@/lib/format-file-size";

interface UploadDocumentPickerProps {
  value: File | null;
  onChange: (file: File | null) => void;
  disabled?: boolean;
}

export default function UploadDocumentPicker({
  value,
  onChange,
  disabled,
}: UploadDocumentPickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function openFilePicker() {
    inputRef.current?.click();
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange(event.target.files?.[0] ?? null);

    // Allow selecting the same file again.
    event.target.value = "";
  }

  return (
    <>
      <input
        disabled={disabled}
        ref={inputRef}
        type="file"
        accept=".pdf,application/pdf"
        className="hidden"
        onChange={handleChange}
      />

      {!value ? (
        <Button
          type="button"
          variant="outline"
          className="w-full rounded-none h-10"
          onClick={openFilePicker}
          disabled={disabled}
        >
          Select PDF
        </Button>
      ) : (
        <div className="space-y-4">
          <div className="rounded-none border bg-muted/40 p-4">
            <p className="truncate font-medium">{value.name}</p>

            <p className="text-sm text-muted-foreground">
              {formatFileSize(value.size)}
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full rounded-none h-10"
            onClick={openFilePicker}
            disabled={disabled}
          >
            Change File
          </Button>
        </div>
      )}
    </>
  );
}
