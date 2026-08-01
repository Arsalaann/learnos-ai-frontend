"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { useLogoutController } from "@/features/auth/hooks/use-logout-controller";

export default function Sidebar({ children }: { children?: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const { logout } = useLogoutController();

  return (
    <section className="border-r w-90 flex flex-col sticky">
      {/* Header: Always visible */}
      <div className="flex h-16 items-center justify-between px-6">
        <Link href="/" className="text-xl font-semibold">
          LearnOS AI
        </Link>

        {isAuthenticated && (
          <Button variant="destructive" size="sm" onClick={logout}>
            Logout
          </Button>
        )}
      </div>

      {/* Navigation: Injected from nested layouts */}
      <nav className="flex-1 overflow-y-auto p-4">{children}</nav>
    </section>
  );
}
