import "./styles.scss";

import { NoData } from "@components";
import { type FC, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { Jaw } from "./components";
import { useGetPeriodontalChartQuery } from "@api";
import type { DeepPartial, PeriodontalChart } from "@types";
import { deepMerge } from "@utils";

export const PeriodontalCard: FC<{ patientId: string }> = ({ patientId }) => {
  const { data } = useGetPeriodontalChartQuery(patientId);
  const [chart, setChart] = useState(data?.chart);

  useEffect(() => {
    if (!chart && data?.chart) {
      console.log("ddddd");
      setChart(data.chart);
    }
  }, [chart, data?.chart]);

  const onChange = (changed: DeepPartial<PeriodontalChart>) => {
    setChart((prev) => prev && deepMerge(prev ?? {}, changed));
  };

  if (!chart) return <NoData />;
  console.log("=========");

  return (
    <Box className="periodontal-card">
      <Typography variant="h4" className="title">
        PERIODONTAL CHART
      </Typography>
      <Jaw onChartSet={onChange} jaw="upperJaw" dataset={chart.upperJaw} />

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
