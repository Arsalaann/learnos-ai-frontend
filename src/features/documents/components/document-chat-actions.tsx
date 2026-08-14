"use client";

import { FileText, LoaderCircle, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

interface DocumentChatActionsProps {
  isGeneratingSummary: boolean;
  isGeneratingQuiz: boolean;
  onGenerateSummary: () => void;
  onGenerateQuiz: () => void;
}

export default function DocumentChatActions({
  isGeneratingSummary,
  isGeneratingQuiz,
  onGenerateSummary,
  onGenerateQuiz,
}: DocumentChatActionsProps) {
  const actions = [
    {
      id: "summary",
      label: "Generate Summary",
      icon: FileText,
      isLoading: isGeneratingSummary,
      onClick: onGenerateSummary,
      variant: "ghost" as const,
      // Option 1: Classic Silver (Light enough to pop on dark bg)
      className:
        "h-10 rounded-full bg-interactive text-background hover:opacity-80",
    },
    {
      id: "quiz",
      label: "Generate Quiz",
      icon: Sparkles,
      isLoading: isGeneratingQuiz,
      onClick: onGenerateQuiz,
      variant: "ghost" as const,
      // Option 2: Muted Bronze (Warm classic tone with contrast)
      className:
        "h-10 rounded-full bg-interactive text-background hover:opacity-80",
    },
  ];

  const isGenerating = isGeneratingSummary || isGeneratingQuiz;

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
            disabled={isGenerating}
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
