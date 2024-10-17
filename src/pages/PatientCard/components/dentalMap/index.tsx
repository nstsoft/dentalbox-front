import { useGetDentalMapQuery } from "@api";
import { FC, useState } from "react";
import { ToothBox } from "./ToothBox";
import { ToothMapLayout } from "../layout";
import type {
  Chart,
  Segment4,
  Segment2,
  FourZonesChart,
  FiveZonesChart,
  Zone4,
  Zone5,
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
  T21Svg,
  T22Svg,
  T23Svg,
  T24Svg,
  T25Svg,
  T26Svg,
  T27Svg,
  T28Svg,
  T31Svg,
  T32Svg,
  T33Svg,
  T34Svg,
  T35Svg,
  T36Svg,
  T37Svg,
  T38Svg,
  T41Svg,
  T42Svg,
  T43Svg,
  T44Svg,
  T45Svg,
  T46Svg,
  T47Svg,
  T48Svg,
  Zone4Segment,
  Zone5Segment,
} from "./teeth";
import Grid2 from "@mui/material/Grid2";

import Divider from "@mui/material/Divider";
import Skull from "@images/skull.png";
import { isMobile } from "react-device-detect";

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

  const on4ZoneTrigger = (tooth: keyof FourZonesChart, zone: keyof Zone4) => {
    if (!data?.chart) return;

    setChart((prev) => ({
      ...prev,
      [tooth]: {
        ...prev?.[tooth],
        zones: {
          ...prev?.[tooth]?.zones,
          [zone]: !prev?.[tooth]?.zones?.[zone],
        },
      },
    }));
  };
  const on5ZoneTrigger = (tooth: keyof FiveZonesChart, zone: keyof Zone5) => {
    if (!data?.chart) return;

    setChart((prev) => ({
      ...prev,
      [tooth]: {
        ...prev?.[tooth],
        zones: {
          ...prev?.[tooth]?.zones,
          [zone]: !prev?.[tooth]?.zones?.[zone],
        },
      },
    }));
  };

  if (!data?.chart) return null;

  const mergedChart = deepMerge(data?.chart, chart ?? {});

  return (
    <div
      className="dental-map-background"
      style={{
        backgroundImage: isMobile ? "none" : `url(${Skull})`,
      }}
    >
      <div className="dental-map-blurred-overlay"></div>
      <Grid2 className="dental-map">
        <ToothMapLayout direction="left">
          <ToothBox orientation="top" toothNumber={18}>
            <T18Svg
              tooth={mergedChart.t18}
              onColorChange={on5ZoneColorChange}
            />
            <Zone5Segment
              toothKey="t18"
              tooth={mergedChart.t18}
              onZoneTrigger={on5ZoneTrigger}
            />
          </ToothBox>
          <ToothBox orientation="top" toothNumber={17}>
            <T17Svg
              tooth={mergedChart.t17}
              onColorChange={on5ZoneColorChange}
            />
            <Zone5Segment
              toothKey="t17"
              tooth={mergedChart.t17}
              onZoneTrigger={on5ZoneTrigger}
            />
          </ToothBox>
          <ToothBox orientation="top" toothNumber={16}>
            <T16Svg
              tooth={mergedChart.t16}
              onColorChange={on5ZoneColorChange}
            />
            <Zone5Segment
              toothKey="t16"
              tooth={mergedChart.t16}
              onZoneTrigger={on5ZoneTrigger}
            />
          </ToothBox>
          <ToothBox orientation="top" toothNumber={15}>
            <T15Svg
              tooth={mergedChart.t15}
              onColorChange={on4ZoneColorChange}
            />
            <Zone4Segment
              toothKey="t15"
              tooth={mergedChart.t15}
              onZoneTrigger={on4ZoneTrigger}
            />
          </ToothBox>
          <ToothBox orientation="top" toothNumber={14}>
            <T14Svg
              tooth={mergedChart.t14}
              onColorChange={on4ZoneColorChange}
            />
            <Zone4Segment
              toothKey="t14"
              tooth={mergedChart.t14}
              onZoneTrigger={on4ZoneTrigger}
            />
          </ToothBox>
          <ToothBox orientation="top" toothNumber={13}>
            <T13Svg
              tooth={mergedChart.t13}
              onColorChange={on4ZoneColorChange}
            />
            <Zone4Segment
              toothKey="t13"
              tooth={mergedChart.t13}
              onZoneTrigger={on4ZoneTrigger}
            />
          </ToothBox>
          <ToothBox orientation="top" toothNumber={12}>
            <T12Svg
              tooth={mergedChart.t12}
              onColorChange={on4ZoneColorChange}
            />
            <Zone4Segment
              toothKey="t12"
              tooth={mergedChart.t12}
              onZoneTrigger={on4ZoneTrigger}
            />
          </ToothBox>
          <ToothBox orientation="top" toothNumber={11}>
            <T11Svg
              tooth={mergedChart.t11}
              onColorChange={on4ZoneColorChange}
            />
            <Zone4Segment
              toothKey="t11"
              tooth={mergedChart.t11}
              onZoneTrigger={on4ZoneTrigger}
            />
          </ToothBox>
        </ToothMapLayout>
        <Divider orientation="vertical" />
        <ToothMapLayout direction="right">
          <ToothBox orientation="top" toothNumber={21}>
            <T21Svg
              tooth={mergedChart.t21}
              onColorChange={on4ZoneColorChange}
            />
            <Zone4Segment
              toothKey="t21"
              tooth={mergedChart.t21}
              onZoneTrigger={on4ZoneTrigger}
            />
          </ToothBox>
          <ToothBox orientation="top" toothNumber={22}>
            <T22Svg
              tooth={mergedChart.t22}
              onColorChange={on4ZoneColorChange}
            />
            <Zone4Segment
              toothKey="t22"
              tooth={mergedChart.t22}
              onZoneTrigger={on4ZoneTrigger}
            />
          </ToothBox>
          <ToothBox orientation="top" toothNumber={23}>
            <T23Svg
              tooth={mergedChart.t23}
              onColorChange={on4ZoneColorChange}
            />
            <Zone4Segment
              toothKey="t23"
              tooth={mergedChart.t23}
              onZoneTrigger={on4ZoneTrigger}
            />
          </ToothBox>
          <ToothBox orientation="top" toothNumber={24}>
            <T24Svg
              tooth={mergedChart.t24}
              onColorChange={on4ZoneColorChange}
            />
            <Zone4Segment
              toothKey="t24"
              tooth={mergedChart.t24}
              onZoneTrigger={on4ZoneTrigger}
            />
          </ToothBox>
          <ToothBox orientation="top" toothNumber={25}>
            <T25Svg
              tooth={mergedChart.t25}
              onColorChange={on4ZoneColorChange}
            />
            <Zone4Segment
              toothKey="t25"
              tooth={mergedChart.t25}
              onZoneTrigger={on4ZoneTrigger}
            />
          </ToothBox>
          <ToothBox orientation="top" toothNumber={26}>
            <T26Svg
              tooth={mergedChart.t26}
              onColorChange={on5ZoneColorChange}
            />
            <Zone5Segment
              toothKey="t26"
              tooth={mergedChart.t26}
              onZoneTrigger={on5ZoneTrigger}
            />
          </ToothBox>
          <ToothBox orientation="top" toothNumber={27}>
            <T27Svg
              tooth={mergedChart.t27}
              onColorChange={on5ZoneColorChange}
            />
            <Zone5Segment
              toothKey="t27"
              tooth={mergedChart.t27}
              onZoneTrigger={on5ZoneTrigger}
            />
          </ToothBox>
          <ToothBox orientation="top" toothNumber={28}>
            <T28Svg
              tooth={mergedChart.t28}
              onColorChange={on5ZoneColorChange}
            />
            <Zone5Segment
              toothKey="t28"
              tooth={mergedChart.t28}
              onZoneTrigger={on5ZoneTrigger}
            />
          </ToothBox>
        </ToothMapLayout>

        <Divider orientation="horizontal" />
        <div />
        <Divider orientation="horizontal" />

        <ToothMapLayout direction="left">
          <ToothBox orientation="bottom" toothNumber={48}>
            <Zone5Segment
              toothKey="t48"
              tooth={mergedChart.t48}
              onZoneTrigger={on5ZoneTrigger}
            />
            <T48Svg
              tooth={mergedChart.t48}
              onColorChange={on5ZoneColorChange}
            />
          </ToothBox>
          <ToothBox orientation="bottom" toothNumber={47}>
            <Zone5Segment
              toothKey="t47"
              tooth={mergedChart.t47}
              onZoneTrigger={on5ZoneTrigger}
            />
            <T47Svg
              tooth={mergedChart.t47}
              onColorChange={on5ZoneColorChange}
            />
          </ToothBox>
          <ToothBox orientation="bottom" toothNumber={46}>
            <Zone5Segment
              toothKey="t46"
              tooth={mergedChart.t46}
              onZoneTrigger={on5ZoneTrigger}
            />
            <T46Svg
              tooth={mergedChart.t46}
              onColorChange={on5ZoneColorChange}
            />
          </ToothBox>
          <ToothBox orientation="bottom" toothNumber={45}>
            <Zone4Segment
              toothKey="t45"
              tooth={mergedChart.t45}
              onZoneTrigger={on4ZoneTrigger}
            />
            <T45Svg
              tooth={mergedChart.t45}
              onColorChange={on4ZoneColorChange}
            />
          </ToothBox>
          <ToothBox orientation="bottom" toothNumber={44}>
            <Zone4Segment
              toothKey="t44"
              tooth={mergedChart.t44}
              onZoneTrigger={on4ZoneTrigger}
            />
            <T44Svg
              tooth={mergedChart.t44}
              onColorChange={on4ZoneColorChange}
            />
          </ToothBox>
          <ToothBox orientation="bottom" toothNumber={43}>
            <Zone4Segment
              toothKey="t43"
              tooth={mergedChart.t43}
              onZoneTrigger={on4ZoneTrigger}
            />
            <T43Svg
              tooth={mergedChart.t43}
              onColorChange={on4ZoneColorChange}
            />
          </ToothBox>
          <ToothBox orientation="bottom" toothNumber={42}>
            <Zone4Segment
              toothKey="t42"
              tooth={mergedChart.t42}
              onZoneTrigger={on4ZoneTrigger}
            />
            <T42Svg
              tooth={mergedChart.t42}
              onColorChange={on4ZoneColorChange}
            />
          </ToothBox>
          <ToothBox orientation="bottom" toothNumber={41}>
            <Zone4Segment
              toothKey="t41"
              tooth={mergedChart.t41}
              onZoneTrigger={on4ZoneTrigger}
            />
            <T41Svg
              tooth={mergedChart.t41}
              onColorChange={on4ZoneColorChange}
            />
          </ToothBox>
        </ToothMapLayout>
        <Divider orientation="vertical" />
        <ToothMapLayout direction="right">
          <ToothBox orientation="bottom" toothNumber={31}>
            <Zone4Segment
              toothKey="t31"
              tooth={mergedChart.t31}
              onZoneTrigger={on4ZoneTrigger}
            />
            <T31Svg
              tooth={mergedChart.t31}
              onColorChange={on4ZoneColorChange}
            />
          </ToothBox>
          <ToothBox orientation="bottom" toothNumber={32}>
            <Zone4Segment
              toothKey="t32"
              tooth={mergedChart.t32}
              onZoneTrigger={on4ZoneTrigger}
            />
            <T32Svg
              tooth={mergedChart.t32}
              onColorChange={on4ZoneColorChange}
            />
          </ToothBox>
          <ToothBox orientation="bottom" toothNumber={33}>
            <Zone4Segment
              toothKey="t33"
              tooth={mergedChart.t33}
              onZoneTrigger={on4ZoneTrigger}
            />
            <T33Svg
              tooth={mergedChart.t33}
              onColorChange={on4ZoneColorChange}
            />
          </ToothBox>
          <ToothBox orientation="bottom" toothNumber={34}>
            <Zone4Segment
              toothKey="t34"
              tooth={mergedChart.t34}
              onZoneTrigger={on4ZoneTrigger}
            />
            <T34Svg
              tooth={mergedChart.t34}
              onColorChange={on4ZoneColorChange}
            />
          </ToothBox>
          <ToothBox orientation="bottom" toothNumber={35}>
            <Zone4Segment
              toothKey="t35"
              tooth={mergedChart.t35}
              onZoneTrigger={on4ZoneTrigger}
            />
            <T35Svg
              tooth={mergedChart.t35}
              onColorChange={on4ZoneColorChange}
            />
          </ToothBox>
          <ToothBox orientation="bottom" toothNumber={36}>
            <Zone5Segment
              toothKey="t36"
              tooth={mergedChart.t36}
              onZoneTrigger={on5ZoneTrigger}
            />
            <T36Svg
              tooth={mergedChart.t36}
              onColorChange={on5ZoneColorChange}
            />
          </ToothBox>
          <ToothBox orientation="bottom" toothNumber={37}>
            <Zone5Segment
              toothKey="t37"
              tooth={mergedChart.t37}
              onZoneTrigger={on5ZoneTrigger}
            />
            <T37Svg
              tooth={mergedChart.t37}
              onColorChange={on5ZoneColorChange}
            />
          </ToothBox>
          <ToothBox orientation="bottom" toothNumber={38}>
            <Zone5Segment
              toothKey="t38"
              tooth={mergedChart.t38}
              onZoneTrigger={on5ZoneTrigger}
            />
            <T38Svg
              tooth={mergedChart.t38}
              onColorChange={on5ZoneColorChange}
            />
          </ToothBox>
        </ToothMapLayout>
      </Grid2>
    </div>
  );
};
