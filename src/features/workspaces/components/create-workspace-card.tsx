"use client";

import { LoaderCircle, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Message } from "@/components/form/message";

import { useCreateWorkspaceController } from "../hooks/use-create-workspace-controller";

export default function CreateWorkspaceCard() {
  const { form, onSubmit, createWorkspaceMutation } =
    useCreateWorkspaceController();

  return (
    <section>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="mb-8">
          <p className="font-mono text-[0.625rem] uppercase tracking-[0.25em] text-primary">
            New workspace
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            Create a workspace
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Create a separate space for a subject, project, or collection of
            documents.
          </p>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex min-w-0 flex-1 gap-2 sm:max-w-md mt-3"
          >
            <div className="min-w-0 flex-1">
              <Input
                placeholder="Workspace name"
                className="h-9 bg-background-default"
                {...form.register("title")}
              />

              <Message error={form.formState.errors.title} />
            </div>

            <Button
              type="submit"
              size="sm"
              className="h-9 rounded-none"
              disabled={createWorkspaceMutation.isPending}
            >
              {createWorkspaceMutation.isPending && (
                <LoaderCircle className="mr-2 size-4 animate-spin" />
              )}
              Create
            </Button>
          </form>
        </div>
      </div>

      {createWorkspaceMutation.isError && (
        <p className="mt-2 text-xs text-destructive">
          Failed to create workspace. Please try again.
        </p>
      )}
    </section>
  );
}
