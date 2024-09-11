import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {
  useGetMySubscriptionQuery,
  useLazyCreatePaymentIntentQuery,
} from "@api";
import { type StripeElementsOptions } from "@stripe/stripe-js";

import { CheckoutForm } from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export const Checkout = () => {
  const [clientSecret, setClientSecret] = useState<string | undefined>();
  const {
    data,
    status: subscriptionRequestStatus,
    error: subscriptionError,
  } = useGetMySubscriptionQuery();

  const [
    createPaymentIntent,
    { data: paymentIntent, status: intentRequestStatus },
  ] = useLazyCreatePaymentIntentQuery();

  useEffect(() => {
    if (data?.type === "payment-added" && !subscriptionError) {
      createPaymentIntent();
    }
  }, [data?.type, createPaymentIntent, subscriptionError]);

  useEffect(() => {
    if (subscriptionRequestStatus === "fulfilled" && !clientSecret) {
      setClientSecret(data?.clientSecret);
    }
  }, [
    subscriptionRequestStatus,
    data?.clientSecret,
    setClientSecret,
    clientSecret,
  ]);

  useEffect(() => {
    if (intentRequestStatus === "fulfilled" && !clientSecret) {
      setClientSecret(paymentIntent?.client_secret);
    }
  }, [intentRequestStatus, paymentIntent?.client_secret, clientSecret]);

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
        clearSecret={() => setClientSecret(undefined)}
        clientSecret={clientSecret}
        type={data.type}
      />
    </Elements>
  );
};
