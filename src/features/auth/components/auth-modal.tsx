"use client";

import LoginForm from "./login-form";
import RegisterForm from "./register-form";

import { AuthModalProvider } from "../context/auth-modal-context";
import type { AuthMode } from "../hooks/use-auth-modal-controller";

interface AuthModalProps {
  mode: AuthMode;
  onModeChange: (mode: AuthMode) => void;
}

export default function AuthModal({ mode, onModeChange }: AuthModalProps) {
  return (
    <AuthModalProvider
      value={{
        mode,
        switchMode: onModeChange,
        close: () => {},
      }}
    >
      <div className="w-full max-w-md ">
        {mode === "login" ? (
          <>
            <div className="mb-10">
              <p className="mb-4 font-mono text-md uppercase tracking-[0.3em] text-primary">
                Welcome back
              </p>

              <h2 className="text-5xl font-medium leading-none tracking-[-0.03em] sm:text-5xl">
                Return to your work.
              </h2>
            </div>

            <LoginForm />

            <button
              type="button"
              onClick={() => onModeChange("register")}
              className="mt-5 text-sm text-primary underline underline-offset-4 transition-opacity hover:opacity-70"
            >
              New here? Create an account
            </button>
          </>
        ) : (
          <>
            <div className="mb-10">
              <p className="mb-4 font-mono text-md uppercase tracking-[0.3em] text-primary">
                Begin your desk
              </p>

              <h2 className="text-5xl font-medium leading-none tracking-[-0.03em] sm:text-5xl">
                Make room to learn.
              </h2>
            </div>

            <RegisterForm />

            <button
              type="button"
              onClick={() => onModeChange("login")}
              className="mt-5 text-sm text-primary underline underline-offset-4 transition-opacity hover:opacity-70"
            >
              Already have an account? Return to your desk
            </button>
          </>
        )}
      </div>
    </AuthModalProvider>
  );
}
