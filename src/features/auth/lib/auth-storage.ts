const ACCESS_TOKEN_KEY = "access_token";

function getAccessToken(): string | null {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

function setAccessToken(token: string): void {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
}

function removeAccessToken(): void {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

export const authStorage = {
  getAccessToken,
  setAccessToken,
  removeAccessToken,
};
