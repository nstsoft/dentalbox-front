export type Cabinet = {
  _id: string;
  name: string;
  image: string;
  description: string;
  address: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
  users?: string[];
  workspace?: string;
};
