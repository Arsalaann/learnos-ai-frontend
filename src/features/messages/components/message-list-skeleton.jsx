"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function MessageListSkeleton() {
  return (
    <div className="w-full flex-1 space-y-6 py-12">
      <div className="mx-auto flex w-full justify-end px-6">
        <Skeleton className="h-12 w-2/3 rounded-2xl" />
      </div>

      <div className="mx-auto flex w-full justify-start px-6">
        <div className="w-3/4 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>

      <div className="mx-auto flex max-w-3xl justify-end px-6">
        <Skeleton className="h-12 w-1/2 rounded-2xl" />
      </div>

      <div className="mx-auto flex max-w-3xl justify-start px-6">
        <div className="w-2/3 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </div>
    </div>
  );
}
