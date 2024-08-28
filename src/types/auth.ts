import { type Subscription } from "./subscription";
import { type User } from "./user";
import { type Workspace } from "./workspace";

export type Auth = {
  authToken: string;
  refreshToken: string;
  user: User;
  workspace: Workspace;
  workspaces: Workspace[];
  subscription: Subscription;
};
