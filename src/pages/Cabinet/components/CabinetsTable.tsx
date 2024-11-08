import { GridMoreVertIcon, type GridColDef } from "@mui/x-data-grid";
import { Cabinet } from "@types";
import { useState, type Dispatch, type FC, type SetStateAction } from "react";
import { CustomTable, Loader, NoData, TablePopover } from "@components";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid2 from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { isMobile } from "react-device-detect";
import { CabinetForm } from "../types";
import { useDeleteCabinetMutation } from "@api";

type Props = {
  setPaginationModel: Dispatch<SetStateAction<{ skip: number; limit: number }>>;
  isLoading: boolean;
  data?: { count: number; data: Cabinet[] };
  setIsModalOpen: (isOpen: boolean) => void;
  onSelectCabinet: Dispatch<SetStateAction<CabinetForm & { _id?: string }>>;
};

export const CabinetsTable: FC<Props> = ({
  setPaginationModel,
  isLoading,
  data,
  onSelectCabinet,
  setIsModalOpen,
}) => {
  const { t } = useTranslation("", { keyPrefix: "pages.cabinet" });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [selectedCabinet, setSelectedCabinet] = useState<Cabinet>();
  const [deleteCabinet] = useDeleteCabinetMutation();

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
      renderCell: (params) => {
        return (
          <Box className={params.row._id} key={params.row._id}>
            <Button
              onClick={(event) => {
                event.stopPropagation();
                setAnchorEl(event.currentTarget);
                setIsPopoverOpen(true);
                setSelectedCabinet(params.row)
                onSelectCabinet({
                  ...params.row,
                  chairs: (params.row.chairs ?? []).map((chair) => chair.name),
                });
              }}
            >
              <GridMoreVertIcon />
            </Button>
          </Box>
        );
      },
    },
  ];

  if (isLoading) return <Loader />;

  if (!data) return <NoData />;

  return (
    <div>
      <TablePopover
        open={isPopoverOpen}
        anchorEl={anchorEl}
        onClose={() => {
          setIsPopoverOpen(false);
        }}
        onUpdate={() => {
          setIsPopoverOpen(false);
          setIsModalOpen(true);
        }}
        onDelete={() => {
          deleteCabinet(selectedCabinet?._id ?? "");
        }}
      />
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
