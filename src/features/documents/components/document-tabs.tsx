"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";

import { useDocumentTabs } from "../hooks/use-document-tabs";

export default function DocumentTabs() {
  const { tabs } = useDocumentTabs();

  return (
    <nav className="mt-2">
      <div className="flex gap-6">
        {tabs.map((tab) => (
          <Link
            key={tab.label}
            href={tab.href}
            className={cn(
              "border-b-2 border-transparent pb-1 text-sm font-medium text-muted-foreground transition-colors",
              tab.isActive && "border-primary text-foreground",
            )}
          >
            {tab.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
