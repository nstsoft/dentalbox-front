import { useCreatePatientMutation } from "@api";
import { VisuallyHiddenInput } from "@elements";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  InputLabel,
  Modal,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { matchIsValidTel, MuiTelInput } from "mui-tel-input";
import { ChangeEvent, FC, FormEvent, Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

type PatientModalProps = {
  open: boolean;
  onUpdate: () => void;
  onClose: () => void;
};

export const PatientModal: FC<PatientModalProps> = ({
  open,
  onUpdate,
  onClose,
}) => {
  const { t } = useTranslation("", { keyPrefix: "pages.patient" });
  const [patientForm, setCabinetForm] = useState<{
    name: string;
    secondName: string;
    surName: string;
    dob: string;
    email: string;
    phone: string;
    address: string;
  }>({
    name: "",
    secondName: "",
    surName: "",
    dob: "",
    email: "",
    phone: "+380",
    address: "",
  });
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [responseError, setResponseError] = useState<string | string[] | null>(
    null
  );
  const [patientImage, setPatientImage] = useState<File>();

  const [createPatient, { data, error }] = useCreatePatientMutation();

  const fieldsMap = [
    {
      id: "name",
      label: t("name"),
      value: patientForm.name,
      onChange: (event: ChangeEvent<HTMLInputElement>) =>
        setCabinetForm((prevState) => ({
          ...prevState,
          name: event.target.value,
        })),
    },
    {
      id: "secondName",
      label: t("secondName"),
      value: patientForm.secondName,
      onChange: (event: ChangeEvent<HTMLInputElement>) =>
        setCabinetForm((prevState) => ({
          ...prevState,
          secondName: event.target.value,
        })),
    },
    {
      id: "surName",
      label: t("surname"),
      value: patientForm.surName,
      onChange: (event: ChangeEvent<HTMLInputElement>) =>
        setCabinetForm((prevState) => ({
          ...prevState,
          surName: event.target.value,
        })),
    },
    {
      id: "dob",
      label: t("dob"),
      value: patientForm.dob,
      onChange: ({ target }: ChangeEvent<HTMLInputElement>) => {
        setCabinetForm((prev) => ({ ...prev, dob: target.value }));
      },
    },
    {
      id: "email",
      label: t("email"),
      value: patientForm.email,
      onChange: ({ target }: ChangeEvent<HTMLInputElement>) => {
        setCabinetForm((prev) => ({ ...prev, email: target.value }));
      },
    },
    {
      id: "phone",
      label: t("phone"),
      value: patientForm.phone,
    },
    {
      id: "address",
      label: t("address"),
      value: patientForm.address,
      onChange: (event: ChangeEvent<HTMLInputElement>) =>
        setCabinetForm((prevState) => ({
          ...prevState,
          address: event.target.value,
        })),
    },
  ];

  const submitFormHandler = (event: FormEvent) => {
    event.preventDefault();

    if (matchIsValidTel(patientForm.phone)) {
      setPhoneError(null);
    } else {
      setPhoneError("Please enter a valid phone number.");
      return;
    }

    createPatient({ ...patientForm, image: patientImage });
  };

  useEffect(() => {
    if (error) {
      setResponseError((error as any).message);
    }
    if (data) {
      onUpdate();
      onClose();
    }
  }, [data, error]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
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
            {input.id === "phone" ? (
              <Fragment key={input.id}>
                <MuiTelInput
                  value={input.value}
                  onChange={(newValue: string) =>
                    setCabinetForm((prevState) => ({
                      ...prevState,
                      phone: newValue,
                    }))
                  }
                  error={!!phoneError}
                  placeholder={input?.label}
                  color={phoneError ? "error" : "primary"}
                />
                <FormHelperText error={!!phoneError}>
                  {phoneError}
                </FormHelperText>
              </Fragment>
            ) : (
              <Fragment key={input.id}>
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
              </Fragment>
            )}
          </FormControl>
        ))}
        <FormControl sx={{ mb: 2, width: "100%" }}>
          <FormLabel htmlFor="patientImage">
            {t("image")}
          </FormLabel>
          <Button
            fullWidth
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            {t("buttons.upload")}
            <VisuallyHiddenInput
              id="patientImage"
              name="patientImage"
              type="file"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                e.target.files?.[0] && setPatientImage(e.target.files?.[0]);
              }}
            />
          </Button>
        </FormControl>

        <Box sx={{ display: "flex", gap: "10px" }}>
          <Button variant="contained" type="submit">
            {t("create", { keyPrefix: "buttons" })}
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
