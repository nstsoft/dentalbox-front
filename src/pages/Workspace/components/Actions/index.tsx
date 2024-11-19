import {
  useReactivateSubscriptionMutation,
  useRenewCancelSubscriptionMutation,
} from "@api";
import { CustomModal } from "@elements";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { SubscriptionInactiveStatuses, SubscriptionResponse } from "@types";
import { useState, type FC } from "react";
import { useTranslation } from "react-i18next";
import days from "dayjs";

type Props = {
  subscription: SubscriptionResponse;
};

export const Actions: FC<Props> = ({ subscription }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [type, setType] = useState<"cancel" | "renew" | "reactivate">("cancel");
  const { t } = useTranslation("", { keyPrefix: "pages.workspace" });
  const [reactivateSubscription] = useReactivateSubscriptionMutation();
  const [renewCancelSubscription] = useRenewCancelSubscriptionMutation();

  const actionsMap = {
    cancel: renewCancelSubscription,
    renew: renewCancelSubscription,
    reactivate: reactivateSubscription,
  };

  return (
    <>
      {!SubscriptionInactiveStatuses.includes(
        subscription.status as "canceled" | "unpaid"
      ) && (
        <Button
          onClick={() => {
            setType(subscription.cancelAtPeriodEnd ? "renew" : "cancel");
            setIsModalOpen(true);
          }}
        >
          {t(`buttons.${subscription.cancelAtPeriodEnd ? "renew" : "cancel"}`)}
        </Button>
      )}
      {SubscriptionInactiveStatuses.includes(
        subscription.status as "canceled" | "unpaid"
      ) && (
        <Button
          onClick={() => {
            setType("reactivate");
            setIsModalOpen(true);
          }}
        >
          {t("buttons.reactivate")}
        </Button>
      )}
      <CustomModal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <>
          <Typography variant="h3">{t(`labels.${type}`)}</Typography>
          <Typography variant="body1" sx={{ mt: 2, mb: 2 }}>
            {t(`labels.${type}Confirm`, {
              endDate: days(
                (subscription?.current_period_end ?? 0) * 1000
              ).format("DD.MM.YYYY"),
            })}
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              actionsMap[type]();
              setIsModalOpen(false);
            }}
          >
            {t(`buttons.${type}`)}
          </Button>
        </>
      </CustomModal>
    </>
  );
};
