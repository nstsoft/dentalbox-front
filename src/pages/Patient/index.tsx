import { useGetMyPatientsQuery } from "@api";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { GridSearchFilter } from "@components";
import { PatientsTable, PatientModal } from "./components";
import { Patient, Sex } from "@types";

const initPatient = {
  name: "",
  secondName: "",
  surname: "",
  sex: Sex.male,
  dob: "",
  email: "",
  phone: "+380",
  address: "",
};

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
  const { status, isLoading, data, refetch } = useGetMyPatientsQuery({
    skip: paginationModel.skip,
    limit: paginationModel.limit,
    filter: {
      search: searchValue,
    },
  });

  if (!data || ["uninitialized", "loading"].includes(status)) return null;

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
        onClose={() => {
          setIsModalOpen(false);
          setPatient(initPatient);
        }}
        onUpdate={() => refetch()}
        patient={patient}
        setPatient={(patient) => setPatient(patient)}
      />
      <GridSearchFilter
        search={search}
        setSearch={setSearch}
        applyFilters={() => setSearchValue(search)}
      />
      <PatientsTable
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        data={data}
        isLoading={isLoading}
        paginationModel={paginationModel}
        setPaginationModel={setPaginationModel}
        onSelectPatient={(patient) => setPatient(patient ?? initPatient)}
      />
    </>
  );
};
