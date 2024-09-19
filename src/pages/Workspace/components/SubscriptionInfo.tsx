import { Card } from "@components";
import { Box, Button, Tooltip, Typography } from "@mui/material";
import { SubscriptionResponse } from "@types";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import icons from "currency-icons";
import moment from "moment";

type SubscriptionInfoProps = {
  subscription: SubscriptionResponse | null;
};

export const SubscriptionInfo: FC<SubscriptionInfoProps> = ({
  subscription,
}) => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const subscriptionDataMap = [
    {
      id: "name",
      title: "Name",
      value:
        i18n.language === "en"
          ? subscription?.product.metadata.ua_name
          : subscription?.product.metadata.en_name,
    },
    {
      id: "status",
      title: "Status",
      value: subscription?.price.active ? "Active" : "Inactive",
    },
    {
      id: "description",
      title: "Description",
      value:
        i18n.language === "en"
          ? subscription?.product.metadata.ua_description
          : subscription?.product.metadata.en_description,
    },
    {
      id: "price",
      title: "Price",
      value: `${subscription?.price.unit_amount}${
        subscription
          ? icons[subscription?.price.currency.toUpperCase()]?.symbol
          : ""
      } / ${subscription?.price.recurring?.interval}`,
    },
    {
      id: "periodStart",
      title: "Period start",
      value: moment(subscription?.current_period_start).format("DD.MM.YYYY"),
    },
    {
      id: "periodEnd",
      title: "Period end",
      value: moment(subscription?.current_period_end).format("DD.MM.YYYY"),
    },
  ];
  console.log(subscription);

  return (
    <Card>
      <Box>
        <Typography variant="h4" sx={{ marginBottom: "20px" }}>
          Subscription info
        </Typography>
        {subscriptionDataMap.map((data) => (
          <Box
            key={data.id}
            sx={{ display: "flex", gap: "15px", alignItems: "center" }}
          >
            <Typography variant="h6">{data.title}:</Typography>
            <Tooltip title={data.value}>
              <Typography
                component="p"
                sx={{
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: "3",
                  WebkitBoxOrient: "vertical",
                  cursor: "default",
                }}
              >
                {data.value}
              </Typography>
            </Tooltip>
          </Box>
        ))}
      </Box>
      <Box>
        <Typography variant="h6" sx={{ marginBottom: "20px" }}>
          Current payment method:
        </Typography>
        <Box></Box>
      </Box>
      <Button
        variant="outlined"
        fullWidth
        onClick={() => navigate("/app/checkout")}
      >
        Add payment card
      </Button>
    </Card>
  );
};
