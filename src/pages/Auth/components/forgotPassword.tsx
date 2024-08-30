import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  OutlinedInput,
  InputLabel,
  FormControl,
} from "@mui/material";

import { useTranslation } from "react-i18next";

interface ForgotPasswordProps {
  open: boolean;
  handleClose: () => void;
}

export const ForgotPassword = ({ open, handleClose }: ForgotPasswordProps) => {
  const { t } = useTranslation("", { keyPrefix: "login" });
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          handleClose();
        },
      }}
    >
      <DialogTitle>{t("resetPassword")}</DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
      >
        <DialogContentText>{t("resetPasswordText")}</DialogContentText>
        <FormControl>
          <InputLabel htmlFor="email">{t("email")}</InputLabel>
          <OutlinedInput
            autoFocus
            required
            margin="dense"
            id="email"
            name="email"
            label="email"
            type="email"
            fullWidth
          />
        </FormControl>
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={handleClose}>
          {t("cancel", { keyPrefix: "buttons" })}
        </Button>
        <Button variant="contained" type="submit">
          {t("submit", { keyPrefix: "buttons" })}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
