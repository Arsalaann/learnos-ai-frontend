import { LoaderCircle, Sparkles } from "lucide-react";

export default function SummaryLoading() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <div className="flex max-w-md flex-col items-center text-center">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">
            Generating document insights
          </h2>

          <LoaderCircle className="size-4 animate-spin text-muted-foreground" />
        </div>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          We're analyzing your document and creating a summary and topic
          overview. This may take a moment.
        </p>
      </div>
    </div>
  );
}
