import { useCreatePatientMutation, useUpdatePatientMutation } from "@api";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";
import { matchIsValidTel, MuiTelInput } from "mui-tel-input";
import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
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
  setPatient,
}) => {
  const { t } = useTranslation("", { keyPrefix: "pages.patient" });
  const [patientData, setPatientData] = useState(patient);
  const [phoneError, setPhoneError] = useState<string>();
  const [emailError, setEmailError] = useState<string>();
  const [birthDateError, setBirthDateError] = useState<string>();
  const [responseError, setResponseError] = useState<string | string[]>();
  const [patientImage, setPatientImage] = useState<File>();

  const [createPatient, { isSuccess, error }] = useCreatePatientMutation();
  const [updatePatient, { isSuccess: isUpdateSuccess, error: updateError }] =
    useUpdatePatientMutation();

  useEffect(() => {
    if (patient) {
      setPatientData(patient);
    }
  }, [patient]);

  const fieldsMap = [
    {
      id: "name",
      label: t("name"),
      value: patientData.name,
      onChange: (event: ChangeEvent<HTMLInputElement>) =>
        setPatient({
          ...patientData,
          name: event.target.value,
        }),
    },
    {
      id: "secondName",
      label: t("secondName"),
      value: patientData.secondName,
      onChange: (event: ChangeEvent<HTMLInputElement>) =>
        setPatient({
          ...patientData,
          secondName: event.target.value,
        }),
    },
    {
      id: "surname",
      label: t("surname"),
      value: patientData.surname,
      onChange: (event: ChangeEvent<HTMLInputElement>) =>
        setPatient({
          ...patientData,
          surname: event.target.value,
        }),
    },
    {
      id: "sex",
      label: t("sex"),
      value: patient.sex,
    },
    {
      id: "dob",
      label: t("dob"),
      value: patientData.dob,
      onChange: ({ target }: ChangeEvent<HTMLInputElement>) => {
        setPatient({ ...patientData, dob: target.value });
      },
      error: birthDateError,
    },
    {
      id: "email",
      label: t("email"),
      value: patientData.email,
      onChange: ({ target }: ChangeEvent<HTMLInputElement>) => {
        setPatient({ ...patientData, email: target.value });
      },
      error: emailError,
    },
    {
      id: "phone",
      label: t("phone"),
      value: patientData.phone,
      error: phoneError,
    },
    {
      id: "address",
      label: t("address"),
      value: patientData.address,
      onChange: (event: ChangeEvent<HTMLInputElement>) =>
        setPatient({
          ...patientData,
          address: event.target.value,
        }),
    },
  ];

  const validateForm = () => {
    setPhoneError(undefined);
    setBirthDateError(undefined);
    setEmailError(undefined);

    if (!matchIsValidTel(patientData.phone)) {
      setPhoneError("Please enter a valid phone number.");
      return false;
    }

    if (patientData.dob && !days(patientData.dob).isValid()) {
      setBirthDateError("Please enter valid date.");
      return false;
    }

    if (!validateLogin(patientData.email)) {
      setEmailError("Please enter a valid email address.");
      return false;
    }

    return true;
  };

  const submitFormHandler = (event: FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }
    const data = { ...patientData, image: patientImage };
    if (patientData._id) {
      return updatePatient({ ...data, _id: patientData._id });
    }
    return createPatient(data);
  };

  useEffect(() => {
    if (error ?? updateError) {
      setResponseError(((error as any) ?? (updateError as any)).message);
    }
  }, [error, updateError]);

  useEffect(() => {
    if (isSuccess ?? isUpdateSuccess) {
      onClose();
    }
  }, [isSuccess, onClose, isUpdateSuccess]);

  return (
    <CustomModal width="auto" open={open} onClose={onClose}>
      <Box component="form" onSubmit={submitFormHandler}>
        <AvatarUpload image={patientData.image ?? ""} onUpload={setPatientImage} />
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
                onChange={(newValue: Dayjs | null) =>
                  setPatient({
                    ...patient,
                    dob: newValue?.toString() ?? "",
                  })
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
            {!["phone", "dob", "sex"].includes(input.id) && (
              <>
                <InputLabel htmlFor={input.id}>{input.label}</InputLabel>
                <OutlinedInput
                  id={input.id}
                  type="text"
                  required
                  onChange={input.onChange}
                  value={input.value}
                  color="primary"
                  name={input.id}
                  label={input.label}
                  sx={{ ariaLabel: input.id }}
                />
              </>
            )}
            <FormHelperText error={!!input.error}>{input.error}</FormHelperText>
          </FormControl>
        ))}

        <Box sx={{ display: "flex", gap: "10px" }}>
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
