"use client";

import { LoaderCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Message } from "@/components/form/message";

import { useCreateWorkspaceController } from "../hooks/use-create-workspace-controller";

export default function CreateWorkspaceCard() {
  const { form, onSubmit, createWorkspaceMutation } =
    useCreateWorkspaceController();

  return (
    <section className="rounded-xl border p-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Create Workspace</h2>

        <p className="text-sm text-muted-foreground">
          Give your workspace a meaningful name.
        </p>
      </div>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-6 flex items-start gap-3"
      >
        <div className="flex-1">
          <Input placeholder="Workspace name" {...form.register("title")} />

          <Message error={form.formState.errors.title} />
        </div>

        <Button type="submit" disabled={createWorkspaceMutation.isPending}>
          {createWorkspaceMutation.isPending && (
            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
          )}
          Create
        </Button>
      </form>

      {createWorkspaceMutation.isError && (
        <p className="mt-4 text-sm text-destructive">
          Failed to create workspace.
        </p>
      )}
    </section>
  );
}
