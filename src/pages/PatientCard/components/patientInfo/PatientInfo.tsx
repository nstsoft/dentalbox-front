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
  type Dispatch,
  type SetStateAction,
  type FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import days from "dayjs";
import { matchIsValidTel } from "mui-tel-input";
import { validateLogin } from "@utils";
import { useUpdatePatientMutation } from "@api";
import { EditForm, InfoSection } from "./components";
import { type Dayjs } from "dayjs";

const sx = { width: "100%", height: "100%" };

const FIELDS_SET: Array<keyof Patient> = [
  "image",
  "surname",
  "name",
  "secondName",
  "sex",
  "dob",
  "phone",
  "email",
  "address",
];

type Props = {
  patient: Patient & { clearAvatarCache?: boolean };
  setPatient: Dispatch<
    SetStateAction<Patient & { clearAvatarCache?: boolean }>
  >;
  setCacheDate: (date: Dayjs) => void;
};

export const PatientInfo: FC<Props> = ({
  patient,
  setPatient,
  setCacheDate,
}) => {
  const { t } = useTranslation("", { keyPrefix: "pages.patientCard" });
  const [isEdit, setIsEdit] = useState(false);
  const [emailError, setEmailError] = useState<string>();
  const [imageError, setImageError] = useState<string>();
  const [phoneError, setPhoneError] = useState<string>();
  const [birthDateError, setBirthDateError] = useState<string>();
  const [updatePatient, { isSuccess }] = useUpdatePatientMutation();
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [patientImage, setPatientImage] = useState<File>();

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
    image: { value: imageError, setter: setImageError },
  };

  const fieldsMap = FIELDS_SET.map((field) => {
    return {
      id: field,
      label: t(field),
      value: patient?.[field] as string,
      setPatientData: setPatient,
      type: "text",
      error: errorSet?.[field]?.value,
      onError: errorSet?.[field]?.setter,
      onUpload: setPatientImage,
    };
  });

  const validateForm = () => {
    setPhoneError(undefined);
    setBirthDateError(undefined);
    setEmailError(undefined);

    if (!matchIsValidTel(patient.phone)) {
      setPhoneError("Please enter a valid phone number.");
      return false;
    }

    if (patient.dob && !days(patient.dob).isValid()) {
      setBirthDateError("Please enter valid date.");
      return false;
    }

    if (!validateLogin(patient.email)) {
      setEmailError("Please enter a valid email address.");
      return false;
    }

    return true;
  };

  const onEditPatientInfo = (event: FormEvent) => {
    event.preventDefault();

    const isFormValid = validateForm();
    if (isFormValid) {
      const data = patient;
      if (patient.dob) {
        data.dob = days(data.dob).toISOString();
      }

      updatePatient({
        name: patient.name,
        surname: patient.surname,
        secondName: patient.secondName,
        sex: patient.sex,
        dob: patient.dob,
        phone: patient.phone,
        email: patient.email,
        address: patient.address,
        _id: patient._id,
        image: patientImage,
      });
    }
  };

  const toggleEdit = useCallback(() => {
    if (isEdit) {
      setIsDataChanged(false);
    }

    setIsEdit((prev) => !prev);
  }, [isEdit]);

  useEffect(() => {
    if (isSuccess) {
      setIsDataChanged(false);
      setIsEdit(false);
    }
  }, [isSuccess]);

  return (
    <Card sx={{ m: 0, position: "relative" }}>
      <Button
        sx={{ position: "absolute", top: 0, right: 0 }}
        onClick={toggleEdit}
      >
        {isEdit ? <CloseIcon /> : <EditIcon />}
      </Button>
      <CardContent sx={{ padding: "0 5px" }}>
        <Grid2 gap={2} container wrap="wrap" sx={{ width: "100%" }}>
          {!isEdit && (
            <Grid2 size={{ xs: 12, md: 4 }} sx={{ maxWidth: "100px" }}>
              <Box
                sx={{
                  borderRadius: "50%",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                {patient?.image ? (
                  <CardMedia
                    sx={sx}
                    component="img"
                    image={patient?.image}
                    alt={patient.name}
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
                onUpload={setPatientImage}
                setCacheDate={setCacheDate}
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
