import { type GridColDef } from "@mui/x-data-grid";
import { type Patient } from "@types";
import { type Dispatch, type FC, type SetStateAction } from "react";
import { CustomTable, Row } from "@components";
import Avatar from "@mui/material/Avatar";
import Grid2 from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { isMobile } from "react-device-detect";

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
  const navigate = useNavigate();

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
  );
};
