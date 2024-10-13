import "react-credit-cards-2/dist/lib/styles.scss";
import "./payment.scss";
import CreditCard from "react-credit-cards-2";

import Typography from "@mui/material/Typography";
import Grid2 from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import { useGetMyPaymentMethodsQuery, useGetMySubscriptionQuery } from "@api";

import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";
import AddCardIcon from "@mui/icons-material/AddCard";
import { Card } from "@elements";

export const Payments = () => {
  const { data: payments } = useGetMyPaymentMethodsQuery();
  const { data: subscription } = useGetMySubscriptionQuery();
  const { t } = useTranslation("", {
    keyPrefix: "pages.workspace.paymentsSection",
  });

  const sorted = [...(payments ?? [])]?.sort((a) =>
    a.id === subscription?.defaultPaymentMethod ? -1 : 1
  );

  const defaultMethod = payments?.find(
    (el) => el.id === subscription?.defaultPaymentMethod
  );

  const restMethods = payments?.filter(
    (el) => el.id !== subscription?.defaultPaymentMethod
  );

  return (
    <Grid2 container>
      <Typography variant="h4">{t("payments")}</Typography>
      <Grid2
        size={12}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          alignContent: "flex-start",
        }}
      >
        {sorted?.map((payment) => (
          <Grid2
            key={payment.id}
            container
            size={12}
            mt={2}
            direction="row"
            flexWrap="wrap"
          >
            <Card sx={{ display: "flex", flexDirection: "row", margin: 0 }}>
              <Grid2 size={4}>
                <CreditCard
                  name=" "
                  number={`**** **** **** ${payment.last4}`}
                  expiry={`${payment.exp_month}/${payment.exp_year}`}
                  cvc=""
                  preview
                  issuer={payment.brand}
                />
              </Grid2>
              <Grid2 size={8}>
                {subscription?.defaultPaymentMethod === payment.id ? (
                  <Typography variant="h6">{t("default")}</Typography>
                ) : (
                  <Grid2
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-start"
                  >
                    <Button>
                      <DeleteIcon />
                      <Typography>{t("delete")}</Typography>
                    </Button>
                    <Button>
                      <AddCardIcon />
                      <Typography>{t("makeDefault")}</Typography>
                    </Button>
                  </Grid2>
                )}
              </Grid2>
            </Card>
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
