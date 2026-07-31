"use client";

import { LoaderCircle } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Field } from "@/components/form/field";
import { Label } from "@/components/form/label";
import { Message } from "@/components/form/message";
import { PasswordInput } from "@/components/form/password-input";

import { useAuthModal } from "../context/auth-modal-context";
import { useRegister } from "../hooks/use-register";
import { registerSchema, type RegisterFormValues } from "../schemas/auth";

export default function RegisterForm() {
  const { switchMode } = useAuthModal();

  const registerMutation = useRegister();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: RegisterFormValues) {
    await registerMutation.mutateAsync(values);
    form.reset();
    switchMode("login");
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <Field>
        <Label htmlFor="fullName">Full Name</Label>

        <Input
          id="fullName"
          placeholder="John Doe"
          autoComplete="name"
          {...form.register("fullName")}
        />

        <Message error={form.formState.errors.fullName} />
      </Field>

      <Field>
        <Label htmlFor="email">Email</Label>

        <Input
          id="email"
          type="email"
          placeholder="john@example.com"
          autoComplete="email"
          {...form.register("email")}
        />

        <Message error={form.formState.errors.email} />
      </Field>

      <Field>
        <Label htmlFor="password">Password</Label>

        <PasswordInput
          id="password"
          placeholder="Create a password"
          autoComplete="new-password"
          {...form.register("password")}
        />

        <Message error={form.formState.errors.password} />
      </Field>

      <Button
        type="submit"
        className="w-full"
        disabled={registerMutation.isPending}
      >
        {registerMutation.isPending && (
          <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
        )}
        Create Account
      </Button>

      {registerMutation.isError && (
        <p className="text-sm text-destructive">
          Unable to create your account.
        </p>
      )}
    </form>
  );
}
