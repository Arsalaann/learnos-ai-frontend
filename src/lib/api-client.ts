import axios from "axios";

import { authStorage } from "@/features/auth/lib/auth-storage";

import { env } from "./env";

export const apiClient = axios.create({
  baseURL: env.API_URL,
  timeout: 30_000,
});

apiClient.interceptors.request.use((config) => {
  const token = authStorage.getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
