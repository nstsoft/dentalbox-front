import { useAuth } from "@hooks";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {
  Payments,
  SubscriptionInfo,
  WorkspaceInfo,
  InvoiceList,
  Services,
  MetadataInfo,
} from "./components";
import { UserRole } from "@types";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useGetWorkspaceMetadataQuery } from "@api";
import { TabsMenu, ToothColorBox } from "@components";
import { isMobile } from "react-device-detect";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 0, mt: 2 }}>{children}</Box>}
    </div>
  );
}

export const WorkspacePage = () => {
  const { workspace, user } = useAuth();
  const [activeTab, setActiveTab] = useState(1);
  const { t } = useTranslation("", { keyPrefix: "pages.workspace" });
  const { data: metadata } = useGetWorkspaceMetadataQuery();

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const tabLabels = () => {
    let tabLabelsArray = [t("tabs.workspace")];

    if (user && [(UserRole.admin, UserRole.owner)].includes(user.role)) {
      tabLabelsArray = tabLabelsArray.concat([
        t("tabs.subscription"),
        t("tabs.paymentMethods"),
        t("tabs.invoices"),
        t("tabs.services"),
      ]);
    }

    return tabLabelsArray;
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ width: "100%" }} p={0}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", display: "flex" }}>
          <Tabs value={activeTab} onChange={handleTabChange}>
            {tabLabels()
              .slice(0, isMobile ? 2 : tabLabels().length)
              .map((label) => (
                <Tab key={label} label={label} />
              ))}
          </Tabs>
          {isMobile &&
            user &&
            [(UserRole.admin, UserRole.owner)].includes(user.role) && (
              <TabsMenu
                setCurrentTab={setActiveTab}
                tabs={tabLabels()
                  .map((label, index) => ({ label, index }))
                  .slice(2)}
              />
            )}
        </Box>
        <CustomTabPanel value={activeTab} index={0}>
          <Box className="metadata box">
            <WorkspaceInfo workspace={workspace} />
            <MetadataInfo metadata={metadata} />
          </Box>
          <Box className="box">
            <ToothColorBox
              dentalMapColors={metadata?.dentalMapColors}
              isEditable
            />
          </Box>
        </CustomTabPanel>

        {user && [(UserRole.admin, UserRole.owner)].includes(user.role) && (
          <>
            <CustomTabPanel value={activeTab} index={1}>
              <Box className="box">
                <SubscriptionInfo />
              </Box>
            </CustomTabPanel>
            <CustomTabPanel value={activeTab} index={2}>
              <Payments />
            </CustomTabPanel>
            <CustomTabPanel value={activeTab} index={3}>
              <InvoiceList />
            </CustomTabPanel>
            <CustomTabPanel value={activeTab} index={4}>
              <Services />
            </CustomTabPanel>
          </>
        )}
      </Box>
    </Box>
  );
};
