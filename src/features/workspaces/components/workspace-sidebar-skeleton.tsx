import { Skeleton } from "@/components/ui/skeleton";

interface WorkspaceSidebarSkeletonProps {
  rows?: number;
}

export default function WorkspaceSidebarSkeleton({
  rows = 4,
}: WorkspaceSidebarSkeletonProps) {
  return (
    <div className="space-y-2">
      {Array.from({ length: rows }).map((_, index) => (
        <Skeleton key={index} className="h-9 w-full rounded-lg" />
      ))}
    </div>
  );
}
