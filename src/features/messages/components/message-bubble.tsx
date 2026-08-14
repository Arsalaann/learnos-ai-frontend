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
          ? "bg-primary text-white py-3 px-3 my-6"
          : "w-full bg-transparent text-foreground",
      )}
    >
      {children}
    </div>
  );
}
