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
  TEETH_NUMBERS,
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
  ToothImage,
} from "./elements";
import { formToothChange } from "../helpers";
import type { DeepPartial, PeriodontalChart } from "@types";
import Typography from "@mui/material/Typography";
import { teethWithFurcation } from "./utils";
import { useTranslation } from "react-i18next";

type Props =
  | { dataset: UpperJawTeeth; jaw: "upperJaw" }
  | { dataset: BottomJawTeeth; jaw: "bottomJaw" };

export const Jaw: FC<
  Props & { onChartSet: (changed: DeepPartial<PeriodontalChart>) => void }
> = ({ dataset, jaw, onChartSet }) => {
  const { t } = useTranslation("", {
    keyPrefix: "pages.patientCard.periodontalCard.jaw",
  });
  const currentDirection =
    jaw === "upperJaw" ? UpperJawDirections : BottomJawDirections;

  const toothSet =
    jaw === "upperJaw"
      ? UpperJawDirections.map((tooth) => ({ ...dataset[tooth], index: tooth }))
      : BottomJawDirections.map((tooth) => ({
          ...dataset[tooth],
          index: tooth,
        }));

  const renderMobilitySet = (
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
      <Box
        key={currentDirection[index]}
        className={`column ${jaw === "bottomJaw" ? "reverse" : ""}`}
      >
        <Box className="tooth-number"> {currentDirection[index].slice(1)}</Box>
        <Mobility
          onChange={onChange.bind(null, ToothProperty.mobility)}
          value={t.mobility}
        />
        <Implant
          onChange={onChange.bind(null, ToothProperty.implant)}
          value={[t.implant]}
        />
        <Furcation
          onChange={onChange.bind(null, ToothProperty.furcation)}
          value={tooth.furcation}
          implant={t.implant}
          available={teethWithFurcation.includes(t.index)}
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
        <ToothImage
          margin={tooth.margin}
          tooth={t.index as TEETH_NUMBERS}
          implant={t.implant}
          depth={tooth.depth}
          rotate={jaw === "bottomJaw"}
        />
      </Box>
    );
  };

  const renderNotesSet = (
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
      <Box
        key={currentDirection[index]}
        className={`column ${jaw === "bottomJaw" ? "reverse" : ""}`}
      >
        <ToothImage
          rotate={jaw === "upperJaw"}
          tooth={t.index as TEETH_NUMBERS}
          implant={t.implant}
          margin={tooth.margin}
          depth={tooth.depth}
        />
        <Depth
          onChange={onChange.bind(null, ToothProperty.depth)}
          value={tooth.depth}
          toothKey={`${side}_${currentDirection[index]}`}
        />
        <Margin
          onChange={onChange.bind(null, ToothProperty.margin)}
          value={tooth.margin}
          toothKey={`${side}_${currentDirection[index]}`}
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
          implant={t.implant}
          available={teethWithFurcation.includes(t.index)}
        />
        <Note
          onChange={onChange.bind(null, ToothProperty.note)}
          value={t.note}
        />
      </Box>
    );
  };

  const renderUpperQuarter = () => {
    if (jaw === "upperJaw") {
      return (
        <>{toothSet.map((t, index) => renderMobilitySet(t, index, "buccal"))}</>
      );
    }
    return (
      <>{toothSet.map((t, index) => renderNotesSet(t, index, "buccal"))}</>
    );
  };

  const renderBottomQuarter = () => {
    if (jaw === "upperJaw") {
      return (
        <>{toothSet.map((t, index) => renderNotesSet(t, index, "palatal"))}</>
      );
    }
    return (
      <>{toothSet.map((t, index) => renderMobilitySet(t, index, "lingual"))}</>
    );
  };

  return (
    <Box
      className="teeth-section"
      sx={{ alignItems: "flex-start", }}
    >
      <Box className="teeth-section-content">
        <Box
          className={`teeth-section-names ${jaw === "bottomJaw" && "reverse"}`}
        >
          {jaw === "upperJaw" && (
            <>
              <Typography className="name"></Typography>
              <Typography className="name">{t("mobility")}</Typography>
              <Typography className="name">{t("implant")}</Typography>
              <Typography className="name">{t("furcation")}</Typography>
              <Typography className="name">{t("bleeding")}</Typography>
              <Typography className="name">{t("plaque")}</Typography>
              <Typography className="name">{t("margin")}</Typography>
              <Typography className="name">{t("depth")}</Typography>
              <Typography className="name icon"></Typography>
            </>
          )}
          {jaw === "bottomJaw" && (
            <>
              <Typography className="name icon"></Typography>
              <Typography className="name">{t("margin")}</Typography>
              <Typography className="name">{t("depth")}</Typography>
              <Typography className="name">{t("plaque")}</Typography>
              <Typography className="name">{t("bleeding")}</Typography>
              <Typography className="name">{t("furcation")}</Typography>
              <Typography className="name">{t("notes")}</Typography>
            </>
          )}
        </Box>
        <Box className="teeth-values">{renderUpperQuarter()}</Box>
      </Box>
      <Box className="teeth-section-content">
        <Box
          className={`teeth-section-names ${
            jaw === "bottomJaw" ? "reverse" : ""
          }`}
        >
          {jaw === "upperJaw" && (
            <>
              <Typography className="name icon"></Typography>
              <Typography className="name">{t("margin")}</Typography>
              <Typography className="name">{t("depth")}</Typography>
              <Typography className="name">{t("plaque")}</Typography>
              <Typography className="name">{t("bleeding")}</Typography>
              <Typography className="name">{t("furcation")}</Typography>
              <Typography className="name">{t("notes")}</Typography>
            </>
          )}
          {jaw === "bottomJaw" && (
            <>
              <Typography className="name"></Typography>
              <Typography className="name">{t("mobility")}</Typography>
              <Typography className="name">{t("implant")}</Typography>
              <Typography className="name">{t("furcation")}</Typography>
              <Typography className="name">{t("bleeding")}</Typography>
              <Typography className="name">{t("plaque")}</Typography>
              <Typography className="name">{t("margin")}</Typography>
              <Typography className="name">{t("depth")}</Typography>
              <Typography className="name icon"></Typography>
            </>
          )}
        </Box>
        <Box className="teeth-values">{renderBottomQuarter()}</Box>
      </Box>
    </Box>
  );
};
