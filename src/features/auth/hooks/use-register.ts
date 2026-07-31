import { useMutation } from "@tanstack/react-query";

import { register as registerApi } from "../api/register";

export function useRegister() {
  return useMutation({
    mutationFn: registerApi,
  });
}
