import type { Workspace } from "../types/workspace";

export default function WorkspaceCard({ workspace }: { workspace: Workspace }) {
  return (
    <>
      <h3 className="text-lg font-semibold">{workspace.title}</h3>

      <p className="text-sm text-muted-foreground">
        {workspace.documentsCount} documents
      </p>

      <p className="text-xs text-muted-foreground mt-3">
        Updated {new Date(workspace.updatedAt).toLocaleDateString()}
      </p>
    </>
  );
}
