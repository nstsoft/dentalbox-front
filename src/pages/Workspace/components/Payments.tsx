import "react-credit-cards-2/dist/lib/styles.scss";
import CreditCard from "react-credit-cards-2";
import { Card } from "@elements";

import Typography from "@mui/material/Typography";
import Grid2 from "@mui/material/Grid2";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useGetMyPaymentMethodsQuery, useGetMySubscriptionQuery } from "@api";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";
import AddCardIcon from "@mui/icons-material/AddCard";

export const Payments = () => {
  const { data: payments } = useGetMyPaymentMethodsQuery();
  const { data: subscription } = useGetMySubscriptionQuery();
  const { t } = useTranslation("", {
    keyPrefix: "pages.workspace.paymentsSection",
  });
  const navigate = useNavigate();
  console.log(payments);
  const sorted = [...(payments ?? [])]?.sort((a, b) =>
    a.id === subscription?.defaultPaymentMethod ? -1 : 1
  );

  return (
    <Grid2 container>
      <Typography variant="h4">Payment methods:</Typography>
      <Grid2
        size={12}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          alignContent: "flex-start",
        }}
      >
        {sorted?.map((payment) => (
          <Grid2
            key={payment.id}
            container
            size={12}
            m={2}
            direction="row"
            flexWrap="wrap"
          >
            <Grid2 size={6} sx={{ minWidth: "300px" }}>
              <CreditCard
                name=" "
                number={`**** **** **** ${payment.last4}`}
                expiry={`${payment.exp_month}/${payment.exp_year}`}
                cvc=""
                preview
                issuer={payment.brand}
              />
            </Grid2>
            <Grid2 size={6}>
              {subscription?.defaultPaymentMethod === payment.id ? (
                <Typography variant="h6">{t("default")}</Typography>
              ) : (
                <Card sx={{ height: "100%" }}>
                  <Button>
                    <DeleteIcon />
                  </Button>
                  <Button>
                    <AddCardIcon />
                  </Button>
                </Card>
              )}
            </Grid2>
          </Grid2>
        ))}
      </Grid2>
    </Grid2>

    // <Card sx={{ margin: 0 }}>
    //   <Typography variant="h4">Payment methods:</Typography>
    //   {payments?.map((payment) => (
    //     <CreditCard
    //       name=" "
    //       number={`**** **** **** ${payment.last4}`}
    //       expiry={`${payment.exp_month}/${payment.exp_year}`}
    //       cvc=""
    //       preview
    //       issuer={payment.brand}
    //     />
    //   ))}
    //   <Button variant="contained" onClick={() => navigate("/app/checkout")}>
    //     Add payment method
    //   </Button>
    // </Card>
  );
};
