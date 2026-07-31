import type { FieldError } from "react-hook-form";

interface FormErrorProps {
  error?: FieldError | undefined;
}

export function Message({ error }: FormErrorProps) {
  if (!error) return null;

  return <p className="text-sm text-destructive">{error.message}</p>;
}
