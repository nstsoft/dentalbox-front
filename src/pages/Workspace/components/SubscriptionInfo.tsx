import { Card } from "@components";
import { Box, Tooltip, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import icons from "currency-icons";
import moment from "moment";
import { useGetMySubscriptionQuery } from "@api";

export const SubscriptionInfo = () => {
  const { data: subscription } = useGetMySubscriptionQuery();
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
      value: subscription?.status,
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
      value: `${(subscription?.price.unit_amount ?? 0) / 100}${
        subscription
          ? icons[subscription?.price.currency.toUpperCase()]?.symbol
          : ""
      } / ${subscription?.price.recurring?.interval}`,
    },
    {
      id: "periodStart",
      title: "Period start",
      value: moment((subscription?.current_period_start ?? 0) * 1000).format(
        "DD.MM.YYYY"
      ),
    },
    {
      id: "periodEnd",
      title: "Period end",
      value: moment((subscription?.current_period_end ?? 0) * 1000).format(
        "DD.MM.YYYY"
      ),
    },
  ];

  return (
    <Card sx={{ m: 0 }}>
      <Box>
        <Typography variant="h4" sx={{ marginBottom: "20px" }}>
          Subscription info
        </Typography>
        {subscriptionDataMap.map((data) => (
          <Box key={data.id} sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="h6"
              sx={{
                width: "130px",
                marginRight: data.id === "description" ? "20px" : 0,
              }}
            >
              {data.title}:
            </Typography>
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
    </Card>
  );
};
