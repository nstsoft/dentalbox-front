import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import { useTranslation } from "react-i18next";
import { useRequestResetPasswordMutation } from "@api";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Toaster } from "@components";

interface ForgotPasswordProps {
  open: boolean;
  handleClose: () => void;
}

export const ForgotPassword = ({ open, handleClose }: ForgotPasswordProps) => {
  const { t } = useTranslation("", { keyPrefix: "login" });
  const [email, setEmail] = useState("");
  const [requestResetPassword, { isSuccess, error }] = useRequestResetPasswordMutation();

  useEffect(() => {
    if(isSuccess) {
      handleClose();
    }
  }, [isSuccess, handleClose]);

  useEffect(() => {
    if (error) {
      toast.error(
        <Toaster
          actionName={t("requestResetPasswordError")}
          message={(error as any)?.error}
        />
      );
    }
  }, [error, t]);


  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: (event: FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          requestResetPassword(email);
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
