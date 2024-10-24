import { useEffect, useState, type FC } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useGetClientSecretQuery } from "@api";
import { type StripeElementsOptions } from "@stripe/stripe-js";

import { CheckoutForm } from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

type Props = {
  label?: string;
  onCancel?: () => void;
};

export const Checkout: FC<Props> = ({ onCancel, label }) => {
  const { data, status } = useGetClientSecretQuery();
  const [clientSecret, setClientSecret] = useState<string>();
  useEffect(() => {
    if (status === "fulfilled") {
      setClientSecret(data?.clientSecret);
    }
  }, [data, status]);

  if (!clientSecret || !data) {
    return null;
  }

  const options: StripeElementsOptions = {
    locale: "ru",
    clientSecret,
    appearance: { labels: "above", theme: "stripe" },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm
        label={label}
        onCancel={onCancel}
        clearSecret={() => setClientSecret(undefined)}
        clientSecret={clientSecret}
        type={data.type}
      />
    </Elements>
  );
};
