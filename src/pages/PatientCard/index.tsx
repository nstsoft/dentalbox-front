import { useGetPatientByIdQuery } from "@api";
import { useParams } from "react-router-dom";
import { DentalMap, PatientInfo } from "./components";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

export const PatientCardPage = () => {
  const { patientId } = useParams();
  const { data } = useGetPatientByIdQuery(patientId!);
  const { t } = useTranslation("", { keyPrefix: "pages.patientCard" });

  if (!patientId || !data) return null;
  return (
    <Box>
      <Typography variant="h4">{t("patientCard")}</Typography>
      <PatientInfo patient={data} />
      <DentalMap patientId={patientId} />
    </Box>
  );
};
