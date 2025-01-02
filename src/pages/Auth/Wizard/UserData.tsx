import { ChangeEvent, FormEvent, Fragment, useEffect, useState } from "react";
import { Sex, UserForm } from "@types";
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
import days, { type Dayjs } from "dayjs";
import { Invitation } from "../AcceptInvitation";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

type IUserDataStepProps = {
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
  nextStep?: () => void;
  previousStep?: () => void;
  userData?: UserForm;
};

export const UserData = (props: IUserDataStepProps) => {
  const {
    previousStep,
    prefilled,
    type,
    workspaceName,
    workspaceImage,
    errors,
    confirm,
    nextStep,
    userData,
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
    sex: "male" as Sex,
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
          type: "phone",
        },
      ],
    },
    {
      name: "dob-sex",
      direction: "row",
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
          type: "date",
        },
        {
          id: "sex",
          label: t("signUpWizard.userData.sex"),
          value: user.sex,
          type: "select",
        },
      ],
    },
    {
      name: "dob-address-email-password",
      direction: "column",
      content: [
        {
          id: "address",
          label: t("signUpWizard.userData.address"),
          value: user.address,
          disabled: prefilled?.address,
          onChange: ({ target }: ChangeEvent<HTMLInputElement>) => {
            setUser((prev) => ({ ...prev, address: target.value }));
          },
          type: "text",
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

  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData]);

  const validateForm = () => {
    setPhoneError(undefined);
    setBirthDateError(undefined);
    setEmailError(undefined);
    setPasswordError(undefined);
    setConfirmPasswordError(undefined);

    if (!matchIsValidTel(user.phone)) {
      setPhoneError(t("enterValidPhone", { keyPrefix: "errors" }));
      return false;
    }

    if (user.dob && !days(user.dob).isValid()) {
      setBirthDateError(t("enterValidDate", { keyPrefix: "errors" }));
      return false;
    }

    if (!validateLogin(user.email)) {
      setEmailError(t("enterValidEmail", { keyPrefix: "errors" }));
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
                {input.id === "sex" && (
                  <>
                    <InputLabel id="radio-label">{input.label}</InputLabel>
                    <Select
                      labelId="radio-label"
                      value={user.sex}
                      onChange={({ target }) =>
                        setUser({
                          ...user,
                          sex: target.value as Sex,
                        })
                      }
                      required
                      input={<OutlinedInput label={input.label} />}
                    >
                      {Object.keys(Sex).map((item) => (
                        <MenuItem key={item} value={item}>
                          <ListItemText
                            primary={t(
                              `signUpWizard.userData.sexItems.${item}`
                            )}
                            sx={{ m: 0 }}
                          />
                        </MenuItem>
                      ))}
                    </Select>
                  </>
                )}
                {input.id === "birthDate" && (
                  <DatePicker
                    key={input.id}
                    value={input.value ? days(input.value) : null}
                    onChange={(newValue: Dayjs | null) =>
                      setUser((prev) => ({
                        ...prev,
                        dob: newValue?.toString() ?? "",
                      }))
                    }
                    disableFuture
                    onError={(err) =>
                      setBirthDateError(
                        err
                          ? t("enterValidDate", { keyPrefix: "errors" })
                          : undefined
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
                {!["phone", "birthDate", "sex"].includes(input.id) && (
                  <Fragment key={input.id}>
                    <InputLabel htmlFor={input.id}>{input.label}</InputLabel>
                    <OutlinedInput
                      error={!!input.error}
                      id={input.id}
                      type={input.type ?? "text"}
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
