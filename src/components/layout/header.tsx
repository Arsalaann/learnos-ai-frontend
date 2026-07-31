"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

import AuthModal from "@/features/auth/components/auth-modal";
import { useAuth } from "@/features/auth/context/auth-context";
import { useAuthModal } from "@/features/auth/hooks/use-auth-modal-controller";

export default function Header() {
  const auth = useAuth();
  const modal = useAuthModal();

  return (
    <>
      <header className="border-b">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="text-xl font-semibold">
            LearnOS AI
          </Link>

          {auth.isAuthenticated ? (
            <Button variant="destructive" onClick={auth.logout}>
              Logout
            </Button>
          ) : (
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={modal.openLogin}>
                Login
              </Button>

              <Button onClick={modal.openRegister}>Sign Up</Button>
            </div>
          )}
        </div>
      </header>

      <AuthModal
        open={modal.open}
        mode={modal.mode}
        onOpenChange={modal.onOpenChange}
        onModeChange={modal.switchMode}
        onClose={modal.close}
      />
    </>
  );
}
