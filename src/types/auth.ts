import { type Subscription, SubscriptionStatus } from "./subscription";
import { type User } from "./user";
import type { Workspace } from "./workspace";

export type Auth = {
  authToken: string;
  refreshToken: string;
  user: User;
  workspace: Workspace;
  subscription: Subscription;
  stripeSubscription: {
    id: string;
    object: "subscription";
    collection_method: string;
    created: number;
    currency: string;
    current_period_end: number;
    current_period_start: number;
    customer: string;
    latest_invoice?: {
      id: string;
      object: "invoice";
      payment_intent: { client_secret: string };
    };
    livemode: boolean;
    pending_setup_intent?: {
      id: string;
      object: "setup_intent";
      client_secret: string;
    };

    quantity: number;
    schedule: null;
    start_date: number;
    status: SubscriptionStatus;
    test_clock: null;
    transfer_data: null;
    trial_end: number;
    trial_start: number;
  };
};

export type AuthState = {
  refreshToken: string;
  user: User;
  authToken: string;
};

export interface AuthContextType {
  authToken: string | null;
  refreshToken: string | null;
  isLoggedIn: boolean;
  user: User | null;
  workspace: Workspace | null;
  login: (data: AuthState) => void;
  updateUser: (user: User) => void;
  setWorkspace: (workspace: Workspace) => void;
  logout: () => void;
}
