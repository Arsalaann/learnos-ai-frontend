export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  id: number;
  fullName: string;
  email: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
}
