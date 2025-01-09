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
import Button from "@mui/material/Button";

export const PeriodontalCard: FC<{ patientId: string }> = ({ patientId }) => {
  const { data } = useGetPeriodontalChartQuery(patientId);
  const [chart, setChart] = useState(data?.chart);
  const [isDataChanged, setIsDataChanged] = useState(false);

  useEffect(() => {
    if (!chart && data?.chart) {
      setChart(data.chart);
    }
  }, [chart, data?.chart]);

  const onChange = (changed: DeepPartial<PeriodontalChart>) => {
    setChart((prev) => prev && deepMerge(prev, changed));
    setIsDataChanged(true);
  };

  if (!chart) return <NoData />;

  return (
    <Box className="periodontal-card">
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Typography variant="h4" className="title">
          PERIODONTAL CHART
        </Typography>
        <Button variant="contained" disabled={!isDataChanged}>
          Save
        </Button>
      </Box>
      <Jaw onChartSet={onChange} jaw="upperJaw" dataset={chart.upperJaw} />

      <Divider className="divider">
        <Box className="divider-content">
          <Typography variant="h6">Mean Probing Depth= 0mm</Typography>
          <Typography variant="h6">Mean Attachment Level= 0mm</Typography>
          <Typography variant="h6">0% Plaque</Typography>
          <Typography variant="h6">0% Bleeding on Probing</Typography>
        </Box>
      </Divider>
      <Jaw onChartSet={onChange} jaw="bottomJaw" dataset={chart.bottomJaw} />
    </Box>
  );
};
