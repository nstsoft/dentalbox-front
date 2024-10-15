import { useState, type FC, type FormEvent } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { type StripeError } from "@stripe/stripe-js";

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

import { Card } from "@elements";
import { Typography } from "@mui/material";

type Props = {
  type: "setup" | "payment" | "payment-added";
  clientSecret: string;
  clearSecret: () => void;
  onCancel?: () => void;
  label?: string;
};

export const CheckoutForm: FC<Props> = ({
  type,
  clientSecret,
  clearSecret,
  onCancel,
  label,
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
      console.log(error);
      handleError(error);
    } else {
      console.log("success");
    }

    setLoading(false);
    clearSecret();
  };

  const controlPanel = () => {
    if (loading) {
      return (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      );
    }
    return (
      <div style={{ display: "flex", gap: 2 }}>
        {onCancel && (
          <Button fullWidth variant="outlined" onClick={onCancel}>
            cancel
          </Button>
        )}
        <Button type="submit" fullWidth variant="contained">
          submit
        </Button>
      </div>
    );
  };

  return (
    <Card variant="outlined">
      <Typography variant="h2" sx={{ mb: 2 }}>
        {label}
      </Typography>
      <Box
        component="form"
        onSubmit={onSubmit}
        sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 2 }}
      >
        <FormControl>
          <PaymentElement />
        </FormControl>
        <FormControl>{controlPanel()}</FormControl>
      </Box>
    </Card>
  );
};
