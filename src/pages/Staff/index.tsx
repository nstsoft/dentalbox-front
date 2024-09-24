import { UsersTable, Filter } from "./components";
import Typography from "@mui/material/Typography";
import { useGetUserListQuery } from "@api";
import { useTranslation } from "react-i18next";
import { useState } from "react";

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

  const { status, isLoading, data } = useGetUserListQuery({
    skip: paginationModel.skip,
    limit: paginationModel.limit,
    filter: {
      roles,
      verified,
      search,
    },
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

  if (!data || ["uninitialized", "loading"].includes(status)) return null;

  return (
    <>
      <Typography variant="h4">{t("staff")}</Typography>
      <Filter
        search={searchValue}
        setSearch={setSearchValue}
        roles={rolesValues}
        verified={verifiedValue}
        setRole={setRolesValues}
        setIsVerified={setVerifiedValue}
        applyFilters={applyFilters}
      />
      <UsersTable
        data={data}
        isLoading={isLoading}
        paginationModel={paginationModel}
        setPaginationModel={setPaginationModel}
      />
    </>
  );
};
