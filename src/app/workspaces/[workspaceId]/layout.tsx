import ProtectedRoute from "@/features/auth/components/protected-route";
import WorkspaceLayout from "@/features/workspaces/components/workspace-layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <WorkspaceLayout>{children}</WorkspaceLayout>
    </ProtectedRoute>
  );
}
