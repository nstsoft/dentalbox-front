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
import days, { type Dayjs } from "dayjs";

export const PatientCardPage = () => {
  const { patientId } = useParams();
  const { data, isFetching } = useGetPatientByIdQuery(patientId!);
  const { t } = useTranslation("", { keyPrefix: "pages.patientCard" });
  const [patient, setPatient] = useState<
    Patient & { clearAvatarCache?: boolean }
  >();
  const [updatePatient] = useUpdatePatientMutation();
  const [cacheDate, setCacheDate] = useState<Dayjs | null>();

  const [tabIndex, setTabIndex] = useState(1);

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
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

    if (patient?.image && cacheDate && urlPattern.test(patient?.image)) {
      setCacheDate(null);
      setPatient(
        (prev) =>
          prev && {
            ...prev,
            image: `${prev.image}?${days().format("YYYYMMDDHHmm")}`,
          }
      );
    }
  }, [patient?.image, cacheDate]);

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

  if (!patient) {
    return null;
  }

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
        <PatientInfo
          setCacheDate={(date) => setCacheDate(date)}
          setPatient={setPatient}
          patient={patient!}
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
