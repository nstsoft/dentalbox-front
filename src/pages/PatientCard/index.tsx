import { useGetPatientByIdQuery, useUpdatePatientMutation } from "@api";
import { useParams } from "react-router-dom";
import { DentalMap, PatientInfo } from "./components";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { Notes } from "@components";
import { useEffect, useState } from "react";
import { Patient } from "@types";
import { Tab, Tabs } from "@mui/material";
import { CustomTabPanel } from "../../components/CustomTabPanel";

export const PatientCardPage = () => {
  const { patientId } = useParams();
  const { data } = useGetPatientByIdQuery(patientId!);
  const { t } = useTranslation("", { keyPrefix: "pages.patientCard" });
  const [patient, setPatient] = useState<Patient>();
  const [updatePatient, { isSuccess, error }] = useUpdatePatientMutation();

  const [value, setValue] = useState(0);

  useEffect(() => {
    if (data) {
      setPatient(data);
    }
  }, [data]);

  const onConfirmHandler = () => {
    updatePatient(patient!);
  };

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  if (!patient || !patientId || !data) return null;

  return (
    <Box>
      <Typography variant="h4">{t("patientCard")}</Typography>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 1,
        }}
      >
        <PatientInfo patient={patient!} />
        <Notes
          value={patient?.notes ?? ""}
          setValue={(value) => setPatient({ ...patient!, notes: value })}
          label={t("notes")}
          onConfirm={onConfirmHandler}
        />
      </Box>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="patient card tabs"
          >
            <Tab label={"Зуби"} />
            <Tab label={"Ще щось"} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <DentalMap patientId={patientId} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}></CustomTabPanel>
      </Box>
    </Box>
  );
};
