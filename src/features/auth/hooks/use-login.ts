import { useMutation } from "@tanstack/react-query";

import { useAuth } from "@/features/auth/hooks/use-auth";
import { login as loginApi } from "../api/auth-api";
import { useUser } from "@/features/user/hooks/use-user";
import { getMe } from "@/features/user/api/user-api";

export function useLogin() {
  const { login } = useAuth();
  const { setUser } = useUser();

  return useMutation({
    mutationFn: loginApi,

    onSuccess: async ({ access_token }) => {
      login({
        accessToken: access_token,
      });

      const user = await getMe();

      setUser(user);
    },
  });
}
