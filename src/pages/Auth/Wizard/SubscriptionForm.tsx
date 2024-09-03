import { FormEvent, useState } from "react";
import {
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Card } from "@components";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { StripeCardElementOptions } from "@stripe/stripe-js";

export const SubscriptionForm = () => {
  const { t } = useTranslation();
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement)!;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        email: email,
      },
    });

    if (error) {
      setMessage(error.message ?? '');
      return;
    }

    const response = await fetch("http://localhost:3000/create-subscription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        paymentMethodId: paymentMethod.id,
        priceId: "your-price-id", // Replace with your actual price ID
      }),
    });

    const subscription = await response.json();

    if (subscription.error) {
      setMessage(subscription.error.message);
    } else {
      setMessage("Subscription successful!");
    }
  };

  // Define custom styles for CardElement
  const cardStyle: StripeCardElementOptions = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  return (
    <Card variant="outlined">
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
      >
        {t("signUpWizard.subscriptionForm.title")}
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: 2,
        }}
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <CardElement options={cardStyle} />
        <button type="submit" disabled={!stripe}>
          Subscribe
        </button>
        {message && <div>{message}</div>}
      </Box>
    </Card>
  );
};
