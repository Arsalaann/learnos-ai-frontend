"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

import { documentRoutes } from "../lib/document-routes";

import type { Document } from "../types/document";

import UploadDocumentForm from "./upload-document-form";

export default function UploadDocumentDialog() {
  const workspaceId = useWorkspaceId();
  const router = useRouter();

  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (searchParams.get("upload") !== "true") {
      return;
    }

    setOpen(true);

    router.replace(pathname);
  }, [pathname, router, searchParams]);

  function handleSuccess(document: Document) {
    setOpen(false);

    requestAnimationFrame(() => {
      router.push(documentRoutes.chat(workspaceId, document.id));
    });
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
      <DialogTrigger
        render={(props) => (
          <Button {...props} size="icon" variant="ghost" className="rounded-sm">
            <Plus className="size-4" />
            <span className="sr-only">Upload document</span>
          </Button>
        )}
      />

      <DialogContent className="rounded-none">
        <DialogHeader>
          <p className="mb-4 font-mono text-[0.625rem] uppercase tracking-[0.25em] text-primary">
            Add to your desk
          </p>

          <DialogTitle className="text-2xl font-semibold tracking-[-0.02em]">
            Upload a document
          </DialogTitle>
        </DialogHeader>

        <UploadDocumentForm onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  );
}
