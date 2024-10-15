import "react-credit-cards-2/dist/lib/styles.scss";
import "./payment.scss";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {
  useGetMyPaymentMethodsQuery,
  useGetMySubscriptionQuery,
  useDeletePaymentMethodMutation,
  useSetDefaultPaymentMethodMutation,
} from "@api";
import { useTranslation } from "react-i18next";
import AddCardIcon from "@mui/icons-material/AddCard";
import { isMobile } from "react-device-detect";
import { CardItem } from "./elements";
import { useEffect, useState } from "react";

import { Checkout } from "@components";

export const Payments = () => {
  const {
    data: payments,
    refetch: refetchMethods,
    isFetching: isFetchingMethods,
  } = useGetMyPaymentMethodsQuery();
  const {
    data: subscription,
    refetch,
    isFetching: isFetchingSubscription,
  } = useGetMySubscriptionQuery();
  const [deletePaymentMethod, deleteData] = useDeletePaymentMethodMutation();
  const [setDefaultPaymentMethod, setDefaultPaymentMethodData] =
    useSetDefaultPaymentMethodMutation();

  const [openAddCardModal, setIsOpenAddCardModal] = useState(false);

  const { t } = useTranslation("", {
    keyPrefix: "pages.workspace.paymentsSection",
  });

  useEffect(() => {
    if (deleteData.isSuccess || setDefaultPaymentMethodData.isSuccess) {
      refetch();
      refetchMethods();
    }
  }, [
    deleteData.isSuccess,
    refetch,
    refetchMethods,
    setDefaultPaymentMethodData.isSuccess,
  ]);

  const ordered = payments?.map((el) => ({
    default: el.id === subscription?.defaultPaymentMethod,
    ...el,
  }));

  const sorted = ordered?.sort((a) => (a.default ? -1 : 1));

  return (
    <div className={"payment-methods-section" + (isMobile ? " mobile" : "")}>
      <Typography variant="h4">{t("payments")}</Typography>
      <div className="payment-methods">
        <div className="payment-methods__control">
          <div>
            <Typography variant="h6">
              <AddCardIcon /> Credit card(s)
            </Typography>
          </div>
          <div>
            <Typography variant="body1">Manage Your Payment Methods</Typography>
          </div>

          <Button
            onClick={() => setIsOpenAddCardModal(true)}
            sx={{ marginTop: 3, marginBottom: 3 }}
            variant="contained"
          >
            Add credit card
          </Button>
        </div>
        <div className="payment-methods__list">
          {sorted?.map((paymentMethod) => (
            <CardItem
              isLoading={isFetchingSubscription || isFetchingMethods}
              paymentMethod={paymentMethod}
              key={paymentMethod.id}
              deletePaymentMethod={deletePaymentMethod}
              setDefaultPaymentMethod={setDefaultPaymentMethod}
            />
          ))}
        </div>
      </div>
      <Modal
        open={openAddCardModal}
        onClose={() => setIsOpenAddCardModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ width: "100vw", height: "100vh", display: "flex" }}>
          <Checkout
            label={t("addCardLabel", {
              keyPrefix: "pages.workspace.paymentMethods",
            })}
            onCancel={() => setIsOpenAddCardModal(false)}
          />
        </Box>
      </Modal>
    </div>
  );
};
