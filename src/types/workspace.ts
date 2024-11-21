export type Workspace = {
  currentMembersCount: number;
  notes: string;
  image: string;
  maxMembersCount: number;
  name: string;
  _id: string;
  patientMaxStorage: number;
};

export type WorkspaceShortenItem = {
  _id: string;
  name: string;
  image?: string;
};
