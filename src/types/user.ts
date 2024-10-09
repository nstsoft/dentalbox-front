import { Sex } from "./common";

export enum UserRole {
  admin = "admin",
  manager = "manager",
  doctor = "doctor",
  assistant = "assistant",
  owner = "owner",
}

export type Role = {
  workspace: string;
  role: string;
};

export type UserRequest = {
  name: string;
  email: string;
  password: string;
  phone: string;
  surname: string;
  secondName: string;
};

export type User = {
  email: string;
  password: string;
  roles: Role[];
  _id: string;
  name: string;
  workspace: string;
  surname: string;
  secondName: string;
  enableNotifications: boolean;
  isVerified: boolean;
  address?: string;
  phone: string;
  otp: number;
  notes?: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  image?: string;
  dob?: Date;
  role: UserRole;
  sex: Sex;
};

export type RegisterData = {
  user: UserRequest;
  workspace: { name: string; description?: string };
  productId: string;
  workspaceImage?: File;
  priceId: string;
};

export enum InvitationStatus {
  pending = "pending",
  accepted = "accepted",
  declined = "declined",
  expired = "expired",
}

export type UserInvitation = {
  workspace: string;
  userRole: UserRole;
  email: string;
  activeTill: number;
  status: InvitationStatus;
};

export type UserForm = {
  name: string;
  email: string;
  password: string;
  surname: string;
  secondName: string;
  phone: string;
  dob: string;
  address?: string;
};
