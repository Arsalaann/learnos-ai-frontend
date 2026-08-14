import WorkspaceEvents from "@/features/workspaces/components/workspace-events";
import WorkspaceSidebar from "@/features/workspaces/components/workspace-sidebar";

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <WorkspaceEvents />
      <WorkspaceSidebar />
      <main className="flex-1 overflow-y-auto scrollbar-thin">{children}</main>
    </div>
  );
}
