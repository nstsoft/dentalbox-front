import { DataGrid, GridColDef, type GridValidRowModel } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";

export const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  "& .MuiDataGrid-cell": {
    color: theme.palette.text.primary,
    fontWeight: 500,
  },

  "& .MuiTablePagination-selectLabel": {
    display: "none",
  },
  "& .MuiTablePagination-displayedRows": {
    margin: 0,
  },
}));

import { useState } from "react";

type Props = GridValidRowModel & {
  onPagination: (prop: { skip: number; limit: number }) => void;
};

export type Row = {
  id: string;
  columns: GridColDef[];
  row: any;
};

export const CustomTable = (params: Props) => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 20,
  });

  return (
    <div style={{ width: "100%" }}>
      <StyledDataGrid
        rowHeight={35}
        rows={params.data}
        columns={params.columns}
        rowCount={params.rowCount}
        pageSizeOptions={[20, 30, 50]}
        getRowId={(row) => row._id}
        paginationMode="server"
        rowSpacingType="border"
        showCellVerticalBorder
        paginationModel={paginationModel}
        onPaginationModelChange={(pagination) => {
          setPaginationModel(pagination);
          const skip = pagination.page * pagination.pageSize;
          params.onPagination({ skip, limit: pagination.pageSize });
        }}
        loading={params.isLoading}
        {...params}
      />
    </div>
  );
};
