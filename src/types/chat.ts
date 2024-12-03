import { UserSummaryListItem } from "./user";
export type RoomResponse = {
  id: string;
  name: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
  userids: string[];
  workspace: string;
};
export type ConnectionResponse = {
  connection: string;
  createdAt: string;
  id: string;
  userid: string;
  workspace: string;
};

export type Room = {
  id: string;
  name: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
  users: (UserSummaryListItem & { online: boolean })[];
};

export type RoomRequest = {
  name: string;
  userids: string[];
};
