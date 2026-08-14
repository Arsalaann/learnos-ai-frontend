"use client";

import Image from "next/image";
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

    event.target.value = "";
  }

  function getFileIcon(file: File) {
    return file.type === "application/pdf" ? "/pdf.png" : "/docx.png";
  }

  function getFileType(file: File) {
    return file.type === "application/pdf" ? "PDF" : "DOCX";
  }

  return (
    <>
      <input
        disabled={disabled}
        ref={inputRef}
        type="file"
        accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        className="hidden"
        onChange={handleChange}
      />

      {!value ? (
        <div className="space-y-5">
          <div className="flex items-center justify-center gap-5">
            <div className="text-center">
              <p className="mb-4 tracking-widest text-xs text-muted-foreground">
                Supported types
              </p>

              <div className="flex items-center justify-center gap-4">
                <div className="flex flex-col items-center gap-1">
                  <Image src="/pdf.png" alt="PDF" width={40} height={40} />
                  <span className="text-xs text-muted-foreground">PDF</span>
                </div>

                <div className="flex flex-col items-center gap-1">
                  <Image src="/docx.png" alt="DOCX" width={40} height={40} />
                  <span className="text-xs text-muted-foreground">DOCX</span>
                </div>
              </div>
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            className="h-10 w-full rounded-none"
            onClick={openFilePicker}
            disabled={disabled}
          >
            Select Document
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-4 rounded-none border bg-muted/40 p-4">
            <Image
              src={getFileIcon(value)}
              alt={getFileType(value)}
              width={48}
              height={48}
              className="shrink-0"
            />

            <div className="min-w-0">
              <p className="truncate font-medium">{value.name}</p>

              <p className="text-sm text-muted-foreground">
                {getFileType(value)} · {formatFileSize(value.size)}
              </p>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="h-10 w-full rounded-none"
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
