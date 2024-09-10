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
  const { data, status: subscriptionRequestStatus } =
    useGetMySubscriptionQuery();

  const [
    createPaymentIntent,
    { data: paymentIntent, status: intentRequestStatus },
  ] = useLazyCreatePaymentIntentQuery();

  useEffect(() => {
    if (data?.type !== "payment-added") {
      createPaymentIntent();
    }
  }, [data?.type, createPaymentIntent]);

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

  const isFirstPayment = data?.type !== "payment-added";

  const options: StripeElementsOptions = {
    locale: "ru",
    clientSecret,
  };

  if (isFirstPayment) {
    Object.assign(options, {
      amount: data?.price.unit_amount,
      currency: data?.price.currency,
      mode: "subscription",
      appearance: { labels: "above", theme: "stripe" },
    });
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm clientSecret={clientSecret} type={data.type} />
    </Elements>
  );
};
