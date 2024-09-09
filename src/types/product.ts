export type Price = {
  amount: number;
  currency: string;
  interval: string;
  priceId: string;
  productId: string;
};
export type Product = {
  productId: string;
  image: string;
  metadata: {
    team: number;
    en_description: string;
    ua_description: string;
    en_name: string;
    ua_name: string;
  };
  prices: Price[];
};
