import { useCreatePatientMutation, useUpdatePatientMutation } from "@api";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";
import { matchIsValidTel, MuiTelInput } from "mui-tel-input";
import { ChangeEvent, type FC, FormEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { DatePicker } from "@mui/x-date-pickers";
import days, { type Dayjs } from "dayjs";
import { validateLogin } from "@utils";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { CustomModal } from "@elements";

import { Patient, Sex } from "@types";
import { AvatarUpload } from "@components";

type PatientModalProps = {
  open: boolean;
  onClose: () => void;
  patient: Omit<Patient, "_id"> & { _id?: string };
  setPatient: (patient: Omit<Patient, "_id"> & { _id?: string }) => void;
};

export const PatientModal: FC<PatientModalProps> = ({
  open,
  onClose,
  patient,
  setPatient
}) => {
  const { t } = useTranslation("", { keyPrefix: "pages.patient" });
  const [phoneError, setPhoneError] = useState<string>();
  const [emailError, setEmailError] = useState<string>();
  const [birthDateError, setBirthDateError] = useState<string>();
  const [responseError, setResponseError] = useState<string | string[]>();
  const [patientImage, setPatientImage] = useState<File>();

  const [createPatient, { isSuccess, error }] = useCreatePatientMutation();
  const [updatePatient, { isSuccess: isUpdateSuccess, error: updateError }] =
    useUpdatePatientMutation();

  const clearFields = () => {
    setPatientImage(undefined);
    setPhoneError(undefined);
    setBirthDateError(undefined);
    setEmailError(undefined);
    setResponseError(undefined);
  };

  const fieldsMap = [
    {
      id: "name",
      label: t("name"),
      value: patient.name,
      onChange: (event: ChangeEvent<HTMLInputElement>) =>
        setPatient({
          ...patient,
          name: event.target.value,
        }),
      required: true,
    },
    {
      id: "secondName",
      label: t("secondName"),
      value: patient.secondName,
      onChange: (event: ChangeEvent<HTMLInputElement>) =>
        setPatient({
          ...patient,
          secondName: event.target.value,
        }),
      required: true,
    },
    {
      id: "surname",
      label: t("surname"),
      value: patient.surname,
      onChange: (event: ChangeEvent<HTMLInputElement>) =>
        setPatient({
          ...patient,
          surname: event.target.value,
        }),
      required: true,
    },
    {
      id: "sex",
      label: t("sex"),
      value: patient.sex,
    },
    {
      id: "dob",
      label: t("dob"),
      value: patient.dob,
      error: birthDateError,
    },
    {
      id: "email",
      label: t("email"),
      value: patient.email,
      onChange: ({ target }: ChangeEvent<HTMLInputElement>) => {
        setPatient({ ...patient, email: target.value });
      },
      error: emailError,
    },
    {
      id: "phone",
      label: t("phone"),
      value: patient.phone,
      error: phoneError,
    },
    {
      id: "address",
      label: t("address"),
      value: patient.address,
      onChange: (event: ChangeEvent<HTMLInputElement>) =>
        setPatient({ ...patient, address: event.target.value }),
    },
  ];

  const validateForm = () => {
    setPhoneError(undefined);
    setBirthDateError(undefined);
    setEmailError(undefined);

    if (
      !patient.dob ||
      (patient.dob && !days(patient.dob).isValid())
    ) {
      setBirthDateError("Please enter valid date.");
      return false;
    }

    if (!validateLogin(patient.email)) {
      setEmailError("Please enter a valid email address.");
      return false;
    }

    if (!matchIsValidTel(patient.phone)) {
      setPhoneError("Please enter a valid phone number.");
      return false;
    }

    return true;
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!validateForm()) return;

    const formData = {
      name: patient.name,
      secondName: patient.secondName,
      surname: patient.surname,
      sex: patient.sex,
      dob: days(patient.dob).toISOString(),
      email: patient.email,
      phone: patient.phone,
      address: patient.address,
      image: patientImage,
    };

    if (patient._id) {
      return updatePatient({ ...formData, _id: patient._id });
    }
    createPatient(formData);
  };

  useEffect(() => {
    if (error ?? updateError) {
      setResponseError(((error as any) ?? (updateError as any)).data.message);
    }
  }, [error, updateError]);

  useEffect(() => {
    if (isSuccess || isUpdateSuccess) {
      onClose();
      clearFields();
    }
  }, [isSuccess, onClose, isUpdateSuccess]);


  return (
    <CustomModal
      width="auto"
      open={open}
      onClose={() => {
        console.log("close modal");
        onClose();
        clearFields();
      }}
    >
      <Box component="form" onSubmit={handleSubmit}>
        <AvatarUpload
          image={patient.image ?? ""}
          onUpload={setPatientImage}
        />
        {fieldsMap.map((input) => (
          <FormControl key={input.id} fullWidth sx={{ mb: 2 }}>
            {input.id === "phone" && (
              <MuiTelInput
                value={input.value}
                onChange={(newValue: string) =>
                  setPatient({
                    ...patient,
                    phone: newValue.replace(/\s+/g, ""),
                  })
                }
                error={!!phoneError}
                placeholder={input?.label}
                color={phoneError ? "error" : "primary"}
              />
            )}
            {input.id === "sex" && (
              <>
                <InputLabel id="radio-label">{t("sex")}</InputLabel>
                <Select
                  labelId="radio-label"
                  value={patient.sex}
                  onChange={({ target }) =>
                    setPatient({
                      ...patient,
                      sex: target.value as Sex,
                    })
                  }
                  required
                  input={<OutlinedInput label={t(`sex`)} />}
                >
                  {Object.keys(Sex).map((item) => (
                    <MenuItem key={item} value={item}>
                      <ListItemText
                        primary={t(`sexItems.${item}`)}
                        sx={{ m: 0 }}
                      />
                    </MenuItem>
                  ))}
                </Select>
              </>
            )}
            {input.id === "dob" && (
              <DatePicker
                value={input.value ? days(input.value) : null}
                onChange={(newValue: Dayjs | null) => {
                  if (newValue?.isValid()) {
                    setPatient({
                      ...patient,
                      dob: newValue?.toISOString() ?? "",
                    });
                  }
                }}
                disableFuture
                onError={(err) =>
                  setBirthDateError(
                    err ? "Please enter valid date." : undefined
                  )
                }
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: birthDateError
                      ? "error.main"
                      : "rgba(0, 0, 0, 0.23)",
                  },
                }}
              />
            )}
            {!["phone", "dob", "sex"].includes(input.id) && (
              <>
                <InputLabel htmlFor={input.id}>{input.label}</InputLabel>
                <OutlinedInput
                  id={input.id}
                  type="text"
                  required={input.required}
                  onChange={input.onChange}
                  value={input.value}
                  color={input.error ? "error" : "primary"}
                  name={input.id}
                  label={input.label}
                  sx={{
                    ariaLabel: input.id,
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: input.error
                        ? "error.main"
                        : "rgba(0, 0, 0, 0.23)",
                    },
                  }}
                />
              </>
            )}
            <FormHelperText error={!!input.error}>{input.error}</FormHelperText>
          </FormControl>
        ))}

        <Box sx={{ display: "flex", gap: "10px", flexDirection: "column" }}>
          <Button variant="contained" type="submit">
            {patient._id
              ? t("update", { keyPrefix: "buttons" })
              : t("create", { keyPrefix: "buttons" })}
          </Button>
          {Array.isArray(responseError) ? (
            responseError.map((error) => (
              <Typography variant="body2" color="error">
                {error}
              </Typography>
            ))
          ) : (
            <Typography variant="body2" color="error">
              {responseError}
            </Typography>
          )}
        </Box>
      </Box>
    </CustomModal>
  );
};
