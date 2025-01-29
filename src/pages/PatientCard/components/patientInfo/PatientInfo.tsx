import "./style.scss";
import { AnamnesisData, Patient } from "@types";
import { type FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import days from "dayjs";
import { matchIsValidTel } from "mui-tel-input";
import { validateLogin } from "@utils";
import {
  useUpdatePatientMutation,
  useGetAnamnesisQuery,
  useGetPatientByIdQuery,
  useUpdateAnamnesisMutation,
} from "@api";
import { MainInfo, SecondaryInfo, AnamnesisInfo } from "./components";
import { Loader, Notes } from "@components";
import Box from "@mui/material/Box";

type Props = {
  patientId: string;
};

export const PatientInfo: FC<Props> = ({ patientId }) => {
  const { t } = useTranslation("", { keyPrefix: "pages.patientCard" });
  const { data, isFetching } = useGetPatientByIdQuery(patientId);
  const { data: anamnesisData, isFetching: isFetchingAnamnesis } =
    useGetAnamnesisQuery(patientId!);

  const [patient, setPatient] = useState<Patient>();
  const [anamnesis, setAnamnesis] = useState<AnamnesisData>();
  const [emailError, setEmailError] = useState<string>();
  const [phoneError, setPhoneError] = useState<string>();
  const [birthDateError, setBirthDateError] = useState<string>();
  const [updatePatient, { isSuccess }] = useUpdatePatientMutation();
  const [updateAnamnesis, { isSuccess: isSuccessAnamnesis }] =
    useUpdateAnamnesisMutation();

  const [isDataChanged, setIsDataChanged] = useState({
    primary: false,
    secondary: false,
    anamnesis: false,
  });
  const [patientImage, setPatientImage] = useState<File>();

  useEffect(() => {
    if (data && !isFetching) {
      setPatient({
        ...data,
        workspace: undefined,
        image: patient?.image ?? data.image,
      });
    }
  }, [data, isFetching, patient?.image]);

  useEffect(() => {
    if (anamnesisData && !anamnesis) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { _id, patient, workspace, ...data } = anamnesisData;
      setAnamnesis(data);
    }
  }, [anamnesis, anamnesisData]);

  useEffect(() => {
    if (isSuccess) {
      setIsDataChanged((prev) => ({
        ...prev,
        primary: false,
        secondary: false,
      }));
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isSuccessAnamnesis) {
      setIsDataChanged((prev) => ({ ...prev, anamnesis: false }));
    }
  }, [isSuccessAnamnesis]);

  const validateForm = () => {
    if (!patient) return;
    setPhoneError(undefined);
    setBirthDateError(undefined);
    setEmailError(undefined);

    if (!patient.name || !patient.surname || !patient.secondName) {
      return false;
    }

    if (!matchIsValidTel(patient.phone)) {
      setPhoneError(t("enterValidPhone", { keyPrefix: "errors" }));
      return false;
    }

    if (patient.dob && !days(patient.dob).isValid()) {
      setBirthDateError(t("enterValidDate", { keyPrefix: "errors" }));
      return false;
    }

    if (!validateLogin(patient.email)) {
      setEmailError(t("enterValidEmail", { keyPrefix: "errors" }));
      return false;
    }

    return true;
  };

  const onEditPatientInfo = () => {
    if (!patient) return;
    const isFormValid = validateForm();
    if (isFormValid) {
      const data = patient;
      if (patient.dob) {
        data.dob = days(data.dob).toISOString();
      }
      if (patient.phone) {
        data.phone = data.phone.replace(/\s+/g, "");
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

  const onSubmitEditAnamnesis = () => {
    if (!anamnesis) return;
    updateAnamnesis({ patient: patientId, data: anamnesis });
  };

  if (isFetching || isFetchingAnamnesis) return <Loader />;

  if (!patient || !anamnesis) return null;

  return (
    <Box className="patient-info-section-wrapper">
      <Box className="wrapper-item main">
        <MainInfo
          onUpload={(file: File) => {
            setIsDataChanged((prev) => ({ ...prev, primary: true }));
            setPatientImage(file);
          }}
          errors={{ email: emailError, phone: phoneError }}
          patient={patient}
          setPatient={setPatient}
          setIsDataChanged={(primary) =>
            setIsDataChanged((prev) => ({ ...prev, primary }))
          }
          isDataChanged={isDataChanged.primary}
          onSubmit={onEditPatientInfo}
        />
      </Box>
      <Box className="wrapper-item secondary">
        <SecondaryInfo
          errors={{ dob: birthDateError }}
          patient={patient}
          setPatient={setPatient}
          isDataChanged={isDataChanged.secondary}
          setIsDataChanged={(secondary) =>
            setIsDataChanged((prev) => ({ ...prev, secondary }))
          }
          onSubmit={onEditPatientInfo}
          setBirthDateError={setBirthDateError}
        />
        <Notes
          value={patient?.notes ?? ""}
          setValue={(value) => setPatient({ ...patient, notes: value })}
          label={t("notes")}
          onConfirm={() =>
            updatePatient({ _id: patient._id, notes: patient.notes })
          }
        />
      </Box>
      <Box className="wrapper-item anamnesis">
        <AnamnesisInfo
          anamnesis={anamnesis}
          setAnamnesis={setAnamnesis}
          isDataChanged={isDataChanged.anamnesis}
          setIsDataChanged={(anamnesis) =>
            setIsDataChanged((prev) => ({ ...prev, anamnesis }))
          }
          onSubmit={onSubmitEditAnamnesis}
        />
      </Box>
    </Box>
  );
};
