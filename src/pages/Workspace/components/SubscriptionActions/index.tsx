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

export const SubscriptionActions: FC<Props> = ({ subscription }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation("", { keyPrefix: "pages.workspace" });
  const [reactivateSubscription] = useReactivateSubscriptionMutation();
  const [renewCancelSubscription] = useRenewCancelSubscriptionMutation();
  const isActiveStatus = SubscriptionInactiveStatuses.includes(
    subscription.status as "canceled" | "unpaid"
  );

  return (
    <>
      {!isActiveStatus && (
        <>
          {subscription.cancelAtPeriodEnd ? (
            <Button
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              {t("buttons.renew")}
            </Button>
          ) : (
            <Button
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              {t("buttons.cancel")}
            </Button>
          )}
        </>
      )}
      {isActiveStatus && (
        <Button
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          {t("buttons.reactivate")}
        </Button>
      )}
      <CustomModal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <>
          <Typography variant="h3">
            {t(
              `labels.${
                isActiveStatus
                  ? "reactivate"
                  : subscription.cancelAtPeriodEnd
                  ? "renew"
                  : "cancel"
              }`
            )}
          </Typography>
          <Typography variant="body1" sx={{ mt: 2, mb: 2 }}>
            {t(
              `labels.${
                isActiveStatus
                  ? "reactivate"
                  : subscription.cancelAtPeriodEnd
                  ? "renew"
                  : "cancel"
              }Confirm`,
              {
                endDate: days(
                  (subscription?.current_period_end ?? 0) * 1000
                ).format("DD.MM.YYYY"),
              }
            )}
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              if (isActiveStatus) {
                reactivateSubscription();
              } else {
                renewCancelSubscription();
              }
              setIsModalOpen(false);
            }}
          >
            {t(
              `buttons.${
                isActiveStatus
                  ? "reactivate"
                  : subscription.cancelAtPeriodEnd
                  ? "renew"
                  : "cancel"
              }`
            )}
          </Button>
        </>
      </CustomModal>
    </>
  );
};
