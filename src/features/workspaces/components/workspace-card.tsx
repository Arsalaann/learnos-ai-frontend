import { ArrowUpRight, BookOpen } from "lucide-react";

import type { Workspace } from "../types/workspace";

export default function WorkspaceCard({ workspace }: { workspace: Workspace }) {
  return (
    <article className="relative flex min-h-30 flex-col gap-3 overflow-hidden bg-primary/5 p-4 transition-colors border hover:border-primary/40">
      <div className="flex items-center justify-between ">
        <div className="grid h-10 w-10 place-items-center rounded-none bg-primary/10 text-primary">
          <BookOpen className="h-5 w-5" strokeWidth={1.7} />
        </div>

        <h3 className="max-w-[70%] text-star flex-1 truncate text-xl font-semibold tracking-tight">
          {workspace.title}
        </h3>

        <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
      </div>

      <div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span>
            {workspace.documentsCount}{" "}
            {workspace.documentsCount === 1 ? "document" : "documents"}
          </span>

          <span className="h-1 w-1 rounded-full bg-foreground/40" />

          <span>
            Updated {new Date(workspace.updatedAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </article>
  );
}
