import { apiClient } from "@/lib/api-client";

import type { RegisterRequest } from "../schemas/register-schema";
import type { User } from "../types/user";

interface RegisterResponse {
  id: number;
  full_name: string;
  email: string;
}

export async function register(data: RegisterRequest): Promise<User> {
  const { data: response } = await apiClient.post<RegisterResponse>(
    "/users",
    data,
  );

  return {
    id: response.id,
    fullName: response.full_name,
    email: response.email,
  };
}
