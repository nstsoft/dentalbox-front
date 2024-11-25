import { useGetInvoiceListQuery } from "@api";
import { Loader, NoData } from "@components";

export const InvoiceList = () => {
  const { data, isLoading } = useGetInvoiceListQuery({
    skip: 0,
    limit: 10,
  });

  if (isLoading) return <Loader />;

  if (!data) return <NoData />;

  return <div>Invoice sssList</div>;
};
