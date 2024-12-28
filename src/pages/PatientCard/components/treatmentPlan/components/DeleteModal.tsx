import { CustomModal } from "@elements";
import { type FC } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import { isMobile } from "react-device-detect";

import "../style.scss";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
};

export const DeleteModal: FC<Props> = ({ open, onClose, onSubmit }) => {
  const { t } = useTranslation("", {
    keyPrefix: "pages.patientCard.treatmentPlan",
  });

  return (
    <CustomModal
      open={open}
      onClose={() => onClose()}
      sx={{ minWidth: isMobile ? "100%" : "500px" }}
    >
      <Box className="delete-treatment-modal-content">
        <Typography variant="h5" sx={{ mb: 2 }}>
          {t("delete")}
        </Typography>
        <Box sx={{ mt: 2, mb: 2, textAlign: "center" }}>
          <Typography variant="body1">{t("deleteMessage")}</Typography>
        </Box>
        <Box className="treatment-buttons">
          <Button variant="contained" onClick={() => onSubmit()}>
            {t("delete", { keyPrefix: "buttons" })}
          </Button>
        </Box>
      </Box>
    </CustomModal>
  );
};
