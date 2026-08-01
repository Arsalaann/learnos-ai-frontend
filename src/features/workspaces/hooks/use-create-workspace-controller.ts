"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  createWorkspaceSchema,
  type CreateWorkspaceFormValues,
} from "../schemas/workspace-schema";

import { useCreateWorkspace } from "./use-create-workspace";

import { workspaceRoutes } from "../lib/workspace-routes";

export function useCreateWorkspaceController() {
  const router = useRouter();

  const createWorkspaceMutation = useCreateWorkspace();

  const form = useForm<CreateWorkspaceFormValues>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      title: "",
    },
  });

  async function onSubmit(values: CreateWorkspaceFormValues) {
    const workspace = await createWorkspaceMutation.mutateAsync(values);

    form.reset();

    router.push(workspaceRoutes.create(workspace.id));
  }

  return {
    form,
    onSubmit,
    createWorkspaceMutation,
  };
}
