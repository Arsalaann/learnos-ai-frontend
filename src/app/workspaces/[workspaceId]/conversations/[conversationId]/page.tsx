import WorkspaceConversationChat from "@/features/conversations/components/workspace-conversation-chat";

export default function WorkspaceConversationPage() {
  return (
    <div className="flex flex-1 flex-col items-start ml-4 max-w-3xl">
      <main className="flex flex-1 w-full">
        <WorkspaceConversationChat />
      </main>
    </div>
  );
}
