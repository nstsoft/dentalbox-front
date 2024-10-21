import { ClinicIconIcon } from "@assets";
import { Card } from "@elements";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid2 from "@mui/material/Grid2";
import { Patient } from "@types";
import {
  type FC,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment/min/moment-with-locales";
import { matchIsValidTel } from "mui-tel-input";
import { validateLogin } from "@utils";
import { useUpdatePatientMutation } from "@api";
import { EditForm, InfoSection } from "./components";

const sx = { width: "100%", height: "100%" };

const FIELDS_SET: Array<keyof Patient> = [
  "image",
  "name",
  "secondName",
  "surname",
  "sex",
  "dob",
  "phone",
  "email",
  "address",
];

export const PatientInfo: FC<{ patient: Patient }> = ({ patient }) => {
  const { t } = useTranslation("", { keyPrefix: "pages.patientCard" });
  const [patientData, setPatientData] = useState(patient);
  const [isEdit, setIsEdit] = useState(false);
  const [emailError, setEmailError] = useState<string>();
  const [phoneError, setPhoneError] = useState<string>();
  const [birthDateError, setBirthDateError] = useState<string>();
  const [updatePatient, { isSuccess, error }] = useUpdatePatientMutation();
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [responseError, setResponseError] = useState<string | string[]>();

  const errorSet: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: { value?: string; setter?: (...args: any) => void };
  } = {
    email: { value: emailError, setter: setEmailError },
    phone: { value: phoneError, setter: setEmailError },
    dob: {
      value: birthDateError,
      setter: (err: string | Error | null) =>
        setBirthDateError(err ? "Please enter valid date." : undefined),
    },
  };

  const fieldsMap = FIELDS_SET.map((field) => {
    return {
      id: field,
      label: t(field),
      value: patientData?.[field] as string,
      setPatientData,
      type: "text",
      error: errorSet?.[field]?.value,
      onError: errorSet?.[field]?.setter,
    };
  });

  const validateForm = () => {
    setPhoneError(undefined);
    setBirthDateError(undefined);
    setEmailError(undefined);

    if (!matchIsValidTel(patientData.phone)) {
      setPhoneError("Please enter a valid phone number.");
      return false;
    }

    if (patientData.dob && !moment(patientData.dob).isValid()) {
      setBirthDateError("Please enter valid date.");
      return false;
    }

    if (!validateLogin(patientData.email)) {
      setEmailError("Please enter a valid email address.");
      return false;
    }

    return true;
  };

  const onEditPatientInfo = (event: FormEvent) => {
    event.preventDefault();

    const isFormValid = validateForm();
    if (isFormValid) {
      updatePatient(patientData);
    }
  };

  const editToggle = useCallback(() => {
    if (isEdit) {
      setPatientData(patient);
      setIsDataChanged(false);
    }

    setIsEdit(!isEdit);
  }, [isEdit, patient]);

  useEffect(() => {
    if (error) {
      setResponseError((error as Error).message);
    }
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      editToggle();
    }
  }, [isSuccess, editToggle]);

  return (
    <Card sx={{ m: 0, position: "relative" }}>
      <Button
        sx={{ position: "absolute", top: 0, right: 0 }}
        onClick={editToggle}
      >
        {isEdit ? <CloseIcon /> : <EditIcon />}
      </Button>
      <CardContent sx={{ padding: "0 5px" }}>
        <Grid2 gap={1} container wrap="wrap" sx={{ width: "100%" }}>
          {!isEdit && (
            <Grid2 size={{ xs: 12, md: 4 }} sx={{ maxWidth: "200px" }}>
              <Box
                sx={{
                  borderRadius: "20px",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                {patientData.image ? (
                  <CardMedia
                    sx={sx}
                    component="img"
                    image={patientData.image as string}
                    alt={patientData.name}
                  />
                ) : (
                  <ClinicIconIcon sx={sx} />
                )}
              </Box>
            </Grid2>
          )}
          <Grid2 sx={{ width: isEdit ? "100%" : "unset", pt: 2 }}>
            {isEdit ? (
              <EditForm
                fields={fieldsMap}
                onSubmit={onEditPatientInfo}
                onChange={() => setIsDataChanged(true)}
                isDataChanged={isDataChanged}
              />
            ) : (
              <InfoSection fields={fieldsMap.slice(1, 4)} />
            )}
          </Grid2>
          {!isEdit && (
            <Grid2>
              <InfoSection fields={fieldsMap.slice(5)} />
            </Grid2>
          )}
        </Grid2>
      </CardContent>
    </Card>
  );
};
