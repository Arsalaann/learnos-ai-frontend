"use client";

import Link from "next/link";

import PageContainer from "@/components/layout/page-container";

import { useUser } from "@/features/user/hooks/use-user";

import CreateWorkspaceCard from "./create-workspace-card";
import WorkspaceCard from "./workspace-card";
import { useWorkspaces } from "../hooks/use-workspaces";
import DeleteWorkspaceDialog from "./delete-workspace-dialog";

export default function WorkspaceHome() {
  const { user } = useUser();

  const { data: workspaces = [], isPending, isError } = useWorkspaces();

  return (
    <PageContainer>
      <div className="space-y-10">
        <CreateWorkspaceCard />
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Your Workspaces</h2>

          {isPending ? (
            <p className="text-muted-foreground">Loading workspaces...</p>
          ) : isError ? (
            <p className="text-destructive">Failed to load workspaces.</p>
          ) : workspaces.length === 0 ? (
            <div className="rounded-xl border border-dashed p-10 text-center text-muted-foreground">
              No workspaces yet.
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {workspaces.map((workspace) => (
                <div
                  key={workspace.id}
                  className="relative w-full rounded-md border p-6 text-left transition-colors hover:border-ring"
                >
                  <Link href={`/workspaces/${workspace.id}`}>
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
