"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import LoginForm from "./login-form";
import RegisterForm from "./register-form";

import { AuthModalProvider } from "../context/auth-modal-context";
import type { AuthMode } from "../hooks/use-auth-modal-controller";

interface AuthModalProps {
  open: boolean;
  mode: AuthMode;
  onOpenChange: (open: boolean) => void;
  onModeChange: (mode: AuthMode) => void;
  onClose: () => void;
}

export default function AuthModal({
  open,
  mode,
  onOpenChange,
  onModeChange,
  onClose,
}: AuthModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <AuthModalProvider
        value={{
          mode,
          switchMode: onModeChange,
          close: onClose,
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {mode === "login" ? "Welcome Back" : "Create your account"}
            </DialogTitle>

            <DialogDescription>
              {mode === "login"
                ? "Sign in to continue using LearnOS AI."
                : "Create an account to start learning with AI."}
            </DialogDescription>

            <div className="mt-4 flex rounded-lg bg-muted p-1">
              <Button
                type="button"
                variant={mode === "login" ? "default" : "ghost"}
                className="flex-1"
                onClick={() => onModeChange("login")}
              >
                Login
              </Button>

              <Button
                type="button"
                variant={mode === "register" ? "default" : "ghost"}
                className="flex-1"
                onClick={() => onModeChange("register")}
              >
                Sign Up
              </Button>
            </div>
          </DialogHeader>

          {mode === "login" ? <LoginForm /> : <RegisterForm />}
        </DialogContent>
      </AuthModalProvider>
    </Dialog>
  );
}
