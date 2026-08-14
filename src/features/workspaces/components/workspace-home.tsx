"use client";

import Link from "next/link";

import PageContainer from "@/components/layout/page-container";
import { useWorkspaces } from "../hooks/use-workspaces";

import CreateWorkspaceCard from "./create-workspace-card";
import DeleteWorkspaceDialog from "./delete-workspace-dialog";
import WorkspaceCard from "./workspace-card";

export default function WorkspaceHome() {
  const { data: allworkspaces = [], isPending, isError } = useWorkspaces();

  const workspaces = allworkspaces.filter((workspace) => !workspace.isDefault);

  return (
    <PageContainer>
      <div className="mx-auto w-full py-8">
        <CreateWorkspaceCard />

        <section className="mt-4">
          <div className="mb-4 flex items-center justify-between border-b pb-3">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Your workspaces ({workspaces.length})
            </h2>
          </div>

          {isPending ? (
            <WorkspaceGridSkeleton />
          ) : isError ? (
            <div className="border border-destructive/20 bg-destructive/5 px-6 py-10 text-center">
              <p className="text-sm text-destructive">
                We couldn't load your workspaces.
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                Please try again in a moment.
              </p>
            </div>
          ) : workspaces.length === 0 ? (
            <div className="border border-dashed border-border px-6 py-12 text-center">
              <p className="text-sm font-medium">No additional workspaces</p>

              <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-muted-foreground">
                Create one above when you want to separate another subject or
                project.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
              {workspaces.map((workspace) => (
                <div key={workspace.id} className="group relative">
                  <Link href={`/workspaces/${workspace.id}`} className="block">
                    <WorkspaceCard workspace={workspace} />
                  </Link>

                  <DeleteWorkspaceDialog workspaceId={workspace.id} />
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </PageContainer>
  );
}

function WorkspaceGridSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="h-64 animate-pulse border border-border bg-muted/30"
        />
      ))}
    </div>
  );
}
