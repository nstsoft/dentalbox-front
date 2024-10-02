import { useGetDentalMapQuery } from "@api";
import { FC, useState } from "react";
import { ToothBox } from "./teeth";
import { ToothMapLayout } from "../layout";
import type {
  Chart,
  Segment4,
  Segment2,
  FourZonesChart,
  FiveZonesChart,
} from "@types";
import { SEGMENT_COLORS } from "@types";
import { deepMerge } from "@utils";
import {
  T11Svg,
  T12Svg,
  T13Svg,
  T14Svg,
  T15Svg,
  T16Svg,
  T17Svg,
  T18Svg,
} from "@assets";

const colorsSet = Object.values(SEGMENT_COLORS);

const getNextColor = (color: string) => {
  const index = colorsSet.indexOf(color as SEGMENT_COLORS);
  const nextIndex = (index + 1) % colorsSet.length;
  return colorsSet[nextIndex];
};

export const DentalMap: FC<{ patientId: string }> = ({ patientId }) => {
  const { data } = useGetDentalMapQuery(patientId);
  const [chart, setChart] = useState<Partial<Chart> | undefined>();

  const on4ZoneColorChange = (
    tooth: keyof FourZonesChart,
    segment: keyof Segment2
  ) => {
    if (!data?.chart) return;
    const defaultColor = data.chart[tooth].segments[segment];
    const currentColor = chart?.[tooth]?.segments?.[segment];
    const color: string = getNextColor(currentColor ?? defaultColor);

    const newChart = deepMerge(chart ?? {}, {
      [tooth]: { segments: { [segment]: color } },
    });
    setChart(newChart);
  };

  const on5ZoneColorChange = (
    tooth: keyof FiveZonesChart,
    segment: keyof Segment4
  ) => {
    if (!data?.chart) return;
    const defaultColor = data.chart[tooth].segments[segment];
    const currentColor = chart?.[tooth]?.segments?.[segment];
    const color: string = getNextColor(currentColor ?? defaultColor);

    const newChart = deepMerge(chart ?? {}, {
      [tooth]: { segments: { [segment]: color } },
    });
    setChart(newChart);
  };

  if (!data?.chart) return null;

  const mergedChart = deepMerge(data?.chart, chart ?? {});

  console.log("==========", mergedChart);

  return (
    <div>
      <ToothMapLayout>
        <ToothBox toothNumber={18}>
          <T18Svg tooth={mergedChart.t18} onColorChange={on5ZoneColorChange} />
        </ToothBox>
        <ToothBox toothNumber={17}>
          <T17Svg tooth={mergedChart.t17} onColorChange={on5ZoneColorChange} />
        </ToothBox>
        <ToothBox toothNumber={16}>
          <T16Svg tooth={mergedChart.t16} onColorChange={on5ZoneColorChange} />
        </ToothBox>
        <ToothBox toothNumber={15}>
          <T15Svg tooth={mergedChart.t15} onColorChange={on4ZoneColorChange} />
        </ToothBox>
        <ToothBox toothNumber={14}>
          <T14Svg tooth={mergedChart.t14} onColorChange={on4ZoneColorChange} />
        </ToothBox>
        <ToothBox toothNumber={13}>
          <T13Svg tooth={mergedChart.t13} onColorChange={on4ZoneColorChange} />
        </ToothBox>
        <ToothBox toothNumber={12}>
          <T12Svg tooth={mergedChart.t12} onColorChange={on4ZoneColorChange} />
        </ToothBox>
        <ToothBox toothNumber={11}>
          <T11Svg tooth={mergedChart.t11} onColorChange={on4ZoneColorChange} />
        </ToothBox>
      </ToothMapLayout>
    </div>
  );
};
