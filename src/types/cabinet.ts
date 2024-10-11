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

export type CreateCabinet = {
  name: string;
  phone: string;
  address: string;
  notes?: string;
  image?: File;
  chairs: string[];
};

export type CabinetSummaryListItem = Pick<Cabinet, "name" | "_id" | "image">;
