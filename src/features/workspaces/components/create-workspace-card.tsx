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
    <section className="flex min-h-50 flex-col justify-around border border-dashed border-border px-6 transition-colors bg-primary/5 hover:border-primary/40 hover:bg-muted/20">
      <div>
        <h3 className="flex items-center gap-3 text-xl font-semibold tracking-tight">
          <div className="grid h-10 w-10 place-items-center bg-primary/10 text-primary">
            <Plus className="h-5 w-5" strokeWidth={1.8} />
          </div>{" "}
          Create a workspace
        </h3>

        <p className="mt-2 max-w-xs text-sm leading-6 text-muted-foreground">
          Start a new place for documents, conversations, and focused learning.
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex gap-2 items-center">
          <div className="min-w-0 flex-1">
            <Input
              placeholder="Workspace name"
              className="h-10 bg-background-default dark:bg-background-default"
              {...form.register("title")}
            />

            <Message error={form.formState.errors.title} />
          </div>

          <Button
            type="submit"
            size="lg"
            className="rounded-none"
            disabled={createWorkspaceMutation.isPending}
          >
            {createWorkspaceMutation.isPending && (
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            )}
            Create
          </Button>
        </div>

        {createWorkspaceMutation.isError && (
          <p className="mt-3 text-xs text-destructive">
            Failed to create workspace. Please try again.
          </p>
        )}
      </form>
    </section>
  );
}
