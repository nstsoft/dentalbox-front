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
  clientSecret: string;
  type: "setup" | "payment" | "payment-added";
  id: string;
  created: string;
  currency: string;
  current_period_end: number;
  current_period_start: number;
  customer: string;
  items: {
    data: {
      plan: {
        id: "price_1PwgmzLUELz5qmte8VBmygkO";
        aggregate_usage: null;
        amount: 60000;
        currency: "uah";
        interval: "week";
        interval_count: 1;
        livemode: false;
        metadata: {};
        meter: null;
        nickname: null;
        product: "prod_QoJP4zuiRhMSO0";
        tiers_mode: null;
        transform_usage: null;
        trial_period_days: null;
        usage_type: "licensed";
      };
    }[];
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
  product: string;
  priceId: string;
  stripeSubscription: string;
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
};
