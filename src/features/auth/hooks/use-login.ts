import { useMutation } from "@tanstack/react-query";

import { useAuth } from "../context/auth-context";
import { login as loginApi } from "../api/auth-api";

export function useLogin() {
  const { login } = useAuth();

  return useMutation({
    mutationFn: loginApi,

    onSuccess: ({ access_token }) => {
      login({
        accessToken: access_token,
      });
    },
  });
}
