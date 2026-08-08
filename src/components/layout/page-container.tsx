import type { ReactNode } from "react";

import Header from "@/components/layout/header";

interface PageContainerProps {
  children: ReactNode;
}

export default function PageContainer({ children }: PageContainerProps) {
  return (
    <div className="px-4">
      <Header />
      <main className="mx-auto w-full max-w-6xl px-2 py-16">{children}</main>
    </div>
  );
}
