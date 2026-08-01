import { cn } from "@/lib/utils";

interface MessageBubbleProps {
  children: React.ReactNode;
  isUser: boolean;
}

export default function MessageBubble({
  children,
  isUser,
}: MessageBubbleProps) {
  return (
    <div
      className={cn(
        "rounded-2xl px-4 py-3 whitespace-pre-wrap wrap-break-word",
        isUser ? "bg-muted text-foreground" : "bg-transparent text-foreground",
      )}
    >
      {children}
    </div>
  );
}
