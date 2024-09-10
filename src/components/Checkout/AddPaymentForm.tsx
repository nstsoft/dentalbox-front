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
};

export const PaymentForm: FC<Props> = ({ type, clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState(false);

  const handleError = (error: StripeError) => {
    setLoading(false);
    setErrorMessage(error?.message);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    const { error: submitError } = await elements.submit();

    if (submitError) {
      handleError(submitError);
      return;
    }

    const confirmIntent =
      type === "setup" ? stripe.confirmSetup : stripe.confirmPayment;

    const { error } = await confirmIntent({
      elements,
      clientSecret,
      confirmParams: {
        return_url: "http://localhost:5173/app",
      },
    });

    console.log(error);

    if (error) {
      handleError(error);
    } else {
      console.log("success");
    }

    setLoading(false);
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
          {loading && (
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          )}
          <Button type="submit" fullWidth variant="contained">
            submit
          </Button>
        </FormControl>
      </Box>
    </Card>
  );
};
