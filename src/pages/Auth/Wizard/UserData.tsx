import { ChangeEvent, FormEvent, useState } from "react";
import { StepWizardChildProps } from "react-step-wizard";
import type { UserForm } from "./types";
import { useTranslation } from "react-i18next";
import { Card } from "@components";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import { validateLogin, validatePhone } from "@utils";

interface IUserDataStepProps {
  userForm: UserForm;
  onUpdate: (data: Partial<UserForm>) => void;
}

export const UserData = (
  props: IUserDataStepProps & Partial<StepWizardChildProps>
) => {
  const { userForm, onUpdate, nextStep } = props;
  const { t } = useTranslation();
  const [emailError, setEmailError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const signUpInputs = [
    {
      id: "name",
      label: t("signUpWizard.userData.name"),
      type: "text",
      placeholder: t("signUpWizard.userData.name"),
      value: userForm.name,
      onChange: (ev: ChangeEvent<HTMLInputElement>) => {
        onUpdate({ name: ev.target.value });
      },
    },
    {
      id: "surname",
      label: t("signUpWizard.userData.surname"),
      type: "text",
      placeholder: t("signUpWizard.userData.surname"),
      value: userForm.surname,
      onChange: (ev: ChangeEvent<HTMLInputElement>) => {
        onUpdate({ surname: ev.target.value });
      },
    },
    {
      id: "secondName",
      label: t("signUpWizard.userData.secondName"),
      type: "text",
      placeholder: t("signUpWizard.userData.secondName"),
      value: userForm.secondName,
      onChange: (ev: ChangeEvent<HTMLInputElement>) => {
        onUpdate({ secondName: ev.target.value });
      },
    },
    {
      id: "phone",
      label: t("signUpWizard.userData.phone"),
      type: "tel",
      placeholder: t("signUpWizard.userData.phone"),
      value: userForm.phone,
      onChange: (ev: ChangeEvent<HTMLInputElement>) => {
        onUpdate({ phone: ev.target.value });
      },
      error: phoneError,
    },
    {
      id: "email",
      label: t("signUpWizard.userData.email"),
      type: "email",
      placeholder: t("signUpWizard.userData.email"),
      value: userForm.email,
      onChange: (ev: ChangeEvent<HTMLInputElement>) => {
        onUpdate({ email: ev.target.value });
      },
      error: emailError,
    },
    {
      id: "password",
      label: t("signUpWizard.userData.password"),
      type: "password",
      placeholder: t("signUpWizard.userData.password"),
      value: userForm.password,
      onChange: (ev: ChangeEvent<HTMLInputElement>) => {
        onUpdate({ password: ev.target.value });
      },
      error: passwordError,
    },
  ];

  const onNext = (event: FormEvent) => {
    event.preventDefault();

    if (validatePhone(userForm.phone)) {
      setPhoneError(null);
    } else {
      setPhoneError("Please enter a valid phone number.");
      return;
    }

    if (validateLogin(userForm.email)) {
      setEmailError(null);
    } else {
      setEmailError("Please enter a valid email address.");
      return;
    }

    if (userForm.password.length >= 6) {
      setPasswordError(null);
      nextStep?.();
    } else {
      setPasswordError("Password must be at least 6 characters long.");
      return;
    }
  };

  return (
    <Card variant="outlined">
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
      >
        {t("signUpWizard.userData.title")}
      </Typography>
      <Box
        component="form"
        onSubmit={onNext}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: 2,
        }}
      >
        {signUpInputs.map((input, index) => (
          <FormControl key={input.id}>
            <FormLabel htmlFor={input.id}>{input.label}</FormLabel>
            <TextField
              error={!!input.error}
              helperText={input.error}
              id={input.id}
              type={input.type}
              name={input.id}
              placeholder={input.placeholder}
              autoFocus={index === 0}
              required
              fullWidth
              onChange={input.onChange}
              value={input.value}
              variant="outlined"
              color={input.error ? "error" : "primary"}
              sx={{ ariaLabel: input.id }}
            />
          </FormControl>
        ))}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button type="submit" variant="contained">
            {t("signUpWizard.nextButton")}
          </Button>
        </Box>
      </Box>
    </Card>
  );
};
