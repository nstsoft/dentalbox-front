import { useState, useRef, type KeyboardEvent, type ChangeEvent } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Box,
  FormHelperText,
} from "@mui/material";

import { useTranslation } from "react-i18next";

interface ConfirmOtpProps {
  isActive: boolean;
  error?: string;
  confirmOtp: (otp: string) => void;
  resendOtp: () => void;
}

export const ConfirmOtpDialog = ({
  isActive,
  confirmOtp,
  resendOtp,
  error,
}: ConfirmOtpProps) => {
  const { t } = useTranslation("", { keyPrefix: "confirmOtp" });
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const value = event.target.value?.slice(-1);
    if (!value) return;
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLDivElement>,
    index: number
  ) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
    if (event.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
    }
  };

  return (
    <div>
      <Dialog open={isActive}>
        <DialogTitle>{t("confirmOtp")}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t("confirmOtpText")}</DialogContentText>
          <Box display="flex" justifyContent="center" mt={3}>
            {otp.map((digit, index) => (
              <TextField
                key={index}
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                slotProps={{
                  htmlInput: {
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                    style: {
                      textAlign: "center",
                      fontSize: "1.5rem",
                      width: "3rem",
                    },
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderRadius: 0,
                    borderTopLeftRadius: index === 0 ? 4 : 0,
                    borderBottomLeftRadius: index === 0 ? 4 : 0,
                    borderTopRightRadius: index === otp.length - 1 ? 4 : 0,
                    borderBottomRightRadius: index === otp.length - 1 ? 4 : 0,
                  },
                }}
                inputRef={(el) => (inputRefs.current[index] = el)}
              />
            ))}
          </Box>
          <FormHelperText error>{error}</FormHelperText>
        </DialogContent>
        <DialogActions>
          <Button onClick={resendOtp}>
            {t("resendOtp", { keyPrefix: "buttons" })}
          </Button>
          <Button onClick={() => confirmOtp(otp.join(""))}>
            {t("submit", { keyPrefix: "buttons" })}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
