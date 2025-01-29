import "./styles.scss";

import { Loader, NoData } from "@components";
import { type FC, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { Jaw } from "./components";
import {
  useGetPeriodontalChartQuery,
  useUpdatePeriodontalChartMutation,
} from "@api";
import type {
  DeepPartial,
  PeriodontalChart,
  BottomJawTooth,
  UpperJawTooth,
} from "@types";
import { deepMerge } from "@utils";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";

export const PeriodontalCard: FC<{ patientId: string }> = ({ patientId }) => {
  const { data, isLoading } = useGetPeriodontalChartQuery(patientId);
  const [chart, setChart] = useState(data?.chart);
  const [isDataChanged, setIsDataChanged] = useState(false);
  const { t } = useTranslation("", {
    keyPrefix: "pages.patientCard.periodontalCard",
  });
  const [updatePeriodontalChart, setUpdatePeriodontalChart] = useState<
    DeepPartial<PeriodontalChart>
  >({});
  const [updateChart] = useUpdatePeriodontalChartMutation();

  useEffect(() => {
    if (!chart && data?.chart) {
      setChart(data.chart);
    }
  }, [chart, data?.chart]);

  const onChange = (changed: DeepPartial<PeriodontalChart>) => {
    setUpdatePeriodontalChart((prev) => prev && deepMerge(prev, changed));
    setChart((prev) => prev && deepMerge(prev, changed));
    setIsDataChanged(true);
  };

  const saveChanges = () => {
    if (!updatePeriodontalChart) return;
    updateChart({
      patient: patientId,
      chart: updatePeriodontalChart,
      notes: "",
    });
    setIsDataChanged(false);
  };

  if (isLoading) return <Loader />;

  if (!chart) return <NoData />;

  const experimentsCount = 64;
  const teethStack = Object.assign({ ...chart.upperJaw }, chart.bottomJaw);

  const measurements = Object.values(teethStack).reduce(
    (acc, curr: UpperJawTooth | BottomJawTooth) => {
      if ("palatal" in curr) {
        acc.depth += curr.palatal.depth.reduce((a, c) => a + c, 0);
        acc.margin += curr.palatal.margin.reduce((a, c) => a + c, 0);
        acc.plaque += curr.palatal.plaque.filter(Boolean).length;
        acc.bleeding += curr.palatal.bleeding.filter(Boolean).length;
      }

      if ("lingual" in curr) {
        acc.depth += curr.lingual.depth.reduce((a, c) => a + c, 0);
        acc.margin += curr.lingual.margin.reduce((a, c) => a + c, 0);
        acc.plaque += curr.lingual.plaque.filter(Boolean).length;
        acc.bleeding += curr.lingual.bleeding.filter(Boolean).length;
      }

      acc.depth += curr.buccal.depth.reduce((a, c) => a + c, 0);
      acc.margin += curr.buccal.margin.reduce((a, c) => a + c, 0);
      acc.plaque += curr.buccal.plaque.filter(Boolean).length;
      acc.bleeding += curr.buccal.bleeding.filter(Boolean).length;

      return acc;
    },
    { depth: 0, margin: 0, plaque: 0, bleeding: 0 }
  );

  return (
    <Box className="periodontal-card">
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Button
          variant="contained"
          disabled={!isDataChanged}
          onClick={saveChanges}
        >
          {t("save", { keyPrefix: "buttons" })}
        </Button>
      </Box>
      <Jaw onChartSet={onChange} jaw="upperJaw" dataset={chart.upperJaw} />

      <Divider className="divider">
        <Box className="divider-content">
          <Typography variant="h6">
            {t("divider.meanDepth", {
              value: measurements.depth / experimentsCount,
            })}
          </Typography>
          <Typography variant="h6">
            {t("divider.meanAttachment", {
              value: measurements.margin / experimentsCount,
            })}
          </Typography>
          <Typography variant="h6">
            {(measurements.plaque / experimentsCount) * 100}% {t("jaw.plaque")}
          </Typography>
          <Typography variant="h6">
            {(measurements.bleeding / experimentsCount) * 100}%
            {t("jaw.bleeding")}
          </Typography>
        </Box>
      </Divider>
      <Jaw onChartSet={onChange} jaw="bottomJaw" dataset={chart.bottomJaw} />
    </Box>
  );
};
