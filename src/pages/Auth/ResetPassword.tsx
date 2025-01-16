import { useResetPasswordMutation } from "@api";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { FormEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { toast } from "react-toastify";
import { Toaster } from "@components";

export const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [resetPassword, { isSuccess, error }] = useResetPasswordMutation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string>();
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>();
  const navigate = useNavigate();

  const { t } = useTranslation("", { keyPrefix: "resetPassword" });

  const validateForm = () => {
    setPasswordError(undefined);
    setConfirmPasswordError(undefined);

    if (password.length <= 6) {
      setPasswordError(t("passwordError"));
      return false;
    }
    if(!confirmPassword) {
      setConfirmPasswordError(t("requiredError"));
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError(t("matchError"));
      return false;
    }
    return true;
  };

  const submitResetPassword = (e: FormEvent) => {
    e.preventDefault();

    const isFormValid = validateForm();
    if (isFormValid) {
      resetPassword({ token: token as string, password });
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(
        <Toaster
          actionName={t("resetPasswordError")}
          message={(error as any)?.error}
        />
      );
    }
  }, [error, t]);

  return (
    <Box className="container">
      <h1>{t("title")}</h1>

      <Box
        className="resetPassword"
        component="form"
        onSubmit={submitResetPassword}
      >
        {!isSuccess && (
          <>
            <FormControl className="form-control" id="password">
              <InputLabel htmlFor="password">{t("password")}</InputLabel>
              <OutlinedInput
                error={!!passwordError}
                id="outlined-password"
                type="password"
                onChange={(el) => setPassword(el.target.value)}
                value={password}
                color={passwordError ? "error" : "primary"}
                name="password"
                label="password"
              />
              <FormHelperText error={!!passwordError}>
                {passwordError}
              </FormHelperText>
            </FormControl>
            <FormControl className="form-control" id="confirmPassword">
              <InputLabel htmlFor="confirmPassword">
                {t("confirmPassword")}
              </InputLabel>
              <OutlinedInput
                error={!!confirmPasswordError}
                id="outlined-confirmPassword"
                type="password"
                onChange={(el) => setConfirmPassword(el.target.value)}
                value={confirmPassword}
                color={confirmPasswordError ? "error" : "primary"}
                name="confirmPassword"
                label="confirmPassword"
              />
              <FormHelperText error={!!confirmPasswordError}>
                {confirmPasswordError}
              </FormHelperText>
            </FormControl>

            <Button fullWidth type="submit" variant="contained">
              {t("submit", { keyPrefix: "buttons" })}
            </Button>
          </>
        )}
        {isSuccess && (
          <>
            <CheckCircleOutlineIcon className="success-icon" color="success" />
            <Typography sx={{ mb: 1 }}>{t("successMessage")}</Typography>
            <Button
              fullWidth
              variant="contained"
              onClick={() => navigate("/auth/login")}
            >
              {t("login", { keyPrefix: "buttons" })}
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};
