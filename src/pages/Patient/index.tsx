import { useGetMyPatientsQuery } from "@api";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { useCallback, useState } from "react";
import { GridSearchFilter, Loader } from "@components";
import { PatientsTable, PatientModal } from "./components";
import { Patient } from "@types";
import { initPatient } from "./initValue";

export const PatientsPage = () => {
  const { t } = useTranslation("", { keyPrefix: "pages.patient" });
  const [search, setSearch] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [patient, setPatient] = useState<
    Omit<Patient, "_id"> & { _id?: string }
  >(initPatient);

  const [paginationModel, setPaginationModel] = useState({
    skip: 0,
    limit: 20,
  });
  const { status, isLoading, data } = useGetMyPatientsQuery({
    skip: paginationModel.skip,
    limit: paginationModel.limit,
    filter: {
      search: searchValue,
    },
  });

  const onCloseHandler = useCallback(() => {
    setIsModalOpen(false);
    setPatient(initPatient);
  }, []);

  if (!data || ["uninitialized", "loading"].includes(status)) return <Loader />;

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Typography variant="h4">{t("patient")}</Typography>
        <Button variant="contained" onClick={() => setIsModalOpen(true)}>
          {t("createPatient")}
        </Button>
      </Box>
      <PatientModal
        open={isModalOpen}
        onClose={onCloseHandler}
        patient={patient}
        setPatient={setPatient}
      />
      <GridSearchFilter
        search={search}
        setSearch={setSearch}
        applyFilters={() => setSearchValue(search)}
      />
      <PatientsTable
        setIsModalOpen={setIsModalOpen}
        data={data}
        isLoading={isLoading}
        setPaginationModel={setPaginationModel}
        onSelectPatient={setPatient}
      />
    </>
  );
};
