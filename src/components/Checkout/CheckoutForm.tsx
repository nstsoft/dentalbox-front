import { useState, type FC, type FormEvent } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { type StripeError } from "@stripe/stripe-js";

import { Box, FormControl, Button, CircularProgress } from "@mui/material";
import { Card } from "@components";

type Props = {
  type: "setup" | "payment" | "payment-added";
  clientSecret: string;
  clearSecret: () => void;
};

export const CheckoutForm: FC<Props> = ({
  type,
  clientSecret,
  clearSecret,
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const [, setErrorMessage] = useState<string>();
  const [loading, setLoading] = useState(false);

  const handleError = (error: StripeError) => {
    setLoading(false);
    setErrorMessage(error?.message as string);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    const resp = await elements.submit();

    const { error: submitError } = resp;

    if (submitError) {
      handleError(submitError);
      return;
    }

    const confirmIntent =
      type === "payment" ? stripe.confirmPayment : stripe.confirmSetup;

    const { error } = await confirmIntent({
      elements,
      clientSecret,
      confirmParams: { return_url: window.location.origin + "/app" },
    });

    if (error) {
      handleError(error);
    } else {
      console.log("success");
    }

    setLoading(false);
    clearSecret();
  };
  return (
    <Card variant="outlined">
      <h2>Payment method</h2>
      <Box
        component="form"
        onSubmit={onSubmit}
        sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 2 }}
      >
        <FormControl>
          <PaymentElement />
        </FormControl>
        <FormControl>
          {loading ? (
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          ) : (
            <Button type="submit" fullWidth variant="contained">
              submit
            </Button>
          )}
        </FormControl>
      </Box>
    </Card>
  );
};
