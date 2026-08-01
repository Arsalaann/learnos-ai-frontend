import Chat from "@/features/messages/components/chat";

interface WorkspacePageProps {
  params: Promise<{
    workspaceId: string;
  }>;
}

export default async function WorkspacePage({ params }: WorkspacePageProps) {
  const { workspaceId } = await params;

  return (
    <div className="flex flex-1 flex-col items-start ml-4 max-w-3xl">
      <main className="flex flex-1 w-full">
        <Chat
          workspaceId={Number(workspaceId)}
          conversationId={null}
          showContextSelector
        />
      </main>
    </div>
  );
}
