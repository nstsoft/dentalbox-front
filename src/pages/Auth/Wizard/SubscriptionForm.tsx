import { FormEvent, useMemo, useState } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { Card } from "@components";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
  Grid2,
  styled,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { StripeCardElementOptions } from "@stripe/stripe-js";

interface ISubscriptionProps {
  email: string;
  paymentMethodId: string;
  onUpdate: (paymentMethodId: string) => void;
}

export const SubscriptionForm = (props: ISubscriptionProps) => {
  const { email, paymentMethodId, onUpdate } = props;
  const { t } = useTranslation();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [card, setCard] = useState({
    number: "",
    expiry: "",
    cvc: "",
  });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement)!;

    console.log(cardNumberElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardNumberElement,
      billing_details: {
        email: email,
      },
    });

    console.log(paymentMethod);

    if (error) {
      console.log(error);
      return;
    }

    // const response = await fetch("http://localhost:3000/create-subscription", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     email: email,
    //     paymentMethodId: paymentMethod.id,
    //     priceId: "your-price-id", // Replace with your actual price ID
    //   }),
    // });

    // const subscription = await response.json();

    // if (subscription.error) {
    //   setMessage(subscription.error.message);
    // } else {
    //   setMessage("Subscription successful!");
    // }
    setLoading(false);
  };

  const inputStyle = useMemo(
    () => ({
      iconColor: "#c4f0ff",
      color: "#757680",
      fontWeight: "400",
      fontFamily:
        "Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif",
      fontSize: "15px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "#fce883",
      },
      "::placeholder": {
        color: "#757680",
      },
    }),
    []
  );

  const handleCardDetailsChange = (event: any) => {
    console.log(event);
    setCheckoutError(event.error ? event.error.message : null);
  };

  const CardInputWrapper = styled("div")(() => ({
    border: "1px solid #e6e6e6",
    borderRadius: "5px",
    padding: "12px",
    boxShadow:
      "0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(0, 0, 0, 0.02)",
    transition:
      "background 0.15s ease, border 0.15s ease, box-shadow 0.15s ease, color 0.15s ease",
  }));

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
        <FormControl>
          <FormLabel
            htmlFor="cardNumber"
            sx={{
              marginBottom: "4px",
              color: "black",
            }}
          >
            Card number
          </FormLabel>
          <CardInputWrapper>
            <CardNumberElement
              id="cardNumber"
              onLoadError={(error) => console.log(error)}
              options={{ style: { base: inputStyle } }}
              onChange={handleCardDetailsChange}
            />
          </CardInputWrapper>
        </FormControl>
        <Grid2 container spacing={2}>
          <Grid2 size={6}>
            <FormControl sx={{ width: "100%" }}>
              <FormLabel
                htmlFor="cardExpiry"
                sx={{
                  marginBottom: "4px",
                  color: "black",
                }}
              >
                Expiration date
              </FormLabel>
              <CardInputWrapper>
                <CardExpiryElement
                  id="cardExpiry"
                  options={{ style: { base: inputStyle } }}
                  onChange={handleCardDetailsChange}
                />
              </CardInputWrapper>
            </FormControl>
          </Grid2>
          <Grid2 size={6}>
            <FormControl sx={{ width: "100%" }}>
              <FormLabel
                htmlFor="cardExpiry"
                sx={{
                  marginBottom: "4px",
                  color: "black",
                }}
              >
                Security code
              </FormLabel>
              <CardInputWrapper>
                <CardCvcElement
                  id="cardExpiry"
                  options={{ style: { base: inputStyle } }}
                  onChange={handleCardDetailsChange}
                />
              </CardInputWrapper>
            </FormControl>
          </Grid2>
        </Grid2>
        {!paymentMethodId ? (
          <Button variant="contained" type="submit" disabled={!stripe}>
            Add payment method
          </Button>
        ) : (
          <Button type="button" disabled={!stripe}>
            Next
          </Button>
        )}
        {loading && <CircularProgress />}
      </Box>
    </Card>
  );
};
