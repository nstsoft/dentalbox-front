export type Product = {
  active: boolean;
  amount: number;
  currency: string;
  description: string;
  id: string;
  image: string;
  interval: string;
  name: string;
  priceActive: boolean;
  priceId: string;
  metadata: {
    "team-min": number;
    "team-max": number;
  };
};
