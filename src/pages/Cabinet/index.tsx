import { useGetMyCabinetsQuery } from "@api";
import { Box, Button, Typography } from "@mui/material";
import { CabinetModal, CabinetsTable } from "./components";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { GridSearchFilter } from "@components";

export const CabinetPage = () => {
  const { t } = useTranslation("", { keyPrefix: "pages.cabinet" });
  const [search, setSearch] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [paginationModel, setPaginationModel] = useState({
    skip: 0,
    limit: 20,
  });
  const { status, isLoading, data, refetch } = useGetMyCabinetsQuery({
    skip: paginationModel.skip,
    limit: paginationModel.limit,
    filter: {
      search: searchValue,
    },
  });

  if (!data) return null;
  if (["uninitialized", "loading"].includes(status)) {
    return null;
  }

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Typography variant="h4">{t("cabinet")}</Typography>
        <Button variant="contained" onClick={() => setIsModalOpen(true)}>{t("createCabinet")}</Button>
      </Box>
      <CabinetModal open={isModalOpen} onClose={() => setIsModalOpen(false)} onUpdate={() => refetch()} />
      <GridSearchFilter
        search={search}
        setSearch={setSearch}
        applyFilters={() => setSearchValue(search)}
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
