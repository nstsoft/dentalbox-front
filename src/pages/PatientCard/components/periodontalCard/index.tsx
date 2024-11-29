import { Loader, NoData } from "@components";

export const PeriodontalCard = () => {
  const data: string[] = [];
  const isLoading = false;

  if (!data.length) return <NoData />;

  if (isLoading) return <Loader />;

  return <div>PeriodontalCard</div>;
};
