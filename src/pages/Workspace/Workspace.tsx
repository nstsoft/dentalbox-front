import { useAuth } from "@hooks";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Payments, SubscriptionInfo, WorkspaceInfo } from "./components";
import { UserRole } from "@types";
import { useState } from "react";

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
  const [value, setValue] = useState(2);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ width: "100%" }} p={0}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleTabChange}
            aria-label="basic tabs example"
          >
            <Tab label="Item One" />
            <Tab label="Item Two" />
            <Tab label="Item Three" />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Box
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
          </Box>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              width: "100%",
              gap: "24px",
              marginBottom: "20px",
              flexWrap: "wrap",
            }}
          >
            <SubscriptionInfo />
          </Box>
        </CustomTabPanel>
        {user && [(UserRole.admin, UserRole.owner)].includes(user.role) && (
          <CustomTabPanel value={value} index={2}>
            <Payments />
          </CustomTabPanel>
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
