"use client";

import { BookOpen, LogOut } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useAuth } from "@/features/auth/hooks/use-auth";
import { useLogoutController } from "@/features/auth/hooks/use-logout-controller";
import { useUser } from "@/features/user/hooks/use-user";

import ConfirmDialog from "../dialogs/confirm-dialog";

interface HeaderProps {
  homeHref?: string;
}

export default function Header({ homeHref = "/" }: HeaderProps) {
  const pathname = usePathname();
  const isHome = pathname === homeHref;
  const { isAuthenticated } = useAuth();
  const { user } = useUser();
  const { logout } = useLogoutController();

  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  return (
    <header>
      <div className="mx-auto flex w-full max-w-8xl items-center justify-between pt-4">
        {isHome ? (
          <div className="flex items-center gap-3">
            <div className="grid size-9 place-items-center bg-primary text-white">
              <BookOpen className="size-4" />
            </div>

            <span className="text-sm font-semibold tracking-tight">
              LearnOS AI
            </span>
          </div>
        ) : (
          <Link
            href={homeHref}
            className="flex items-center gap-3 transition-opacity hover:opacity-70"
          >
            <div className="grid size-9 place-items-center bg-primary text-white">
              <BookOpen className="size-4" />
            </div>

            <span className="text-sm font-semibold tracking-tight">
              LearnOS AI
            </span>
          </Link>
        )}

        {isAuthenticated && (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={(props) => (
                  <button
                    {...props}
                    type="button"
                    className="rounded-full outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <Avatar>
                      <AvatarFallback>
                        {user?.fullName?.charAt(0).toUpperCase() ?? "?"}
                      </AvatarFallback>
                    </Avatar>

                    <span className="sr-only">Open account menu</span>
                  </button>
                )}
              />

              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-2">
                  <p className="truncate text-sm font-medium">
                    {user?.fullName}
                  </p>

                  <p className="truncate text-xs text-muted-foreground">
                    Your study desk
                  </p>
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={() => setLogoutDialogOpen(true)}
                  className="text-destructive focus:text-destructive"
                >
                  <LogOut className="size-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <ConfirmDialog
              open={logoutDialogOpen}
              onOpenChange={setLogoutDialogOpen}
              title="Sign out of LearnOS AI?"
              description="You'll need to sign in again to access your workspaces and conversations."
              actionLabel="Logout"
              onConfirm={logout}
            />
          </>
        )}
      </div>
    </header>
  );
}
