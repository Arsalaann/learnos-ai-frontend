import { Button } from "@/components/ui/button";
import type { DocumentArtifact } from "../types/document-artifact";
import { LoaderCircle } from "lucide-react";
import AssistantMessage from "@/features/messages/components/assistant-message";

interface SummaryPanelProps {
  artifact: DocumentArtifact;

  onRegenerate: () => void;

  isGenerating: boolean;
}

export default function SummaryPanel({
  artifact,
  isGenerating,
  onRegenerate,
}: SummaryPanelProps) {
  return (
    <div className="mx-auto flex h-full w-full flex-col pt-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Summary</h1>

        <Button onClick={onRegenerate} disabled={isGenerating}>
          {isGenerating && (
            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
          )}
          Regenerate
        </Button>
      </div>

      <div className="whitespace-pre-wrap w-full flex-1 pb-20">
        <AssistantMessage content={artifact.content}></AssistantMessage>
      </div>
    </div>
  );
}
