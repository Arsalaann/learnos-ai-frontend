import { Skeleton } from "@/components/ui/skeleton";

export default function SummaryLoading() {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-6 p-8">
      <Skeleton className="h-9 w-48" />

      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[95%]" />
        <Skeleton className="h-4 w-[92%]" />
        <Skeleton className="h-4 w-[88%]" />
      </div>

      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[90%]" />
        <Skeleton className="h-4 w-[94%]" />
      </div>

      <div className="space-y-3">
        <Skeleton className="h-4 w-[96%]" />
        <Skeleton className="h-4 w-[85%]" />
      </div>
    </div>
  );
}
