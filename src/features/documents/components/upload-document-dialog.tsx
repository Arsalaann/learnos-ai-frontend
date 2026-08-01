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

  useEffect(() => {
    if (searchParams.get("upload") !== "true") {
      return;
    }

    setOpen(true);

    router.replace(pathname);
  }, [pathname, router, searchParams]);

  const [open, setOpen] = useState(false);

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
          <Button {...props} size="icon" variant="ghost">
            <Plus className="h-4 w-4" />
          </Button>
        )}
      />

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Document</DialogTitle>

          <DialogDescription>
            Upload a PDF to begin chatting with it.
          </DialogDescription>
        </DialogHeader>

        <UploadDocumentForm onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  );
}
