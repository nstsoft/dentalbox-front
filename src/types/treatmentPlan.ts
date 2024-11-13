export type PlanItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

export type TreatmentPlan = {
  workspace: string;
  patient: string;
  deposit: number;
  currency: string;
  date: string;
  items: PlanItem[];
  _id: string;
};
