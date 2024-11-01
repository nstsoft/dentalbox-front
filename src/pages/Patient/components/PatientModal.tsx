import { useCreatePatientMutation, useUpdatePatientMutation } from "@api";
import { VisuallyHiddenInput } from "@elements";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import Modal from "@mui/material/Modal";
import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";
import { matchIsValidTel, MuiTelInput } from "mui-tel-input";
import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { DatePicker } from "@mui/x-date-pickers";
import moment, { Moment } from "moment/min/moment-with-locales";
import { validateLogin } from "@utils";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { Patient, Sex } from "@types";

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
  const [phoneError, setPhoneError] = useState<string>();
  const [emailError, setEmailError] = useState<string>();
  const [birthDateError, setBirthDateError] = useState<string>();
  const [responseError, setResponseError] = useState<string | string[]>();
  const [patientImage, setPatientImage] = useState<File>();

  const [createPatient, { isSuccess, error }] = useCreatePatientMutation();
  const [updatePatient, { isSuccess: isUpdateSuccess, error: updateError }] =
    useUpdatePatientMutation();

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
      onChange: ({ target }: ChangeEvent<HTMLInputElement>) => {
        setPatient({ ...patient, dob: target.value });
      },
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
        setPatient({
          ...patient,
          address: event.target.value,
        }),
    },
  ];

  const validateForm = () => {
    setPhoneError(undefined);
    setBirthDateError(undefined);
    setEmailError(undefined);

    if (!matchIsValidTel(patient.phone)) {
      setPhoneError("Please enter a valid phone number.");
      return false;
    }

    if (patient.dob && !moment(patient.dob).isValid()) {
      setBirthDateError("Please enter valid date.");
      return false;
    }

    if (!validateLogin(patient.email)) {
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
    const data = { ...patient, image: patientImage };
    if (patient._id) {
      return updatePatient({ ...data, _id: patient._id });
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
    <Modal open={open} onClose={onClose}>
      <Box
        component="form"
        onSubmit={submitFormHandler}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          maxHeight: "90vh",
          bgcolor: "background.paper",
          overflow: "auto",
          boxShadow: 24,
          borderRadius: "8px",
          p: 4,
        }}
      >
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
                value={input.value ? moment(input.value) : null}
                onChange={(newValue: Moment | null) =>
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
            {input.id !== "phone" &&
              input.id !== "dob" &&
              input.id !== "sex" && (
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
        <FormControl sx={{ mb: 2, width: "100%" }}>
          <FormLabel htmlFor="patientImage">{t("image")}</FormLabel>
          <Button
            fullWidth
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            {t("upload", { keyPrefix: "buttons" })}
            <VisuallyHiddenInput
              id="patientImage"
              name="patientImage"
              type="file"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                e.target.files?.[0] && setPatientImage(e.target.files?.[0]);
              }}
            />
          </Button>
          {patientImage && <FormHelperText>{t("imageSuccess")}</FormHelperText>}
        </FormControl>

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
    </Modal>
  );
};
