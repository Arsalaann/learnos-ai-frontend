import type { User } from "./user";

export interface Session {
  accessToken: string;
  user?: User;
}
