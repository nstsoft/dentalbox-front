import { type Subscription } from "./subscription";
import { type User } from "./user";
import type { Workspace, WorkspaceShortenItem } from "./workspace";

export type Auth = {
  authToken: string;
  refreshToken: string;
  user: User;
  workspace: Workspace;
  subscription: Subscription;
};

export type AuthState = {
  refreshToken: string;
  user: User;
  authToken: string;
};

export interface AuthContextType {
  authToken: string | null;
  refreshToken: string | null;
  isLoggedIn: boolean;
  user: User | null;
  login: (data: AuthState) => void;
  updateUser: (user: User) => void;
  logout: () => void;
}
