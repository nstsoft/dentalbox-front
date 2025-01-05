import { type FC } from "react";
import Box from "@mui/material/Box";
import {
  UpperJawTeeth,
  BottomJawTeeth,
  UpperJawDirections,
  BottomJawDirections,
  UpperJawTooth,
  BottomJawTooth,
  ToothPropertiesType,
  ToothProperty,
} from "@types";
import {
  Mobility,
  Implant,
  Furcation,
  Plaque,
  Bleeding,
  Margin,
  Depth,
  Note,
} from "./elements";
import { formToothChange } from "../helpers";
import type { DeepPartial, PeriodontalChart } from "@types";

type Props =
  | { dataset: UpperJawTeeth; jaw: "upperJaw" }
  | { dataset: BottomJawTeeth; jaw: "bottomJaw" };

export const Jaw: FC<
  Props & { onChartSet: (changed: DeepPartial<PeriodontalChart>) => void }
> = ({ dataset, jaw, onChartSet }) => {
  console.log("dataset", dataset);
  const currentDirection =
    jaw === "upperJaw" ? UpperJawDirections : BottomJawDirections;

  const toothSet =
    jaw === "upperJaw"
      ? UpperJawDirections.map((tooth) => dataset[tooth])
      : BottomJawDirections.map((tooth) => dataset[tooth]);

  const renderUpperSet = (
    t: UpperJawTooth | BottomJawTooth,
    index: number,
    side: "buccal" | "lingual"
  ) => {
    const onChange = (
      key: ToothProperty,
      value: ToothPropertiesType[keyof ToothPropertiesType]
    ) => {
      onChartSet(formToothChange(jaw, index, key, value, side));
    };

    const tooth =
      jaw === "upperJaw"
        ? (t as UpperJawTooth).buccal
        : (t as BottomJawTooth).lingual;

    return (
      <Box key={currentDirection[index]}>
        <Box className="tooth-number"> {currentDirection[index]}</Box>
        <Mobility
          onChange={onChange.bind(null, ToothProperty.mobility)}
          value={t.mobility}
        />
        <Implant
          onChange={onChange.bind(null, ToothProperty.implant)}
          value={t.implant}
        />
        <Furcation
          onChange={onChange.bind(null, ToothProperty.furcation)}
          value={tooth.furcation}
        />
        <Bleeding
          onChange={onChange.bind(null, ToothProperty.bleeding)}
          value={tooth.bleeding}
        />
        <Plaque
          onChange={onChange.bind(null, ToothProperty.plaque)}
          value={tooth.plaque}
        />
        <Margin
          onChange={onChange.bind(null, ToothProperty.margin)}
          value={tooth.margin}
        />
        <Depth
          onChange={onChange.bind(null, ToothProperty.depth)}
          value={tooth.depth}
        />
      </Box>
    );
  };

  const renderBottomSet = (
    t: UpperJawTooth | BottomJawTooth,
    index: number,
    side: "buccal" | "palatal"
  ) => {
    const onChange = (
      key: ToothProperty,
      value: ToothPropertiesType[keyof ToothPropertiesType]
    ) => {
      onChartSet(formToothChange(jaw, index, key, value, side));
    };

    const tooth =
      jaw === "upperJaw"
        ? (t as UpperJawTooth).buccal
        : (t as BottomJawTooth).lingual;

    return (
      <Box key={currentDirection[index]}>
        <Depth
          onChange={onChange.bind(null, ToothProperty.depth)}
          value={tooth.depth}
        />
        <Margin
          onChange={onChange.bind(null, ToothProperty.margin)}
          value={tooth.margin}
        />
        <Plaque
          onChange={onChange.bind(null, ToothProperty.plaque)}
          value={tooth.plaque}
        />
        <Bleeding
          onChange={onChange.bind(null, ToothProperty.bleeding)}
          value={tooth.bleeding}
        />
        <Furcation
          onChange={onChange.bind(null, ToothProperty.furcation)}
          value={tooth.furcation}
        />
        <Note
          onChange={onChange.bind(null, ToothProperty.note)}
          value={t.note}
        />
      </Box>
    );
  };

  return (
    <Box className="teeth-section">
      <Box className="teeth-section-content">
        <Box className="teeth-section-legend"></Box>
        <Box className="teeth-values">
          {toothSet.map((t, index) =>
            renderUpperSet(t, index, jaw == "upperJaw" ? "buccal" : "lingual")
          )}
          {toothSet.map((t, index) =>
            renderBottomSet(t, index, jaw == "upperJaw" ? "palatal" : "buccal")
          )}
        </Box>
      </Box>
    </Box>
  );
};
