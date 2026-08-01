import { Button } from "@/components/ui/button";

interface SummaryErrorProps {
  onRetry: () => void;
}

export default function SummaryError({ onRetry }: SummaryErrorProps) {
  return (
    <div className="flex flex-col flex-1 overflow-y-auto w-full justify-center items-center gap-4">
      <p className="text-muted-foreground">Failed to generate summary.</p>

      <Button onClick={onRetry}>Try Again</Button>
    </div>
  );
}
