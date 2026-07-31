import { apiClient } from "@/lib/api-client";

import type {
  LoginRequest,
  RegisterRequest,
  TokenResponse,
  User,
} from "../types/auth";

export async function register(data: RegisterRequest): Promise<User> {
  const response = await apiClient.post<User>("/users", {
    full_name: data.fullName,
    email: data.email,
    password: data.password,
  });

  return response.data;
}

export async function login(data: LoginRequest): Promise<TokenResponse> {
  const response = await apiClient.post<TokenResponse>("/users/login", data);

  return response.data;
}
