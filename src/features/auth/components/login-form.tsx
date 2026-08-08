"use client";

import { LoaderCircle } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Field } from "@/components/form/field";
import { Label } from "@/components/form/label";
import { Message } from "@/components/form/message";
import { PasswordInput } from "@/components/form/password-input";

import { useAuthModal } from "../context/auth-modal-context";
import { useLogin } from "../hooks/use-login";
import { loginSchema, type LoginFormValues } from "../schemas/auth";

export default function LoginForm() {
  const router = useRouter();
  const { close } = useAuthModal();
  const loginMutation = useLogin();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormValues) {
    await loginMutation.mutateAsync(values);
    form.reset();
    close();
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <Field>
        <Label htmlFor="email">Email</Label>

        <Input
          id="email"
          type="email"
          placeholder="john@example.com"
          autoComplete="email"
          className="h-12"
          {...form.register("email")}
        />

        <Message error={form.formState.errors.email} />
      </Field>

      <Field>
        <Label htmlFor="password">Password</Label>

        <PasswordInput
          id="password"
          placeholder="Enter your password"
          autoComplete="current-password"
          className="h-12"
          {...form.register("password")}
        />

        <Message error={form.formState.errors.password} />
      </Field>

      <Button
        type="submit"
        className="w-full h-12 rounded-none"
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending && (
          <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
        )}
        Enter the desk
      </Button>

      {loginMutation.isError && (
        <p className="text-sm text-destructive">Invalid email or password.</p>
      )}
    </form>
  );
}
