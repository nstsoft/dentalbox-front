import { type GridColDef } from "@mui/x-data-grid";
import { User } from "@types";
import { type Dispatch, type SetStateAction, type FC } from "react";
import { CustomTable } from "@components";

const columns: GridColDef<User>[] = [
  { field: "email", headerName: "Email", width: 250 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "surname", headerName: "Surname", width: 150 },
  { field: "secondName", headerName: "SecondName", width: 150 },
  {
    field: "roles",
    headerName: "Role",
    width: 70,
    valueGetter: (_, r) => r.roles[0].role,
  },
  { field: "dob", headerName: "Dob", width: 150 },
  { field: "isVerified", headerName: "Is verified", width: 150 },
];

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
        rowCount={data.count * 1000}
        loading={isLoading}
        onPagination={setPaginationModel}
      />
    </div>
  );
};
