"use client";

import * as React from "react";
import TextareaAutosize from "react-textarea-autosize";

import { cn } from "@/lib/utils";

function Textarea({
  className,
  minRows = 1,
  maxRows = 8,
  ...props
}: React.ComponentProps<typeof TextareaAutosize>) {
  return (
    <TextareaAutosize
      minRows={minRows}
      maxRows={maxRows}
      className={cn(
        "flex w-full rounded-md border bg-background px-3 py-2 text-sm outline-none transition-colors",
        "placeholder:text-muted-foreground",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "resize-none",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
