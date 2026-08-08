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
        "rounded-md whitespace-pre-wrap wrap-break-word",
        isUser
          ? "bg-interactive/10 text-foreground py-3 px-3 my-6"
          : "bg-transparent text-foreground",
      )}
    >
      {children}
    </div>
  );
}
