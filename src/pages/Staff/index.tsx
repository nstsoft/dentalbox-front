import { UsersTable, Filter, InvitationsTable } from "./components";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CircularProgress from "@mui/material/CircularProgress";

import { useGetUserListQuery, useGetInvitationsQuery } from "@api";
import { useTranslation } from "react-i18next";
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
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
}

export const StaffPage = () => {
  const { t } = useTranslation("", { keyPrefix: "pages.staff" });

  const [rolesValues, setRolesValues] = useState<string[]>([]);
  const [verifiedValue, setVerifiedValue] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");

  const [roles, setRole] = useState<string[]>([]);
  const [verified, setIsVerified] = useState<string>();
  const [search, setSearch] = useState<string>();

  const [paginationModel, setPaginationModel] = useState({
    skip: 0,
    limit: 20,
  });
  const [invitationPaginationModel, setInvitationPaginationModel] = useState({
    skip: 0,
    limit: 20,
  });

  const { isLoading, data } = useGetUserListQuery({
    skip: paginationModel.skip,
    limit: paginationModel.limit,
    filter: { roles, verified, search },
  });
  const { isLoading: isLoadingInvitations, data: invitationData } =
    useGetInvitationsQuery({
      skip: invitationPaginationModel.skip,
      limit: invitationPaginationModel.limit,
    });

  const applyFilters = () => {
    setRole(rolesValues);
    if ([0, 2].includes(verifiedValue.length)) {
      setIsVerified(undefined);
    } else {
      setIsVerified(verifiedValue[0] === "verified" ? "true" : "false");
    }
    setSearch(searchValue);
  };

  const [value, setValue] = useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  if (!data || !invitationData) return null;

  return (
    <>
      <Typography variant="h4">{t("staff")}</Typography>

      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label={t("staff")} />
            <Tab label={t("invitations")} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Filter
            search={searchValue}
            setSearch={setSearchValue}
            roles={rolesValues}
            verified={verifiedValue}
            setRole={setRolesValues}
            setIsVerified={setVerifiedValue}
            applyFilters={applyFilters}
          />
          {isLoading ? (
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          ) : (
            <UsersTable
              data={data}
              isLoading={isLoading}
              paginationModel={paginationModel}
              setPaginationModel={setPaginationModel}
            />
          )}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <InvitationsTable
            isLoading={isLoadingInvitations}
            data={invitationData}
            paginationModel={invitationPaginationModel}
            setPaginationModel={setInvitationPaginationModel}
          />
        </CustomTabPanel>
      </Box>
    </>
  );
};
