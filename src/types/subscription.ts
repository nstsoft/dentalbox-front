export type Subscription = {
  _id: string;
  workspace: string;
  interval: string;
  product: string;
  activeTill: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};
