export enum UserRole {
  admin = "admin",
  manager = "manager",
  doctor = "doctor",
  assistant = "assistant",
}

export type Role = {
  workspace: string;
  role: string;
};

export type UserRequest = {
  name: string;
  email: string;
  password: string;
  surname: string;
  secondName: string;
};

export type User = {
  email: string;
  password: string;
  role: Role;
  _id: string;
  name: string;
  workspace: string;
  surname: string;
  secondName: string;
  enableNotifications: boolean;
  isVerified: boolean;
  address?: string;
  phone?: string;
  otp: number;
  notes?: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};
