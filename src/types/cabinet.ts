import { ChairType } from "./chair";

export type Cabinet = {
  _id: string;
  name: string;
  image: string;
  address: string;
  phone: string;
  createdAt?: Date;
  updatedAt?: Date;
  users?: string[];
  workspace?: string;
  notes?: string;
  chairs?: ChairType[];
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
