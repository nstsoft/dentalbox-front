export type Subscription = {
  _id: string;
  workspace: string;
  interval: string;
  plan: string;
  activeTill: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};
