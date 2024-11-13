import "./style.scss";
import { type FC } from "react";
import { useGetTreatmentPlanListQuery, useGetServicesQuery } from "@api";
import { TreatmentList } from "./components";
import Box from "@mui/material/Box";

type Props = {
  patientId: string;
};

export const TreatmentPlan: FC<Props> = ({ patientId }) => {
  const { data } = useGetTreatmentPlanListQuery(patientId);
  const { data: services } = useGetServicesQuery();

  if (!data || !services?.length) return null;
  return (
    <Box className="treatment-plan">
      <TreatmentList services={services} items={data} />
    </Box>
  );
};
