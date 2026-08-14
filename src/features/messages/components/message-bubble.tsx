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
        "rounded-none whitespace-pre-wrap wrap-break-word",
        isUser
          ? "bg-primary text-white py-1 px-3 my-4 max-w-xl"
          : "w-full bg-transparent text-foreground",
      )}
    >
      {children}
    </div>
  );
}
