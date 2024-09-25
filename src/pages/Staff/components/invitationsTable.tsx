import { type GridColDef } from "@mui/x-data-grid";
import { UserInvitation } from "@types";
import { CustomTable } from "@components";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { type Dispatch, type SetStateAction, type FC } from "react";

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
  const { t } = useTranslation("", { keyPrefix: "pages.staff" });

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
      width: 150,
      valueGetter: (_, r) => t(`invitationStatuses.${r.status}`),
    },
    {
      field: "activeTill",
      headerName: t("activeTill"),
      width: 150,
      valueGetter: (_, r) => moment(r.activeTill * 1000).format("DD.MM.YYYY"),
    },
  ];
  if (!data) return null;

  return (
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
      />
    </div>
  );
};
