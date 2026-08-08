"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import ShikiHighlighter from "react-shiki";

import { Button } from "@/components/ui/button";

interface CodeBlockProps {
  code: string;
  language: string;
}

export default function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(code);

    setCopied(true);

    window.setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <div className="my-5 overflow-hidden rounded-xl border bg-zinc-950">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <span className="text-xs font-medium text-zinc-400">
          {language || "code"}
        </span>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-7 gap-1.5 px-2 text-xs text-zinc-400 hover:bg-white/10 hover:text-zinc-100"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              Copy
            </>
          )}
        </Button>
      </div>

      <div className="overflow-x-auto">
        <ShikiHighlighter
          language={language || "text"}
          theme="github-dark"
          className="!m-0 !rounded-none !bg-transparent !p-4 text-sm"
        >
          {code}
        </ShikiHighlighter>
      </div>
    </div>
  );
}
