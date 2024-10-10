import { type GridColDef } from "@mui/x-data-grid";
import { Cabinet } from "@types";
import { type Dispatch, type FC, type SetStateAction } from "react";
import { CustomTable } from "@components";
import Avatar from "@mui/material/Avatar";
import Grid2 from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { isMobile } from "react-device-detect";

type Props = {
  setPaginationModel: Dispatch<SetStateAction<{ skip: number; limit: number }>>;
  isLoading: boolean;
  data?: { count: number; data: Cabinet[] };
  paginationModel: { skip: number; limit: number };
};

export const CabinetsTable: FC<Props> = ({
  setPaginationModel,
  isLoading,
  data,
}) => {
  const { t } = useTranslation("", { keyPrefix: "pages.cabinet" });

  const mobileColumns: GridColDef<Cabinet>[] = [
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
  ];

  const columns: GridColDef<Cabinet>[] = [
    ...mobileColumns,
    {
      field: "phone",
      headerName: t("phone"),
      type: "number",
      width: 180,
    },
    { field: "address", headerName: t("address"), width: 220 },
    {
      field: "notes",
      headerName: t("notes"),
      width: 450,
    },
    {
      field: "actions",
      headerName: t("actions"),
      width: 80,
      renderCell: () => (
        <Grid2>
          <EditIcon />
          <DeleteIcon />
        </Grid2>
      ),
    },
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
    />
  );
};
