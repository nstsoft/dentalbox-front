export type Workspace = {
  _id: string;
  name: string;
  image?: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type WorkspaceShortenItem = {
  _id: string;
  name: string;
  image?: string;
};
