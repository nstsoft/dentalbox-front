import { useParams } from "react-router-dom";
import {
  DentalMap,
  PatientInfo,
  CaseHistory,
  TreatmentPlan,
  PatientFiles,
  PeriodontalCard,
} from "./components";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { CustomTabPanel, TabsMenu } from "../../components";
import { isMobile } from "react-device-detect";

export const PatientCardPage = () => {
  const { patientId } = useParams();

  const { t } = useTranslation("", { keyPrefix: "pages.patientCard" });

  const [tabIndex, setTabIndex] = useState(2);

  if (!patientId) return null;

  const tabs = [
    { label: t("tabs.map"), component: <DentalMap patientId={patientId} /> },
    {
      label: t("tabs.history"),
      component: <CaseHistory patientId={patientId} />,
    },
    {
      label: t("tabs.plan"),
      component: <TreatmentPlan patientId={patientId} />,
    },
    { label: t("tabs.periodontalCard"), component: <PeriodontalCard /> },
    {
      label: t("tabs.files"),
      component: <PatientFiles patientId={patientId} />,
    },
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 1 }}>
        {t("patientCard")}
      </Typography>
      <Box sx={{ display: "flex", gap: 2, mb: 1, flexFlow: "row wrap" }}>
        <PatientInfo patientId={patientId} />
      </Box>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", display: "flex" }}>
          <Tabs value={tabIndex} onChange={(_, index) => setTabIndex(index)}>
            {tabs.slice(0, isMobile ? 2 : tabs.length).map(({ label }) => (
              <Tab key={label} label={label} />
            ))}
          </Tabs>
          {isMobile && (
            <TabsMenu
              setCurrentTab={setTabIndex}
              tabs={tabs
                .map((tab, index) => ({ label: tab.label, index }))
                .slice(2)}
            />
          )}
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
