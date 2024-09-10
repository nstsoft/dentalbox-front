import { useEffect, useState, type FC, type FormEvent } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { type StripeError } from "@stripe/stripe-js";
import { useRegisterMutation } from "@api";
import { convertFileToBase64 } from "@utils";
import type { WorkspaceForm, UserForm } from "./types";
import { Box, FormControl, Button } from "@mui/material";
import { Card } from "@components";
import { Product } from "@types";
import { useAuth } from "@hooks";

type Props = {
  workspaceImage?: File;
  workspace: WorkspaceForm;
  user: UserForm;
  product: Product;
};

export const CheckoutForm: FC<Props> = ({
  workspace,
  workspaceImage,
  product,
  user,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [register, { data, status }] = useRegisterMutation();
  const auth = useAuth();

  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState(false);

  const handleError = (error: StripeError) => {
    setLoading(false);
    setErrorMessage(error?.message);
  };

  useEffect(() => {
    if (data && status === "fulfilled") {
      auth.login(data);
    }
  }, [data, status, auth]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const imageBase64 =
      workspaceImage && (await convertFileToBase64(workspaceImage));

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    const { error: submitError } = await elements.submit();

    if (submitError) {
      handleError(submitError);
      return;
    }

    const registerResponse = await register({
      workspace,
      user: {
        ...user,
        phone: user.phone.replace(/\s/g, ""),
      },
      workspaceImage: imageBase64,
      productId: product.productId,
      priceId: product.prices[0].priceId,
    });

    const stripeSubscription = registerResponse.data?.stripeSubscription;

    const confirmIntent = stripeSubscription?.pending_setup_intent
      ?.client_secret
      ? stripe.confirmSetup
      : stripe.confirmPayment;

    const clientSecret =
      stripeSubscription?.pending_setup_intent?.client_secret ??
      stripeSubscription?.latest_invoice?.payment_intent.client_secret;

    if (!clientSecret) {
      return null;
    }
    const { error } = await confirmIntent({
      elements,
      clientSecret,
      confirmParams: {
        return_url: "http://localhost:5173/app",
      },
    });

    if (error) {
      handleError(error);
    } else {
      console.log("success");
    }
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
          <Button type="submit" fullWidth variant="contained">
            submit
          </Button>
        </FormControl>
      </Box>
    </Card>
  );
};
