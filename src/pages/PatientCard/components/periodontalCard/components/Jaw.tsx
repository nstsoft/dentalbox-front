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
import Typography from "@mui/material/Typography";

type Props =
  | { dataset: UpperJawTeeth; jaw: "upperJaw" }
  | { dataset: BottomJawTeeth; jaw: "bottomJaw" };

const toothsFurcation = [
  "t18",
  "t17",
  "t16",
  "t26",
  "t27",
  "t28",
  "t48",
  "t47",
  "t46",
  "t36",
  "t37",
  "t38",
];

export const Jaw: FC<
  Props & { onChartSet: (changed: DeepPartial<PeriodontalChart>) => void }
> = ({ dataset, jaw, onChartSet }) => {
  const currentDirection =
    jaw === "upperJaw" ? UpperJawDirections : BottomJawDirections;

  const toothSet =
    jaw === "upperJaw"
      ? UpperJawDirections.map((tooth) => ({ ...dataset[tooth], index: tooth }))
      : BottomJawDirections.map((tooth) => ({
          ...dataset[tooth],
          index: tooth,
        }));

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
          isImplant={t.implant}
          isAvailable={toothsFurcation.includes(t.index)}
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
          toothKey={`${side}_${currentDirection[index]}`}
          onChange={onChange.bind(null, ToothProperty.margin)}
          value={tooth.margin}
        />
        <Depth
          toothKey={`${side}_${currentDirection[index]}`}
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
        ? (t as UpperJawTooth).palatal
        : (t as BottomJawTooth).buccal;

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
        {/* <Plaque
          onChange={onChange.bind(null, ToothProperty.plaque)}
          value={tooth.plaque}
        />
        <Bleeding
          onChange={onChange.bind(null, ToothProperty.bleeding)}
          value={tooth.bleeding}
        /> */}
        <Furcation
          onChange={onChange.bind(null, ToothProperty.furcation)}
          value={tooth.furcation}
          isImplant={t.implant}
          isAvailable={toothsFurcation.includes(t.index)}
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
        <Box className="teeth-section-names">
          <Typography className="name"></Typography>
          <Typography className="name">Mobility</Typography>
          <Typography sx={{ height: "30px" }}>Implant</Typography>
          <Typography className="name">Furcation</Typography>
          <Typography className="name">Bleeding</Typography>
          <Typography className="name">Plaque</Typography>
          <Typography className="name">Margin</Typography>
          <Typography className="name">Depth</Typography>
        </Box>
        <Box className="teeth-values">
          {toothSet.map((t, index) =>
            renderUpperSet(t, index, jaw == "upperJaw" ? "buccal" : "lingual")
          )}
        </Box>
      </Box>
      <Box className="teeth-section-content">
        <Box className="teeth-section-names">
          <Typography className="name">Margin</Typography>
          <Typography className="name">Depth</Typography>
          <Typography className="name">Plaque</Typography>
          <Typography className="name">Bleeding</Typography>
          <Typography className="name">Furcation</Typography>
          <Typography className="name">Notes</Typography>
        </Box>
        <Box className="teeth-values">
          {toothSet.map((t, index) =>
            renderBottomSet(t, index, jaw == "upperJaw" ? "palatal" : "buccal")
          )}
        </Box>
      </Box>
    </Box>
  );
};
