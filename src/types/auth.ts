import { type User } from "./user";

export type Auth = {
  authToken: string;
  refreshToken: string;
  user: User;
};
