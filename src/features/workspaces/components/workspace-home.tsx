"use client";

import Link from "next/link";

import PageContainer from "@/components/layout/page-container";
import { useWorkspaces } from "../hooks/use-workspaces";

import CreateWorkspaceCard from "./create-workspace-card";
import DeleteWorkspaceDialog from "./delete-workspace-dialog";
import WorkspaceCard from "./workspace-card";

export default function WorkspaceHome() {
  const { data: workspaces = [], isPending, isError } = useWorkspaces();

  return (
    <PageContainer>
      <div className="mx-auto w-full">
        {/* Hero */}
        <section className="flex justify-center gap-6 border-b border-border pb-6 items-center">
          <div>
            <p className="mb-5 font-mono text-[0.625rem] uppercase tracking-[0.3em] text-primary">
              The study desk
            </p>

            <h1 className="text-5xl font-semibold leading-[0.95] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Make room to learn.
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
              Bring your documents together, explore ideas with AI, and keep
              everything you're learning in one quiet place.
            </p>
          </div>

          <div className="w-full flex-1">
            <CreateWorkspaceCard />
          </div>
        </section>

        {/* Workspace section */}
        <section className="pt-8">
          <h2 className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Your workspaces {"("}
            {workspaces?.length}
            {")"}
          </h2>

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
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="flex min-h-72 flex-col justify-between border border-dashed border-border p-8">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
                    Start somewhere
                  </p>

                  <h3 className="mt-4 max-w-sm text-2xl font-semibold tracking-tight">
                    Give your learning a place to live.
                  </h3>
                </div>

                <p className="max-w-sm text-sm leading-6 text-muted-foreground">
                  Create a workspace for a subject, project, course, or
                  collection of documents. You can always create more later.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
