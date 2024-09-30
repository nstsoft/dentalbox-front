import { type GridColDef } from "@mui/x-data-grid";
import { type Patient } from "@types";
import { type Dispatch, type FC, type SetStateAction } from "react";
import { CustomTable } from "@components";
import { Avatar, Grid2, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

type Props = {
  setPaginationModel: Dispatch<SetStateAction<{ skip: number; limit: number }>>;
  isLoading: boolean;
  data?: { count: number; data: Patient[] };
  paginationModel: { skip: number; limit: number };
};

export const PatientsTable: FC<Props> = ({
  setPaginationModel,
  isLoading,
  data,
}) => {
  const { t } = useTranslation("", { keyPrefix: "pages.patient" });

  const columns: GridColDef<Patient>[] = [
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
              src={row.image}
            />
            <Typography> {row.name}</Typography>
          </Grid2>
        );
      },
    },
    {
      field: "dob",
      headerName: t("dob"),
      width: 180,
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
  ];

  if (!data) return null;

  return (
    <CustomTable
      rows={data.data}
      columns={columns.map((col) => ({
        ...col,
        sortable: false,
        filterable: false,
        editable: false,
      }))}
      rowCount={data.count}
      loading={isLoading}
      onPagination={setPaginationModel}
    />
  );
};
