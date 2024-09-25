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

export type WorkspaceForm = {
  name: string;
  description?: string;
};
