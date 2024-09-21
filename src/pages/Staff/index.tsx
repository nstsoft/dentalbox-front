import { UsersTable, Filter } from "./components";
import Typography from "@mui/material/Typography";
import { useGetUserListQuery } from "@api";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export const StaffPage = () => {
  const { t } = useTranslation("", { keyPrefix: "pages.staff" });

  const [roles, setRole] = useState<string[]>([]);
  const [verified, setIsVerified] = useState<string[]>([]);
  const [search, setSearch] = useState<string>("");

  const [rolesValues, setRolesValues] = useState<string[]>([]);
  const [verifiedValue, setVerifiedValue] = useState<string>();
  const [searchValue, setSearchValue] = useState<string>();

  const [paginationModel, setPaginationModel] = useState({
    skip: 0,
    limit: 20,
  });
  const { status, isLoading, data } = useGetUserListQuery({
    skip: paginationModel.skip,
    limit: paginationModel.limit,
    filter: {
      roles: rolesValues,
      verified: verifiedValue,
      search: searchValue,
    },
  });

  const applyFilters = () => {
    setRolesValues(roles);
    if ([0, 2].includes(verified.length)) {
      setVerifiedValue(undefined);
    } else {
      setVerifiedValue(verified[0] === "verified" ? "true" : "false");
    }
    setSearchValue(search);
  };

  if (!data) return null;
  if (["uninitialized", "loading"].includes(status)) {
    return null;
  }

  return (
    <div>
      <Typography variant="h4">{t("staff")}</Typography>
      <Filter
        search={search}
        setSearch={setSearch}
        roles={roles}
        verified={verified}
        setRole={setRole}
        setIsVerified={setIsVerified}
        applyFilters={applyFilters}
      />
      <UsersTable
        data={data}
        isLoading={isLoading}
        paginationModel={paginationModel}
        setPaginationModel={setPaginationModel}
      />
    </div>
  );
};
