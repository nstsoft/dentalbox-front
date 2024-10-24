import { FC } from "react";
import { ToothBox } from "./ToothBox";
import { ToothMapLayout } from "../../layout";
import { extractNumber } from "@utils";
import type {
  Chart,
  Segment4,
  Segment2,
  FourZonesChart,
  FiveZonesChart,
  Zone4,
  Zone5,
  ToothQuarterKeys,
  FourZonesChartKeys,
  FiveZonesChartKeys,
} from "@types";

import { ToothComponents5, ToothComponents4 } from "../constants";

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
  T31Svg,
  T32Svg,
  T33Svg,
  T34Svg,
  T35Svg,
  T41Svg,
  T42Svg,
  T43Svg,
  T44Svg,
  T45Svg,
  T46Svg,
  T47Svg,
  T48Svg,
  T26Svg,
  T27Svg,
  T28Svg,
  T36Svg,
  T37Svg,
  T38Svg,
  Zone4Segment,
  Zone5Segment,
} from "./teeth";

type Props = {
  chart: Chart;
  selectedToothKey?: keyof Chart;
  direction: "left" | "right";
  orientation: "top" | "bottom";
  onToothObjectChange: (tooth: keyof Chart) => void;
  onToothSelect: (tooth: keyof Chart) => void;
  on5ZoneTrigger: (tooth: keyof FiveZonesChart, zone: keyof Zone5) => void;
  on5ZoneColorChange: (
    tooth: keyof FiveZonesChart,
    segment: keyof Segment4
  ) => void;
  on4ZoneColorChange: (
    tooth: keyof FourZonesChart,
    segment: keyof Segment2
  ) => void;
  on4ZoneTrigger: (tooth: keyof FourZonesChart, zone: keyof Zone4) => void;
  teethKeys: ToothQuarterKeys;
};

export const QuarterLayout: FC<Props> = ({
  chart,
  onToothObjectChange,
  onToothSelect,
  selectedToothKey,
  on5ZoneTrigger,
  on5ZoneColorChange,
  on4ZoneColorChange,
  on4ZoneTrigger,
  direction,
  orientation,
  teethKeys,
}) => {
  const teeth4 = teethKeys.slice(0, 5) as FourZonesChartKeys[];
  const teeth5 = teethKeys.slice(5, 8) as FiveZonesChartKeys[];

  const build5keys = () => {
    return teeth5.map((key) => {
      return (
        <ToothBox
          hasDescription={!!chart[key]?.description}
          key={key}
          onToothObjectChange={onToothObjectChange}
          onToothSelect={onToothSelect}
          orientation={orientation}
          toothNumber={extractNumber(key)}
          isFocused={selectedToothKey === key}
        >
          {orientation === "bottom"
            ? fiveZoneComponents(key)
            : fiveZoneComponents(key).reverse()}
        </ToothBox>
      );
    });
  };

  const build4keys = () => {
    return teeth4.map((key) => {
      return (
        <ToothBox
          hasDescription={!!chart[key]?.description}
          key={key}
          onToothObjectChange={onToothObjectChange}
          onToothSelect={onToothSelect}
          orientation={orientation}
          toothNumber={extractNumber(key)}
          isFocused={selectedToothKey === key}
        >
          {orientation === "bottom"
            ? fourZoneComponents(key)
            : fourZoneComponents(key).reverse()}
        </ToothBox>
      );
    });
  };

  const fiveZoneComponents = (key: FiveZonesChartKeys) => {
    const TComponent = ToothComponents5[key];
    return [
      <div key={"zone" + key}>
        {chart[key].crown || chart[key].implant || chart[key].removed ? null : (
          <Zone5Segment
            toothKey={key}
            tooth={chart[key]}
            onZoneTrigger={on5ZoneTrigger}
          />
        )}
      </div>,

      <TComponent
        key={"tooth-component" + key}
        tooth={chart[key]}
        onColorChange={on5ZoneColorChange}
      />,
    ];
  };
  const fourZoneComponents = (key: FourZonesChartKeys) => {
    const TComponent = ToothComponents4[key];
    return [
      <div key={"zone" + key}>
        {chart[key].crown || chart[key].implant || chart[key].removed ? null : (
          <Zone4Segment
            toothKey={key}
            tooth={chart[key]}
            onZoneTrigger={on4ZoneTrigger}
          />
        )}
      </div>,
      <TComponent
        key={"tooth-component" + key}
        tooth={chart[key]}
        onColorChange={on4ZoneColorChange}
      />,
    ];
  };

  const components = [...build4keys(), ...build5keys()];

  return (
    <ToothMapLayout direction={direction}>
      {direction === "left" ? components.reverse() : components}
    </ToothMapLayout>
  );
};
