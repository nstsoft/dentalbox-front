import { ChangeEvent, FormEvent, Fragment, useState } from "react";
import { StepWizardChildProps } from "react-step-wizard";
import type { UserForm } from "./types";
import { useTranslation } from "react-i18next";
import { Card } from "@components";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { validateLogin } from "@utils";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import { DatePicker } from "@mui/x-date-pickers";
import moment, { Moment } from "moment";

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
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);
  const [birthDateError, setBirthDateError] = useState<string | null>(null);
  const signUpInputs = [
    {
      name: "section1",
      direction: "row",
      content: [
        {
          id: "name",
          label: t("signUpWizard.userData.name"),
          type: "text",
          value: userForm.name,
          onChange: (ev: ChangeEvent<HTMLInputElement>) => {
            onUpdate({ name: ev.target.value });
          },
        },
        {
          id: "surname",
          label: t("signUpWizard.userData.surname"),
          type: "text",
          value: userForm.surname,
          onChange: (ev: ChangeEvent<HTMLInputElement>) => {
            onUpdate({ surname: ev.target.value });
          },
        },
      ],
    },
    {
      name: "section2",
      direction: "row",
      content: [
        {
          id: "secondName",
          label: t("signUpWizard.userData.secondName"),
          type: "text",
          value: userForm.secondName,
          onChange: (ev: ChangeEvent<HTMLInputElement>) => {
            onUpdate({ secondName: ev.target.value });
          },
        },
        {
          id: "phone",
          label: t("signUpWizard.userData.phone"),
          value: userForm.phone,
          error: phoneError,
        },
      ],
    },
    {
      name: "section3",
      direction: "column",
      content: [
        {
          id: "birthDate",
          label: t("signUpWizard.userData.birthDate"),
          value: userForm.birthDate,
          onChange: (ev: ChangeEvent<HTMLInputElement>) => {
            onUpdate({ email: ev.target.value });
          },
          error: birthDateError,
        },
        {
          id: "email",
          label: t("signUpWizard.userData.email"),
          type: "email",
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
          value: userForm.password,
          onChange: (ev: ChangeEvent<HTMLInputElement>) => {
            onUpdate({ password: ev.target.value });
          },
          error: passwordError,
        },
        {
          id: "confirmPassword",
          label: t("signUpWizard.userData.confirmPassword"),
          type: "password",
          value: confirmPassword,
          onChange: (ev: ChangeEvent<HTMLInputElement>) => {
            setConfirmPassword(ev.target.value);
          },
          error: confirmPasswordError,
        },
      ],
    },
  ];

  const onNext = (event: FormEvent) => {
    event.preventDefault();

    if (matchIsValidTel(userForm.phone)) {
      setPhoneError(null);
    } else {
      setPhoneError("Please enter a valid phone number.");
      return;
    }

    if (userForm.birthDate && moment(userForm.birthDate).isValid()) {
      setBirthDateError(null);
    } else {
      setBirthDateError("Please enter valid date.");
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
    } else {
      setPasswordError("Password must be at least 6 characters long.");
      return;
    }

    if (confirmPassword === userForm.password) {
      setConfirmPasswordError(null);
      nextStep?.();
    } else {
      setConfirmPasswordError("Password must be the same.");
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
        {signUpInputs.map((section) => (
          <Box
            key={section.name}
            sx={{
              display: "flex",
              gap: 1,
              flexDirection: section.direction,
              justifyContent: "space-between",
            }}
          >
            {section.content.map((input) => (
              <FormControl key={input.id}>
                {input.id === "phone" && (
                  <MuiTelInput
                    key={input.id}
                    value={input.value}
                    onChange={(newValue: string) =>
                      onUpdate({ phone: newValue })
                    }
                    error={!!input.error}
                    placeholder={input?.label}
                    color={input.error ? "error" : "primary"}
                  />
                )}
                {input.id === "birthDate" && (
                  <DatePicker
                    key={input.id}
                    value={input.value ? moment(input.value) : null}
                    onChange={(newValue: Moment | null) =>
                      onUpdate({ birthDate: newValue?.toString() })
                    }
                    disableFuture
                    onError={(err) =>
                      setBirthDateError(err ? "Please enter valid date." : null)
                    }
                    sx={{
                      '& .MuiOutlinedInput-notchedOutline, &:hover .MuiOutlinedInput-notchedOutline, & .Mui-focused .MuiOutlinedInput-notchedOutline':
                        {
                          borderColor: birthDateError ? "red" : "none",
                        },
                    }}
                  />
                )}
                {input.id !== "phone" && input.id !== "birthDate" && (
                  <Fragment key={input.id}>
                    <InputLabel htmlFor={input.id}>{input.label}</InputLabel>
                    <OutlinedInput
                      error={!!input.error}
                      id={input.id}
                      type={input.type}
                      required
                      onChange={input.onChange}
                      value={input.value}
                      color={input.error ? "error" : "primary"}
                      name={input.id}
                      label={input.label}
                      sx={{ ariaLabel: input.id }}
                    />
                  </Fragment>
                )}
                <FormHelperText error={!!input.error}>
                  {input.error}
                </FormHelperText>
              </FormControl>
            ))}
          </Box>
        ))}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button type="submit" variant="contained">
            {t("buttons.next")}
          </Button>
        </Box>
      </Box>
    </Card>
  );
};
