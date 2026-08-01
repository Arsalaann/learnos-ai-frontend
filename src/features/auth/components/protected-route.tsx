"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "../hooks/use-auth";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const { isAuthenticated, isInitializing } = useAuth();

  useEffect(() => {
    if (!isInitializing && !isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, isInitializing, router]);

  if (isInitializing) {
    return null;
  }

  if (!isAuthenticated) {
    return null;
  }

  return children;
}
