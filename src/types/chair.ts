export type ChairType = {
  name: string;
  notes?: string;
  cabinet: string;
  workspace: string;
  _id: string;
};

export type ChairSummaryListItem = Pick<ChairType, "name" | "_id" | "cabinet">;
