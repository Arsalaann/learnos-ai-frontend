"use client";

import { LoaderCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  title: string;
  description: string;

  actionLabel: string;

  loading?: boolean;

  onConfirm: () => void;
}

export default function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  actionLabel,
  loading = false,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => onOpenChange(isOpen)}>
      <DialogContent className="rounded-none">
        <DialogHeader>
          <p className="mb-4 font-mono text-[0.625rem] uppercase tracking-[0.25em] text-destructive">
            Confirmation required
          </p>

          <DialogTitle className="text-2xl font-semibold tracking-[-0.02em]">
            {title}
          </DialogTitle>

          <DialogDescription className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
            {description}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            type="button"
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="h-9 shrink-0 rounded-none"
          >
            Cancel
          </Button>

          <Button
            type="button"
            variant="destructive"
            disabled={loading}
            onClick={onConfirm}
            className="h-9 shrink-0 rounded-none"
          >
            {loading && <LoaderCircle className="mr-2 size-4 animate-spin" />}

            {actionLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
