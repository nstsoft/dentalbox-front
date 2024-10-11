import { ChangeEvent, FormEvent, Fragment, useState } from "react";
import { StepWizardChildProps } from "react-step-wizard";
import type { UserForm } from "@types";
import { useTranslation } from "react-i18next";
import { Card } from "@elements";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";

import { validateLogin } from "@utils";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import { DatePicker } from "@mui/x-date-pickers";
import moment, { Moment } from "moment/min/moment-with-locales";
import { Invitation } from "../AcceptInvitation";

interface IUserDataStepProps {
  type: "signUp" | "invite";
  confirm: (form: UserForm) => void;
  workspaceName?: string;
  workspaceImage?: string;
  errors?: {
    phone?: string;
    email?: string;
    dob?: string;
    address?: string;
    password?: string;
  };
  prefilled?: Partial<UserForm>;
}

export const UserData = (
  props: IUserDataStepProps & Partial<StepWizardChildProps>
) => {
  const {
    previousStep,
    prefilled,
    type,
    workspaceName,
    workspaceImage,
    errors,
    confirm,
    nextStep,
  } = props;
  const { t } = useTranslation();
  const [emailError, setEmailError] = useState<string>();
  const [phoneError, setPhoneError] = useState<string>();
  const [passwordError, setPasswordError] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>();
  const [birthDateError, setBirthDateError] = useState<string>();
  const [user, setUser] = useState<UserForm>({
    name: "",
    password: "",
    surname: "",
    secondName: "",
    phone: "+380",
    dob: "",
    address: "",
    email: prefilled?.email || "",
  });

  const signUpInputs = [
    {
      name: "name-surname",
      direction: "row",
      content: [
        {
          id: "name",
          label: t("signUpWizard.userData.name"),
          type: "text",
          value: user.name,
          disabled: prefilled?.name,
          onChange: ({ target }: ChangeEvent<HTMLInputElement>) => {
            setUser((prev) => ({ ...prev, name: target.value }));
          },
        },
        {
          id: "surname",
          label: t("signUpWizard.userData.surname"),
          type: "text",
          value: user.surname,
          disabled: prefilled?.surname,
          onChange: ({ target }: ChangeEvent<HTMLInputElement>) => {
            setUser((prev) => ({ ...prev, surname: target.value }));
          },
        },
      ],
    },
    {
      name: "second-name-phone",
      direction: "row",
      content: [
        {
          id: "secondName",
          label: t("signUpWizard.userData.secondName"),
          type: "text",
          value: user.secondName,
          disabled: prefilled?.secondName,
          onChange: ({ target }: ChangeEvent<HTMLInputElement>) => {
            setUser((prev) => ({ ...prev, secondName: target.value }));
          },
        },
        {
          id: "phone",
          label: t("signUpWizard.userData.phone"),
          value: user.phone.replace(/\s+/g, ""),
          error: phoneError || errors?.phone,
          disabled: prefilled?.phone,
        },
      ],
    },
    {
      name: "dob-address-email-password",
      direction: "column",
      content: [
        {
          id: "birthDate",
          label: t("signUpWizard.userData.birthDate"),
          value: user.dob,
          onChange: ({ target }: ChangeEvent<HTMLInputElement>) => {
            setUser((prev) => ({ ...prev, dob: target.value }));
          },
          error: birthDateError || errors?.dob,
          disabled: prefilled?.dob,
        },
        {
          id: "address",
          label: t("signUpWizard.userData.address"),
          value: user.address,
          disabled: prefilled?.address,
          onChange: ({ target }: ChangeEvent<HTMLInputElement>) => {
            setUser((prev) => ({ ...prev, address: target.value }));
          },
        },
        {
          id: "email",
          label: t("signUpWizard.userData.email"),
          type: "email",
          value: user.email,
          onChange: ({ target }: ChangeEvent<HTMLInputElement>) => {
            setUser((prev) => ({ ...prev, email: target.value }));
          },
          error: emailError || errors?.email,
          disabled: prefilled?.email,
        },
        {
          id: "password",
          label: t("signUpWizard.userData.password"),
          type: "password",
          value: user.password,
          onChange: ({ target }: ChangeEvent<HTMLInputElement>) => {
            setUser((prev) => ({
              ...prev,
              password: target.value.replace(/\s/g, ""),
            }));
          },
          error: passwordError || errors?.password,
          disabled: prefilled?.password,
        },
        {
          id: "confirmPassword",
          label: t("signUpWizard.userData.confirmPassword"),
          type: "password",
          value: confirmPassword,
          onChange: ({ target }: ChangeEvent<HTMLInputElement>) => {
            setConfirmPassword(target.value);
          },
          error: confirmPasswordError,
        },
      ],
    },
  ];

  const validateForm = () => {
    setPhoneError(undefined);
    setBirthDateError(undefined);
    setEmailError(undefined);
    setPasswordError(undefined);
    setConfirmPasswordError(undefined);

    if (!matchIsValidTel(user.phone)) {
      setPhoneError("Please enter a valid phone number.");
      return false;
    }

    if (user.dob && !moment(user.dob).isValid()) {
      setBirthDateError("Please enter valid date.");
      return false;
    }

    if (!validateLogin(user.email)) {
      setEmailError("Please enter a valid email address.");
      return false;
    }

    if (user.password.length <= 6) {
      setPasswordError("Password must be at least 6 characters long.");
      return false;
    }

    if (confirmPassword !== user.password) {
      setConfirmPasswordError("Password must be the same.");
      return false;
    }
    return true;
  };

  const onConfirm = (event: FormEvent) => {
    event.preventDefault();

    const isFormValid = validateForm();
    if (isFormValid) {
      confirm(user);
      nextStep?.();
    }
  };

  return (
    <Card variant="outlined">
      <Typography
        component="h1"
        variant="h4"
        sx={{ w: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
      >
        {type === "signUp" ? (
          t("signUpWizard.userData.title")
        ) : (
          <Invitation
            workspaceImage={workspaceImage!}
            workspaceName={workspaceName!}
          />
        )}
      </Typography>
      <Box
        component="form"
        onSubmit={onConfirm}
        sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 2 }}
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
              <FormControl key={input.id} fullWidth>
                {input.id === "phone" && (
                  <MuiTelInput
                    key={input.id}
                    value={input.value}
                    onChange={(newValue: string) => {
                      setUser((prev) => ({
                        ...prev,
                        phone: newValue.replace(/\s+/g, ""),
                      }));
                    }}
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
                      setUser((prev) => ({
                        ...prev,
                        dob: newValue?.toString() ?? "",
                      }))
                    }
                    disableFuture
                    onError={(err) =>
                      setBirthDateError(
                        err ? "Please enter valid date." : undefined
                      )
                    }
                    sx={{
                      "& .MuiOutlinedInput-notchedOutline, &:hover .MuiOutlinedInput-notchedOutline, & .Mui-focused .MuiOutlinedInput-notchedOutline":
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
                      disabled={!!input?.disabled}
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
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          {type === "signUp" && (
            <Button type="button" variant="outlined" onClick={previousStep}>
              {t("buttons.back")}
            </Button>
          )}
          <Button variant="contained" type="submit">
            {type === "signUp" ? t("buttons.next") : t("buttons.accept")}
          </Button>
        </Box>
      </Box>
    </Card>
  );
};
