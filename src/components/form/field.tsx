import * as React from "react";

import { cn } from "@/lib/utils";

interface FormGroupProps extends React.ComponentProps<"div"> {}

export function Field({ className, ...props }: FormGroupProps) {
  return <div className={cn("flex flex-col gap-1", className)} {...props} />;
}
