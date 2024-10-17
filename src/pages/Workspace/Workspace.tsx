import { useAuth } from "@hooks";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Payments, SubscriptionInfo, WorkspaceInfo } from "./components";
import { UserRole } from "@types";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const panelStyles = {
  display: "flex",
  justifyContent: "flex-start",
  width: "100%",
  gap: "24px",
  marginBottom: "20px",
  flexWrap: "wrap",
};

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
  const [activeTab, setActiveTab] = useState(0);
  const { t } = useTranslation("", { keyPrefix: "pages.workspace" });

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
      ]);
    }

    return tabLabelsArray;
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ width: "100%" }} p={0}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label="basic tabs example"
          >
            {tabLabels().map((label) => (
              <Tab key={label} label={label} />
            ))}
          </Tabs>
        </Box>
        <CustomTabPanel value={activeTab} index={0}>
          <Box sx={panelStyles}>
            <WorkspaceInfo workspace={workspace} />
          </Box>
        </CustomTabPanel>

        {user && [(UserRole.admin, UserRole.owner)].includes(user.role) && (
          <>
            <CustomTabPanel value={activeTab} index={1}>
              <Box sx={panelStyles}>
                <SubscriptionInfo />
              </Box>
            </CustomTabPanel>
            <CustomTabPanel value={activeTab} index={2}>
              <Payments />
            </CustomTabPanel>
            <CustomTabPanel value={activeTab} index={3}>
              <div>Invoices</div>
            </CustomTabPanel>
          </>
        )}
      </Box>
      {/* <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          width: "100%",
          gap: "24px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <WorkspaceInfo workspace={workspace} />
        <SubscriptionInfo />
      </Box>
      {user && [(UserRole.admin, UserRole.owner)].includes(user.role) && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignContent: "flex-start",
            alignItems: "flex-start",
            width: "100%",
            gap: "24px",
            marginBottom: "20px",
            flexWrap: "wrap",
            flexDirection: "row",
          }}
        >
          <Payments />
        </Box>
      )} */}
    </Box>
  );
};
