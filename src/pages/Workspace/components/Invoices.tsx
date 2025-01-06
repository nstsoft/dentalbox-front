import { useGetInvoiceListMutation, useGetProductsQuery } from "@api";
import { Loader, NoData, StyledDataGrid } from "@components";
import { GridColDef, GridValidRowModel } from "@mui/x-data-grid";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import Box from "@mui/material/Box";
import days from "dayjs";
import icons from "currency-icons";
import { Line } from "@types";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";
import { useEffect } from "react";

const statusColors: Record<string, string> = {
  draft: "#f9b071",
  open: "#f9b071",
  paid: "#c3f7c3",
  uncollectible: "#f7c3c3",
  void: "#f7c3c3",
};

export const InvoiceList = () => {
  const { t, i18n } = useTranslation("", { keyPrefix: "pages.workspace" });

  const [getInvoices, { data, isLoading }] = useGetInvoiceListMutation();
  const { data: products } = useGetProductsQuery();

  useEffect(() => {
    getInvoices({ limit: "10" });
  }, [getInvoices]);

  const getMoreInvoices = () => {
    getInvoices({
      limit: "10",
      startingAfter: data?.data[data.data.length - 1].id,
    });
  };

  const columns: GridColDef<GridValidRowModel>[] = [
    {
      field: "period_start",
      headerName: "Period",
      width: 220,
      renderCell: ({ row }) => (
        <>
          {days(row.period_start).format("DD.MM.YYYY") +
            " - " +
            days(row.period_end).format("DD.MM.YYYY")}
        </>
      ),
    },
    {
      field: "amount_due",
      headerName: "Amount Due",
      renderCell: ({ row }) => (
        <Box id={`amount$${row.id}}`}>
          {row.amount_due / 100} {icons[row.currency?.toUpperCase()]?.symbol}
        </Box>
      ),
      width: 180,
    },
    {
      field: "status",
      headerName: "Status",
      cellClassName: "status",
      width: 150,
      renderCell: (params) => {
        return (
          <Box sx={{ backgroundColor: statusColors[params.row.status], px: 1 }}>
            {t(`invoiceStatuses.${params.value}`)}
          </Box>
        );
      },
    },
    {
      field: "lines",
      headerName: "Products",
      cellClassName: "products",
      width: 250,
      renderCell: (params) => {
        return (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {params.row.lines?.map((line: Line) => {
              const product = products?.find(
                (product) => product.productId === line.product
              );
              return (
                <Box key={line.product}>
                  <img
                    className="product-image"
                    width={20}
                    height={20}
                    src={product?.image}
                    alt={
                      i18n.language === "uk"
                        ? product?.metadata.ua_name
                        : product?.metadata.en_name
                    }
                  />
                  {i18n.language === "uk"
                    ? product?.metadata.ua_name
                    : product?.metadata.en_name}
                </Box>
              );
            })}
          </Box>
        );
      },
    },
    {
      field: "created",
      headerName: "Created",
      width: 120,
      renderCell: ({ row }) => days(row.dob).format("DD.MM.YYYY"),
    },

    {
      field: "invoice_pdf",
      headerName: "PDF",
      width: 50,
      renderCell: (params) => {
        return (
          <a
            onClick={(e) => e.stopPropagation()}
            href={params.row.invoice_pdf}
            target="_blank"
            rel="noreferrer"
          >
            <FileDownloadIcon />
          </a>
        );
      },
    },
  ];

  if (isLoading) return <Loader />;

  if (!data) return <NoData />;

  return (
    <div className="invoice-list">
      <StyledDataGrid
        rowHeight={35}
        rows={data.data}
        columns={columns.map((col) => ({
          ...col,
          sortable: false,
          filterable: false,
          editable: false,
        }))}
        getRowId={(row) => row.id}
        showCellVerticalBorder
        loading={isLoading}
        onRowClick={(data) =>
          window.open(data.row.hosted_invoice_url, "_blank")
        }
      />

      <Button
        className="show-more"
        onClick={getMoreInvoices}
        disabled={!data.hasMore}
      >
        {t("showMore")}
      </Button>
    </div>
  );
};
