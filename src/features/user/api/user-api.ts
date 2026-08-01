import { apiClient } from "@/lib/api-client";

import type { MeResponse, User } from "../types/user";

export async function getMe(): Promise<User> {
  const response = await apiClient.get<MeResponse>("/users/me");

  return {
    fullName: response.data.full_name,
  };
}
