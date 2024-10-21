import { useGetPatientByIdQuery } from "@api";
import { useParams } from "react-router-dom";
import { DentalMap, PatientInfo } from "./components";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { PatientNotes } from "./components/patientNotes";

export const PatientCardPage = () => {
  const { patientId } = useParams();
  const { data } = useGetPatientByIdQuery(patientId!);
  const { t } = useTranslation("", { keyPrefix: "pages.patientCard" });

  if (!patientId || !data) return null;
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
        <PatientInfo patient={data} />
        <PatientNotes patient={data} />
      </Box>
      <DentalMap patientId={patientId} />
    </Box>
  );
};
