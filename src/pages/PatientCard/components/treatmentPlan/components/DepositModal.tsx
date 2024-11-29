import { CustomModal } from "@elements";
import { type FC, useEffect, useState } from "react";
import { TreatmentPlan } from "@types";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import { isMobile } from "react-device-detect";

import "../style.scss";

type Props = {
  open: boolean;
  onClose: () => void;
  selectedPlan: TreatmentPlan | null;
  onSubmit: (deposit: number) => void;
};

export const DepositModal: FC<Props> = ({
  open,
  onClose,
  selectedPlan,
  onSubmit,
}) => {
  const { t } = useTranslation("", {
    keyPrefix: "pages.patientCard.treatmentPlan",
  });
  const totalDeposit =
    selectedPlan?.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    ) ?? 0;
  const [deposit, setDeposit] = useState("");

  useEffect(() => {
    if (selectedPlan) {
      setDeposit(`${totalDeposit}`);
    }
  }, [selectedPlan]);

  return (
    <CustomModal
      open={open}
      onClose={() => {
        onClose();
        setDeposit("");
      }}
      sx={{
        minWidth: isMobile ? "100%" : "200px",
        minHeight: "150px",
        maxHeight: isMobile ? "400px" : "450px",
      }}
    >
      <Box className="add-treatment-history-modal-content">
        <Typography variant="h5" sx={{ mb: 2 }}>
          {t("addDeposit")}
        </Typography>
        <Box className="treatment-history-item-info">
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel htmlFor="deposit">{t("deposit")}</InputLabel>
            <OutlinedInput
              id="deposit"
              type="number"
              required
              onChange={({ target }) => setDeposit(target.value ?? 0)}
              value={deposit}
              color="primary"
              name="deposit"
              label={t("deposit")}
              sx={{ ariaLabel: "Deposit" }}
            />
          </FormControl>
        </Box>
        <Box className="treatment-buttons">
          <Button
            variant="contained"
            onClick={() => {
              onSubmit(Number(deposit ?? 0));
              setDeposit("");
            }}
          >
            {t("addDeposit")}
          </Button>
        </Box>
      </Box>
    </CustomModal>
  );
};
