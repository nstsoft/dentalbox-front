export enum UserRole {
  admin = "admin",
  manager = "manager",
  doctor = "doctor",
  assistant = "assistant",
}

export type User = {
  email: string;
  password: string;
  role: UserRole;
  _id: string;
  name: string;
  workspace: string;
};
