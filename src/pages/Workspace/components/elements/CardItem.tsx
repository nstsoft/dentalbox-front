import { Payment } from "@types";
import { type FC, useState } from "react";
import { Card } from "@elements";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCardIcon from "@mui/icons-material/AddCard";
import CreditCard from "react-credit-cards-2";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { isMobile } from "react-device-detect";
import moment from "moment/min/moment-with-locales";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { ConfirmPopover } from "@elements";

type CardItemProps = {
  deletePaymentMethod: (methodId: string) => void;
  setDefaultPaymentMethod: (methodId: string) => void;
  paymentMethod: Payment & { default?: boolean };
  isLoading?: boolean;
};

export const CardItem: FC<CardItemProps> = ({
  paymentMethod,
  deletePaymentMethod,
  setDefaultPaymentMethod,
  isLoading,
}) => {
  const theme = useTheme();
  const { t } = useTranslation("", { keyPrefix: "pages.workspace" });
  const [deleteAnchorEl, setDeleteAnchorEl] = useState<HTMLElement>();
  const [setDefaultAnchorEl, setSetDefaultAnchorEl] = useState<HTMLElement>();

  const isDefault = paymentMethod.default;
  const isExpired = moment()
    .year(paymentMethod.exp_year)
    .month(paymentMethod.exp_month)
    .startOf("month")
    .isBefore(moment());

  const makeDefaultButton = () => {
    if (isExpired || isDefault) return null;

    return (
      <>
        <Button
          onClick={({ currentTarget }) => setSetDefaultAnchorEl(currentTarget)}
          variant="text"
        >
          {isMobile ? <AddCardIcon /> : "make default"}
        </Button>
        <ConfirmPopover
          anchorEl={setDefaultAnchorEl}
          setAnchorEl={setSetDefaultAnchorEl}
          label={t("paymentMethods.setDefault")}
          onConfirm={() => setDefaultPaymentMethod(paymentMethod.id)}
        />
      </>
    );
  };

  if (isLoading) return <CircularProgress />;

  return (
    <Card
      key={paymentMethod.id}
      sx={{
        backgroundColor: isExpired ? theme.palette.error.main : "none",
      }}
      className="payment-methods__item"
    >
      <CreditCard
        name=" "
        number={`**** **** **** ${paymentMethod.last4}`}
        expiry={`${paymentMethod.exp_month}/${paymentMethod.exp_year}`}
        cvc=""
        preview
        issuer={paymentMethod.brand}
      />
      <div className="payment-methods__item__details">
        <div className="card-header">
          <Typography pr={1} variant="h5">
            {paymentMethod.brand}{" "}
          </Typography>
          <Typography variant="body1">
            {paymentMethod.exp_month}/{paymentMethod.exp_year}
          </Typography>
        </div>
        <Typography variant="body1">
          **** **** **** {paymentMethod.last4}
        </Typography>
      </div>
      <div className="payment-methods__item__actions">
        {isDefault &&
          (isMobile ? (
            <Typography textAlign="center">
              <DoneOutlineIcon />
            </Typography>
          ) : (
            <Chip className="chip" color="primary" label="default" />
          ))}
        {makeDefaultButton()}
        {!isDefault && (
          <>
            <Button
              onClick={({ currentTarget }) => setDeleteAnchorEl(currentTarget)}
              variant="text"
            >
              <DeleteIcon />
            </Button>
            <ConfirmPopover
              anchorEl={deleteAnchorEl}
              setAnchorEl={setDeleteAnchorEl}
              label={t("paymentMethods.confirmDeleteLabel")}
              onConfirm={() => deletePaymentMethod(paymentMethod.id)}
            />
          </>
        )}
      </div>
    </Card>
  );
};
