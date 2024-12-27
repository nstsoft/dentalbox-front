import "./styles.scss";

import { Loader, NoData } from "@components";
import { type FC } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { Jaw } from "./components";
import { useGetPeriodontalChartQuery } from "@api";

export const PeriodontalCard: FC<{ patientId: string }> = ({ patientId }) => {
  const { data } = useGetPeriodontalChartQuery(patientId);

  if (!data?.chart) return <NoData />;

  return (
    <Box className="periodontal-card">
      <Typography variant="h4" className="title">
        PERIODONTAL CHART
      </Typography>
      <Jaw jaw="upper" dataset={data.chart.upperJaw} />

      <Divider className="divider">
        <Box className="divider-content">
          <Typography variant="h6">Mean Probing Depth= 0mm</Typography>
          <Typography variant="h6">Mean Attachment Level= 0mm</Typography>
          <Typography variant="h6">0% Plaque</Typography>
          <Typography variant="h6">0% Bleeding on Probing</Typography>
        </Box>
      </Divider>
    </Box>
  );
};
