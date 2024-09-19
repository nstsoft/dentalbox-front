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

export type SubscriptionResponse = {
  // clientSecret: string;
  // type: "setup" | "payment" | "payment-added";
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
  price: {
    id: string;
    active: boolean;
    currency: string;
    livemode: boolean;
    product: string;
    recurring: {
      interval: "week" | "month" | "year";
      interval_count: 1;
    };
    unit_amount: number;
  };

  start_date: number;
  status: SubscriptionStatus;
  trial_end: number;
  trial_settings: {
    end_behavior: {
      missing_payment_method: string;
    };
  };
  trial_start: number;
  _id: string;
  workspace: string;
  product: Product;
  priceId: string;
  stripeSubscription: string;

};
