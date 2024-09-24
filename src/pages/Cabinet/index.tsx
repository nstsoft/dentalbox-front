import { useGetMyCabinetsQuery } from "@api";
import { Typography } from "@mui/material";
import { CabinetsTable } from "./components/CabinetsTable";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { CabinetFilter } from "./components/filter";

export const CabinetPage = () => {
  const { t } = useTranslation("", { keyPrefix: "pages.cabinet" });
  const [search, setSearch] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>();

  const [paginationModel, setPaginationModel] = useState({
    skip: 0,
    limit: 20,
  });
  const { status, isLoading, data } = useGetMyCabinetsQuery({
    skip: paginationModel.skip,
    limit: paginationModel.limit,
    filter: {
      search: searchValue,
    },
  });

  const applyFilters = () => {
    setSearchValue(search);
  };

  if (!data) return null;
  if (["uninitialized", "loading"].includes(status)) {
    return null;
  }

  return (
    <>
      <Typography variant="h4">{t("cabinet")}</Typography>
      <CabinetFilter
        search={search}
        setSearch={setSearch}
        applyFilters={applyFilters}
      />
      <CabinetsTable
        data={data}
        isLoading={isLoading}
        paginationModel={paginationModel}
        setPaginationModel={setPaginationModel}
      />
    </>
  );
};
