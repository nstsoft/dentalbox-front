import { type GridColDef } from "@mui/x-data-grid";
import Avatar from "@mui/material/Avatar";
import Grid2 from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { User } from "@types";
import { type Dispatch, type SetStateAction, type FC } from "react";
import { CustomTable } from "@components";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { isMobile } from "react-device-detect";

type Props = {
  setPaginationModel: Dispatch<SetStateAction<{ skip: number; limit: number }>>;
  isLoading: boolean;
  data?: { count: number; data: User[] };
  paginationModel: { skip: number; limit: number };
};

export const UsersTable: FC<Props> = ({
  setPaginationModel,
  isLoading,
  data,
}) => {
  const { t } = useTranslation("", { keyPrefix: "pages.staff" });

  const mobileColumns: GridColDef<User>[] = [
    {
      field: "email",
      headerName: t("email"),
      width: isMobile ? 200 : 250,

      renderCell: ({ row }) => (
        <Grid2 height="100%" display="flex" alignItems="center">
          <Avatar
            sx={{ width: 30, height: 30, mr: 1 }}
            sizes="small"
            alt={row.name}
            src={row.image}
          />
          <Typography> {row.email}</Typography>
        </Grid2>
      ),
    },
    {
      field: "name",
      headerName: t("name"),
      width: isMobile ? 200 : 300,
      renderCell: ({ row }) =>
        isMobile
          ? `${row.surname} ${row.name[0]}. ${row.secondName[0]}.`
          : `${row.name} ${row.surname} ${row.secondName}`,
    },
  ];

  const columns: GridColDef<User>[] = [
    ...mobileColumns,
    { field: "phone", headerName: t("phone"), width: 150 },
    {
      field: "roles",
      headerName: t("roles"),
      width: 70,
      valueGetter: (_, r) => r.roles[0].role,
    },
    {
      field: "dob",
      headerName: t("dob"),
      width: 150,
      renderCell: ({ row }) => moment(row.dob).format("DD.MM.YYYY"),
    },
    { field: "isVerified", headerName: t("verification"), width: 150 },
  ];
  if (!data) return null;

  return (
    <div style={{ width: "100%" }}>
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
    </div>
  );
};
