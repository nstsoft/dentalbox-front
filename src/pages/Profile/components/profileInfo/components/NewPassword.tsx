import { InfoCard } from "@components";
import FormHelperText from "@mui/material/FormHelperText";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import { type FC, useState } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  onSubmit: () => void;
};

export const NewPassword: FC<Props> = ({ onSubmit }) => {
  const { t } = useTranslation("", { keyPrefix: "pages.profile.password" });
  const [password, setPassword] = useState<{ [key: string]: string }>({
    current: "",
    new: "",
    confirm: "",
  });
  const [error, setError] = useState<{ [key: string]: string }>({
    current: "",
    new: "",
    confirm: "",
  });

  const validateFields = () => {
    if (password.current.length === 0) {
      setError({ ...error, currentPassword: t("required") });
      return false;
    }

    if (password.new.length === 0) {
      setError({ ...error, newPassword: t("required") });
      return false;
    }

    if (password.new.length < 6) {
      setError({ ...error, newPassword: t("minLength") });
      return false;
    }

    if (password.confirm.length === 0) {
      setError({ ...error, confirmedPassword: t("required") });
      return false;
    }

    if (password.new !== password.confirm) {
      setError({ ...error, confirmedPassword: t("match") });
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (!validateFields()) return;
    onSubmit();
  };

  return (
    <InfoCard
      onSubmit={handleSubmit}
      buttonLabel={t("save", { keyPrefix: "buttons" })}
      canEdit
    >
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        {["current", "new", "confirm"].map((input) => (
          <FormControl fullWidth key={input}>
            <InputLabel htmlFor={`${input}-password`}>{t(input)}</InputLabel>
            <OutlinedInput
              error={!!error[input]}
              id={`${input}-password`}
              type="password"
              required
              onChange={({ target }) =>
                setPassword({ ...password, [input]: target.value })
              }
              value={password[input]}
              color={error.currentPassword ? "error" : "primary"}
              name="current-password"
              label={t(input)}
              sx={{ ariaLabel: t(input) }}
              autoComplete="off"
            />
            <FormHelperText error={!!error[input]}>
              {error[input]}
            </FormHelperText>
          </FormControl>
        ))}
      </Box>
    </InfoCard>
  );
};
