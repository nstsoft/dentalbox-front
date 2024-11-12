import { useEffect, useState, type FC } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useGetClientSecretQuery, useGetMySubscriptionQuery } from "@api";
import { type StripeElementsOptions } from "@stripe/stripe-js";

import { CheckoutForm } from "./CheckoutForm";
import { ProductItem } from "../../pages/Auth/components";
import Box from "@mui/material/Box";
import { SubscriptionInfo } from "../../pages";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

type Props = {
  label?: string;
  onCancel?: () => void;
};

export const Checkout: FC<Props> = ({ onCancel, label }) => {
  const { data, status } = useGetClientSecretQuery();
  const [clientSecret, setClientSecret] = useState<string>();
  const { data: subscription } = useGetMySubscriptionQuery();
  console.log(subscription);
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
    <Box sx={{ display: "flex" }}>
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm
          label={label}
          onCancel={onCancel}
          clearSecret={() => setClientSecret(undefined)}
          clientSecret={clientSecret}
          type={data.type}
        />
      </Elements>
      {subscription && (
        <>
          <ProductItem
            product={subscription.product}
            interval={subscription.price.recurring.interval ?? "week"}
            color="#9fcced"
          />
          <SubscriptionInfo />
        </>
      )}
    </Box>
  );
};
