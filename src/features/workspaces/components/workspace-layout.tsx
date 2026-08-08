import WorkspaceSidebar from "@/features/workspaces/components/workspace-sidebar";

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <WorkspaceSidebar />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
