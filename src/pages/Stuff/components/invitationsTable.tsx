import { type GridColDef } from "@mui/x-data-grid";
import { UserInvitation, UserRole } from "@types";
import { CustomTable, InvitationForm, Loader, NoData } from "@components";
import { useTranslation } from "react-i18next";
import days from "dayjs";
import { type Dispatch, type SetStateAction, type FC, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useAuth } from "@hooks";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

type Props = {
  isLoading: boolean;
  data?: { count: number; data: UserInvitation[] };
  setPaginationModel: Dispatch<SetStateAction<{ skip: number; limit: number }>>;
  paginationModel: { skip: number; limit: number };
};

export const InvitationsTable: FC<Props> = ({
  setPaginationModel,
  isLoading,
  data,
}) => {
  const { t } = useTranslation("", { keyPrefix: "pages.stuff" });
  const { user, workspace } = useAuth();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  if (isLoading) return <Loader />;

  if (!data || !user || !workspace) return <NoData />;

  const canInviteUser =
    workspace.currentMembersCount < workspace.maxMembersCount &&
    [UserRole.admin, UserRole.owner, UserRole.manager].includes(user.role);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const statusColors: Record<string, string> = {
    pending: "#f9b071",
    accepted: "#c3f7c3",
    declined: "#f7c3c3",
    expired: "#f7c3c3",
  };

  const columns: GridColDef<UserInvitation>[] = [
    {
      field: "email",
      headerName: t("email"),
      width: 250,
    },
    {
      field: "userRole",
      headerName: t("roles"),
      width: 150,
      valueGetter: (_, r) => r.userRole,
    },
    {
      field: "status",
      headerName: t("status"),
      cellClassName: "status",
      width: 150,
      valueGetter: (_, r) => t(`invitationStatuses.${r.status}`),
      renderCell: (params) => {
        return (
          <Box sx={{ backgroundColor: statusColors[params.row.status], px: 1 }}>
            {params.value}
          </Box>
        );
      },
    },
    {
      field: "activeTill",
      headerName: t("activeTill"),
      width: 150,
      valueGetter: (_, r) => days(r.activeTill * 1000).format("DD.MM.YYYY"),
    },
    {
      field: "actions",
      headerName: t("actions"),
      renderCell: (params) =>
        params.row.status === "pending" && (
          <Button>{t("cancel", { keyPrefix: "buttons" })}</Button>
        ),
    },
  ];

  return (
    <>
      <Button
        disabled={!canInviteUser}
        sx={{ mt: 1, mb: 1 }}
        onClick={handleClick}
      >
        <PersonAddAlt1Icon sx={{ mr: 1 }} /> {t("addStuff")}
      </Button>
      <InvitationForm
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        onSubmit={() => setAnchorEl(null)}
      />
      <div style={{ width: "100%" }}>
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
          columnVisibilityModel={{
            actions:
              user &&
              ![UserRole.doctor, UserRole.assistant].includes(user?.role),
          }}
        />
      </div>
    </>
  );
};
