"use client";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import ShikiHighlighter from "react-shiki";
import { useTheme } from "next-themes";

interface AssistantMessageProps {
  content: string;
}

export default function AssistantMessage({ content }: AssistantMessageProps) {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none text-foreground my-0 py-0">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // --- Headings: Tight tracking, bold weights, generous top spacing ---
          h1: ({ children }) => (
            <h1 className="mb-8 mt-12 text-3xl font-extrabold tracking-tight text-foreground/95 first:mt-0">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="mt-5 mb-2 text-2xl font-bold tracking-tight border-b border-border/50 text-foreground/95">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className=" mt-5 mb-2 text-xl font-semibold tracking-tight text-foreground/95">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="mt-5 text-lg font-semibold tracking-tight text-foreground/80">
              {children}
            </h4>
          ),

          // --- Paragraphs: Relaxed line height for readability ---
          p: ({ children }) => (
            <p className="leading-7 text-foreground/80 last:mb-0">{children}</p>
          ),

          // --- Lists: Better indentation and marker spacing ---
          ul: ({ children }) => (
            <ul className="ml-4 list-disc marker:text-muted-foreground/50 flex flex-col gap-3">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="ml-4 list-decimal marker:font-medium marker:text-muted-foreground/50 flex flex-col gap-3">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="pl-2 leading-7 text-foreground/80">{children}</li>
          ),

          // --- Blockquote: Distinct visual style with accent border ---
          blockquote: ({ children }) => (
            <blockquote className="my-6 border-l-4 border-primary/20 bg-muted/30 pl-5 py-3 italic text-muted-foreground rounded-r-lg">
              {children}
            </blockquote>
          ),

          // --- Horizontal Rule: Subtle divider ---
          hr: () => <hr className="my-2 border-border/50" />,

          // --- Text Emphasis: Stronger contrast ---
          strong: ({ children }) => (
            <strong className="font-bold text-foreground/95">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="italic text-muted-foreground">{children}</em>
          ),

          // --- Links: Smooth interaction ---
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-primary underline-offset-4 transition-colors hover:text-primary/80 hover:underline"
            >
              {children}
            </a>
          ),

          // --- Tables: Premium card-like style with hover effects ---
          table: ({ children }) => (
            <div className="my-2 overflow-hidden rounded-lg border border-border shadow-sm">
              <table className="w-full text-sm">{children}</table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-muted/50 text-xs uppercase text-muted-foreground">
              {children}
            </thead>
          ),
          th: ({ children }) => (
            <th className="border-b border-border px-5 py-3 text-left font-semibold">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border-b border-border/50 px-5 py-3 align-top text-muted-foreground/90 last:border-b-0">
              {children}
            </td>
          ),
          tr: ({ children }) => (
            <tr className="transition-colors hover:bg-muted/30 last:border-b-0">
              {children}
            </tr>
          ),

          // --- Code: Distinct inline vs block styles ---
          code: ({ children, className, ...props }) => {
            const { resolvedTheme } = useTheme();

            const codeTheme =
              resolvedTheme === "dark" ? "dark-plus" : "github-light-default";
            const match = /language-(\w+)/.exec(className ?? "");
            const isInline = !match;
            const codeString = String(children).replace(/\n$/, "");
            const [copied, setCopied] = useState(false);

            const handleCopy = async () => {
              await navigator.clipboard.writeText(codeString);
              setCopied(true);
              setTimeout(() => setCopied(false), 10000); // Reset after 10s
            };

            if (!isInline) {
              return (
                <div className="not-prose overflow-hidden relative group border rounded-none mb-8">
                  {/* Copy Button using shadcn Button and Lucide Icons */}
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={handleCopy}
                    className="absolute right-3 top-3 z-1 h-8 w-8"
                    aria-label="Copy code"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-primary" />
                    ) : (
                      <Copy className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>

                  <div className="not-prose overflow-hidden ">
                    <ShikiHighlighter
                      language={match[1]}
                      theme={codeTheme}
                      showLanguage={false}
                      className="overflow-x-auto text-sm"
                    >
                      {codeString}
                    </ShikiHighlighter>
                  </div>
                </div>
              );
            }

            return (
              <code
                {...props}
                className="rounded-none bg-background-default px-1.5 py-0.5 font-mono text-sm font-medium text-primary ring-1 ring-inset ring-border/20"
              >
                {children}
              </code>
            );
          },

          // --- Pre: Reset default margins since we wrap code ---
          pre: ({ children }) => <>{children}</>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
