import { Product } from "./product";

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

export type SubscriptionStatus =
  | "active"
  | "canceled"
  | "incomplete"
  | "incomplete_expired"
  | "past_due"
  | "paused"
  | "trialing"
  | "unpaid";

export type PriceGeneral = {
  active: boolean;
  created: number;
  currency: string;
  custom_unit_amount: string;
  id: string;
  livemode: boolean;
  product: string;
  recurring: {
    interval: "week" | "month" | "year";
    interval_count: 1;
  };
  type: string;
  unit_amount: number;
  unit_amount_decimal: string;
};

export type SubscriptionResponse = {
  billing_cycle_anchor: number;
  cancel_at: string | null;
  canceled_at: string | null;
  cancellation_details: {
    comment: string | null;
    feedback: string | null;
    reason: string | null;
  };
  created: number;
  currency: string;
  current_period_end: number;
  current_period_start: number;
  customer: number;
  id: string;
  price: PriceGeneral;
  status: SubscriptionStatus;
  _id: string;
  workspace: string;
  product: Product;
  priceId: string;
  stripeSubscription: string;
};
