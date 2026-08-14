import type { ReactNode } from "react";

import Header from "@/components/layout/header";

interface PageContainerProps {
  children: ReactNode;
}

export default function PageContainer({ children }: PageContainerProps) {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16">{children}</main>
  );
}
