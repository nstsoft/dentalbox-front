import { useGetInvoiceListQuery } from "@api";

export const InvoiceList = () => {
  const { data, isLoading, isError } = useGetInvoiceListQuery({
    skip: 0,
    limit: 10,
  });
  return <div>Invoice sssList</div>;
};
