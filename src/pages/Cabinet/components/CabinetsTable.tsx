import { type GridColDef } from "@mui/x-data-grid";
import { Cabinet } from "@types";
import { type Dispatch, type FC, type SetStateAction } from "react";
import { CustomTable } from "@components";

const columns: GridColDef<Cabinet>[] = [
  { field: "name", headerName: "Name", width: 150 },
  { field: "image", headerName: "Image", width: 200 },
  {
    field: "notes",
    headerName: "Notes",
    width: 200,
  },
  {
    field: "phone",
    headerName: "Phone",
    type: "number",
    width: 150,
  },
  { field: "address", headerName: "Address", width: 200 },
  {
    field: "workspace",
    headerName: "Workspace",
    width: 160,
  },
];

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
      rowCount={data.count * 1000}
      loading={isLoading}
      onPagination={setPaginationModel}
    />
  );
};
