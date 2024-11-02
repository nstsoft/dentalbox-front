import { type GridColDef } from "@mui/x-data-grid";
import Avatar from "@mui/material/Avatar";
import Grid2 from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { User } from "@types";
import {
  type Dispatch,
  type SetStateAction,
  type FC,
  useState,
  useEffect,
} from "react";
import { CustomTable } from "@components";
import { useTranslation } from "react-i18next";
import days from "dayjs";
import { isMobile } from "react-device-detect";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { StaffModal } from "./modal";
import { useDeleteUserMutation } from "@api";

type Props = {
  setPaginationModel: Dispatch<SetStateAction<{ skip: number; limit: number }>>;
  isLoading: boolean;
  data?: { count: number; data: User[] };
  paginationModel: { skip: number; limit: number };
  onReset: () => void;
};

export const UsersTable: FC<Props> = ({
  setPaginationModel,
  isLoading,
  data,
  onReset,
}) => {
  const { t } = useTranslation("", { keyPrefix: "pages.staff" });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [deleteUser, { isSuccess }] = useDeleteUserMutation();

  const mobileColumns: GridColDef<User>[] = [
    {
      field: "name",
      headerName: `${t("secondName")} ${t("name")} ${t("surname")}`,
      width: isMobile ? 360 : 300,
      renderCell: ({ row }) =>
        isMobile ? (
          <Grid2 height="100%" display="flex" alignItems="center">
            <Avatar
              sx={{ width: 30, height: 30, mr: 1 }}
              sizes="small"
              alt={row.name}
              src={row.image}
            />
            <Typography>
              {row.surname} {row.name[0]}. {row.secondName[0]}.
            </Typography>
          </Grid2>
        ) : (
          `${row.name} ${row.surname} ${row.secondName}`
        ),
    },
  ];

  const columns: GridColDef<User>[] = [
    ...mobileColumns,
    {
      field: "email",
      headerName: t("email"),
      width: 250,
    },
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
      renderCell: ({ row }) => days(row.dob).format("DD.MM.YYYY"),
    },
    { field: "isVerified", headerName: t("verification"), width: 150 },
    {
      field: "actions",
      headerName: t("actions"),
      width: 80,
      renderCell: (params) => {
        return (
          <>
            <Button
              onClick={(event) => {
                setAnchorEl(event.currentTarget);
                setSelectedUser(params.row);
              }}
            >
              <MoreVertIcon />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => {
                setAnchorEl(null);
                setSelectedUser(null);
              }}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={() => setIsModalOpen(true)}>
                {t("update", { keyPrefix: "buttons" })}
              </MenuItem>
              <MenuItem onClick={() => deleteUser(selectedUser?._id ?? "")}>
                {t("delete", { keyPrefix: "buttons" })}
              </MenuItem>
            </Menu>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    if (isSuccess) {
      onReset();
    }
  }, [isSuccess, onReset]);

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
      <StaffModal
        selectedUser={selectedUser}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
