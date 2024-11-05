import { useGetPatientByIdQuery, useUpdatePatientMutation } from "@api";
import { useParams } from "react-router-dom";
import { DentalMap, PatientInfo, CaseHistory } from "./components";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { Notes } from "@components";
import { useEffect, useState } from "react";
import { Patient } from "@types";
import { Tab, Tabs } from "@mui/material";
import { CustomTabPanel } from "../../components";

export const PatientCardPage = () => {
  const { patientId } = useParams();
  const { data } = useGetPatientByIdQuery(patientId!);
  const { t } = useTranslation("", { keyPrefix: "pages.patientCard" });
  const [patient, setPatient] = useState<Patient>();
  const [updatePatient] = useUpdatePatientMutation();

  const [tabIndex, setTabIndex] = useState(1);

  useEffect(() => {
    if (data) {
      setPatient(data);
    }
  }, [data]);

  if (!patient || !patientId || !data) return null;
  const tabs = [
    { label: t("tabs.map"), component: <DentalMap patientId={patientId} /> },
    {
      label: t("tabs.history"),
      component: <CaseHistory patientId={patientId} />,
    },
    { label: t("tabs.plan"), component: "dddd" },
    { label: t("tabs.periodentalCard"), component: "dddd" },
    { label: t("tabs.files"), component: "dddd" },
  ];

  return (
    <Box>
      <Typography variant="h4">{t("patientCard")}</Typography>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 1,
          flexFlow: "row wrap",
        }}
      >
        <PatientInfo patient={patient!} />
        <Notes
          value={patient?.notes ?? ""}
          setValue={(value) => setPatient({ ...patient!, notes: value })}
          label={t("notes")}
          onConfirm={() => updatePatient(patient)}
        />
      </Box>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={tabIndex} onChange={(_, index) => setTabIndex(index)}>
            {tabs.map(({ label }) => (
              <Tab key={label} label={label} />
            ))}
          </Tabs>
        </Box>
        {tabs.map((tab, index) => (
          <CustomTabPanel key={tab.label} value={tabIndex} index={index}>
            {tab.component}
          </CustomTabPanel>
        ))}
      </Box>
    </Box>
  );
};
