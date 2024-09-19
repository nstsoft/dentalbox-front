import Card from "react-credit-cards-2";
import { Card as Container } from "@components";

import "react-credit-cards-2/dist/lib/styles.scss";
import { Button, Typography } from "@mui/material";
import { useGetMyPaymentMethodsQuery } from "../../../store/api/payment";

export const Payments = () => {
  const { data: payments } = useGetMyPaymentMethodsQuery();

  return (
    <Container>
      <Typography variant="h4">Payment methods:</Typography>
      {payments?.map((payment) => (
        <Card
          name=" "
          number={`**** **** **** ${payment.last4}`}
          expiry={`${payment.exp_month}/${payment.exp_year}`}
          cvc=""
          preview
          issuer={payment.brand}
        />
      ))}
      <Button variant="contained">Add payment method</Button>
    </Container>
  );
};
