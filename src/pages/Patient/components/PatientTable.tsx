import { GridMoreVertIcon, type GridColDef } from "@mui/x-data-grid";
import { type Patient } from "@types";
import { useState, type Dispatch, type FC, type SetStateAction } from "react";
import { CustomTable, Row, NoData, Loader } from "@components";
import Avatar from "@mui/material/Avatar";
import Grid2 from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { isMobile } from "react-device-detect";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import days from "dayjs";
import { TablePopover } from "@components";
import { useDeletePatientMutation } from "@api";

type Props = {
  setPaginationModel: Dispatch<SetStateAction<{ skip: number; limit: number }>>;
  isLoading: boolean;
  data?: { count: number; data: Patient[] };
  setIsModalOpen: (isOpen: boolean) => void;
  onSelectPatient: Dispatch<
    SetStateAction<Omit<Patient, "_id"> & { _id?: string }>
  >;
};

export const PatientsTable: FC<Props> = ({
  setPaginationModel,
  isLoading,
  data,
  setIsModalOpen,
  onSelectPatient,
}) => {
  const { t } = useTranslation("", { keyPrefix: "pages.patient" });
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient>();
  const [deletePatient] = useDeletePatientMutation();

  const mobileColumns: GridColDef<Patient>[] = [
    {
      field: "name",
      headerName: t("name"),
      width: 300,
      renderCell: ({ row }) => {
        return (
          <Grid2 height="100%" display="flex" alignItems="center">
            <Avatar
              sx={{ width: 30, height: 30, mr: 1 }}
              sizes="small"
              alt={row.name}
              src={row.image as string}
            />
            <Typography> {row.name}</Typography>
          </Grid2>
        );
      },
    },
  ];

  const columns: GridColDef<Patient>[] = [
    ...mobileColumns,
    {
      field: "dob",
      headerName: t("dob"),
      width: 180,
      renderCell: ({ row }) => days(row.dob).format("DD.MM.YYYY"),
    },
    {
      field: "email",
      headerName: t("email"),
      width: 180,
    },
    {
      field: "phone",
      headerName: t("phone"),
      type: "number",
      width: 180,
    },
    { field: "address", headerName: t("address"), width: 220 },
    {
      field: "actions",
      headerName: t("actions"),
      width: 80,
      renderCell: (params) => {
        return (
          <Box className={params.row._id} key={params.row._id}>
            <Button
              onClick={(event) => {
                event.stopPropagation();
                setAnchorEl(event.currentTarget);
                setIsPopoverOpen(true);
                setSelectedPatient(params.row);
                onSelectPatient(params.row);
              }}
            >
              <GridMoreVertIcon />
            </Button>
          </Box>
        );
      },
    },
  ];

  if (isLoading) return <Loader />;

  if (!data) return <NoData />;

  return (
    <div>
      <TablePopover
        open={isPopoverOpen}
        anchorEl={anchorEl}
        onClose={() => {
          setIsPopoverOpen(false);
        }}
        onUpdate={() => {
          setIsPopoverOpen(false);
          setIsModalOpen(true);
        }}
        onDelete={() => {
          deletePatient(selectedPatient?._id ?? "");
        }}
      />

      <CustomTable
        rows={data.data}
        columns={(isMobile ? mobileColumns : columns).map((col) => ({
          ...col,
          sortable: false,
          filterable: false,
          editable: false,
        }))}
        rowCount={data.count}
        loading={isLoading}
        onPagination={setPaginationModel}
        onRowClick={(data: Row) => navigate(data.id)}
      />
    </div>
  );
};
