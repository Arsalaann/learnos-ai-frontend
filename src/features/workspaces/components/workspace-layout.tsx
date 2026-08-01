import Sidebar from "@/components/layout/sidebar";
import WorkspaceSidebarContent from "@/features/workspaces/components/workspace-sidebar";

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 1. Parent takes full screen height and prevents body scroll
    <div className="flex h-screen overflow-hidden">
      {/* 2. Sidebar stays static (no overflow, no scroll) */}
      <Sidebar>
        <WorkspaceSidebarContent />
      </Sidebar>

      {/* 3. Main area takes remaining space and handles scrolling */}
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
