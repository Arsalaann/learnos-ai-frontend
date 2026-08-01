"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function DocumentContextSelectorSkeleton() {
  return (
    <div className="space-y-2 p-2">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center gap-3 rounded-md px-2 py-2"
        >
          <Skeleton className="h-4 w-4 rounded-sm" />
          <Skeleton className="h-4 flex-1" />
        </div>
      ))}
    </div>
  );
}
