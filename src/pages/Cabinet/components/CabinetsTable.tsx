import { GridMoreVertIcon, type GridColDef } from "@mui/x-data-grid";
import { Cabinet } from "@types";
import { useState, type Dispatch, type FC, type SetStateAction } from "react";
import { CustomTable, Loader, NoData } from "@components";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid2 from "@mui/material/Grid2";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { isMobile } from "react-device-detect";
import { CabinetForm } from "../types";

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
          <>
            <Button
              onClick={(event) => {
                event.stopPropagation();
                setAnchorEl(event.currentTarget);
                console.log(params.row);
                onSelectCabinet({
                  ...params.row,
                  chairs: (params.row.chairs ?? []).map((chair) => chair.name),
                });
              }}
            >
              <GridMoreVertIcon />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={() => setIsModalOpen(true)}>
                {t("update", { keyPrefix: "buttons" })}
              </MenuItem>
              <MenuItem>{t("delete", { keyPrefix: "buttons" })}</MenuItem>
            </Menu>
          </>
        );
      },
    },
  ];

  if (isLoading) return <Loader />;

  if (!data) return <NoData />;

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
