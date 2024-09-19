export type Payment = {
  billing_details: {
    address: {
      city: string | null;
      country: string | null;
      line1: string | null;
      line2: string | null;
      postal_code: number;
      state: string | null;
    };
    email: string | null;
    name: string | null;
    phone: string | null;
  };
  brand: "Visa" | "MasterCard";
  country: string;
  created: number;
  exp_month: number;
  exp_year: number;
  id: string;
  last4: string;
};
