"use client";

import { FileText, LoaderCircle, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useInsightsController } from "@/features/document-artifacts/hooks/use-insights-controller";
import { useChat } from "@/features/messages/components/chat-context";

interface DocumentChatActionsProps {
  workspaceId: number;
  documentId: number;
  isGeneratingSummary: boolean;
  isGeneratingQuiz: boolean;
  onGenerateSummary: () => void;
  onGenerateQuiz: () => void;
}

export default function DocumentChatActions({
  workspaceId,
  documentId,
  isGeneratingSummary,
  isGeneratingQuiz,
  onGenerateSummary,
  onGenerateQuiz,
}: DocumentChatActionsProps) {
  const { isInsightsReady } = useInsightsController({
    workspaceId,
    documentId,
  });

  const { isStreaming } = useChat();

  const actions = [
    {
      id: "summary",
      label: "Generate Conversation Summary",
      icon: FileText,
      isLoading: isGeneratingSummary,
      onClick: onGenerateSummary,
      variant: "ghost" as const,
      className:
        "h-10 rounded-full bg-interactive text-background hover:bg-interactive/80 dark:hover:bg-interactive/80 dark:hover:text-background",
    },
    {
      id: "quiz",
      label: "Generate Quiz",
      icon: Sparkles,
      isLoading: isGeneratingQuiz,
      onClick: onGenerateQuiz,
      variant: "ghost" as const,
      className:
        "h-10 rounded-full bg-interactive text-background hover:bg-interactive/80 dark:hover:bg-interactive/80 dark:hover:text-background",
    },
  ];

  const isGenerating = isGeneratingSummary || isGeneratingQuiz;
  const isDisabled = !isInsightsReady || isGenerating || isStreaming;

  return (
    <div className="flex flex-wrap items-center gap-2 pb-3">
      {actions.map((action) => {
        const Icon = action.icon;

        return (
          <Button
            key={action.id}
            type="button"
            size="sm"
            variant={action.variant}
            className={action.className}
            onClick={action.onClick}
            disabled={isDisabled}
          >
            {action.isLoading ? (
              <LoaderCircle className="mr-1 size-4 animate-spin" />
            ) : (
              <Icon className="mr-1 size-4" />
            )}

            {action.label}
          </Button>
        );
      })}
    </div>
  );
}
