import "./dentalMap.scss";
import { useGetDentalMapQuery, useUpdateDentalMapMutation } from "@api";
import { FC, useEffect, useState } from "react";
import { extractNumber } from "@utils";

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
import Grid2 from "@mui/material/Grid2";
import Divider from "@mui/material/Divider";
import SkullBottom from "@images/backgrounds/skull-bottom.png";
import SkullTop from "@images/backgrounds/skull-top.png";
import { isMobile } from "react-device-detect";
import { Notes } from "@components";
import { QuarterLayout } from "./components";
import {
  LeftUpToothKeys,
  RightUpToothKeys,
  RightBottomToothKeys,
  LeftBottomToothKeys,
} from "./constants";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";

const colorsSet = Object.values(SEGMENT_COLORS);

const getNextColor = (color: string) => {
  const index = colorsSet.indexOf(color as SEGMENT_COLORS);
  const nextIndex = (index + 1) % colorsSet.length;
  return colorsSet[nextIndex];
};

export const DentalMap: FC<{ patientId: string }> = ({ patientId }) => {
  const { t } = useTranslation("", {
    keyPrefix: "pages.patientCard.dentalMap",
  });
  const [updateDentalMap] = useUpdateDentalMapMutation();
  const { data } = useGetDentalMapQuery(patientId);
  const [chart, setChart] = useState<Partial<Chart> | undefined>();
  const [description, setDescription] = useState<string | undefined>();
  const [selectedToothKey, setSelectedToothKey] = useState<
    keyof Chart | undefined
  >();

  useEffect(() => {
    if (
      selectedToothKey &&
      !Object.hasOwnProperty.call(
        chart?.[selectedToothKey] ?? {},
        "description"
      )
    ) {
      setChart((prev) => ({
        ...prev,
        [selectedToothKey]: {
          ...prev?.[selectedToothKey],
          description:
            prev?.[selectedToothKey]?.description ??
            data?.chart?.[selectedToothKey]?.description,
        },
      }));
    }
  }, [chart, data?.chart, selectedToothKey]);

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

  const onToothObjectChange = (tooth: keyof Chart) => {
    if (!data?.chart) return;

    const value = {
      implant:
        chart?.[tooth]?.implant !== undefined
          ? chart?.[tooth]?.implant
          : data?.chart[tooth].implant,
      crown:
        chart?.[tooth]?.crown !== undefined
          ? chart?.[tooth]?.crown
          : data?.chart[tooth].crown,
      removed:
        chart?.[tooth]?.removed !== undefined
          ? chart?.[tooth]?.removed
          : data?.chart[tooth].removed,
    };

    if (!value.implant && !value.crown && !value.removed) {
      value.implant = true;
    } else if (value.implant) {
      Object.assign(value, { implant: false, crown: true, removed: false });
    } else if (value.crown) {
      Object.assign(value, { implant: false, crown: false, removed: true });
    } else if (value.removed) {
      Object.assign(value, { implant: false, crown: false, removed: false });
    }

    setChart((prev) => ({
      ...prev,
      [tooth]: {
        ...prev?.[tooth],
        zones: { ...prev?.[tooth]?.zones },
        ...value,
      },
    }));
  };

  const onToothSelect = (tooth: keyof Chart) => {
    if (tooth === selectedToothKey) {
      setSelectedToothKey(undefined);
    } else {
      setSelectedToothKey(tooth);
    }
    if ("description" in (chart?.[tooth] ?? {})) {
      setDescription(chart?.[tooth]?.description ?? undefined);
    } else {
      setDescription(data?.chart?.[tooth]?.description ?? undefined);
    }
  };

  const toothDescriptionChanged = (value?: string) => {
    if (!selectedToothKey) return;
    setChart((prev) => ({
      ...prev,
      [selectedToothKey]: { ...prev?.[selectedToothKey], description: value },
    }));
  };

  const onSaveChart = () => {
    if (!chart) return null;
    updateDentalMap({ chart, patientId });
  };

  if (!data?.chart) return null;

  const mergedChart = deepMerge(data?.chart, chart ?? {});

  return (
    <div className="dental-map-container">
      <Button variant="contained" color="primary" onClick={onSaveChart}>
        Save
      </Button>
      <div
        className="dental-map-background"
        style={{
          backgroundImage: isMobile
            ? "none"
            : `url(${SkullTop}), url(${SkullBottom})`,
          backgroundPosition: "top center, bottom center",
          backgroundSize: "contain, contain",
          backgroundRepeat: "no-repeat, no-repeat",
        }}
      >
        <Grid2 className="dental-map">
          <QuarterLayout
            direction="left"
            orientation="top"
            teethKeys={LeftUpToothKeys}
            chart={mergedChart}
            onToothObjectChange={onToothObjectChange}
            onToothSelect={onToothSelect}
            selectedToothKey={selectedToothKey}
            on5ZoneTrigger={on5ZoneTrigger}
            on5ZoneColorChange={on5ZoneColorChange}
            on4ZoneColorChange={on4ZoneColorChange}
            on4ZoneTrigger={on4ZoneTrigger}
          />
          <Divider orientation="vertical" />
          <QuarterLayout
            direction="right"
            orientation="top"
            teethKeys={RightUpToothKeys}
            chart={mergedChart}
            onToothObjectChange={onToothObjectChange}
            onToothSelect={onToothSelect}
            selectedToothKey={selectedToothKey}
            on5ZoneTrigger={on5ZoneTrigger}
            on5ZoneColorChange={on5ZoneColorChange}
            on4ZoneColorChange={on4ZoneColorChange}
            on4ZoneTrigger={on4ZoneTrigger}
          />

          <Divider orientation="horizontal" />
          <div />
          <Divider orientation="horizontal" />

          <QuarterLayout
            direction="left"
            orientation="bottom"
            teethKeys={LeftBottomToothKeys}
            chart={mergedChart}
            onToothObjectChange={onToothObjectChange}
            onToothSelect={onToothSelect}
            selectedToothKey={selectedToothKey}
            on5ZoneTrigger={on5ZoneTrigger}
            on5ZoneColorChange={on5ZoneColorChange}
            on4ZoneColorChange={on4ZoneColorChange}
            on4ZoneTrigger={on4ZoneTrigger}
          />
          <Divider orientation="vertical" />
          <QuarterLayout
            direction="right"
            orientation="bottom"
            teethKeys={RightBottomToothKeys}
            chart={mergedChart}
            onToothObjectChange={onToothObjectChange}
            onToothSelect={onToothSelect}
            selectedToothKey={selectedToothKey}
            on5ZoneTrigger={on5ZoneTrigger}
            on5ZoneColorChange={on5ZoneColorChange}
            on4ZoneColorChange={on4ZoneColorChange}
            on4ZoneTrigger={on4ZoneTrigger}
          />
        </Grid2>
      </div>
      <div className="dental-map-notes">
        <Notes
          value={description}
          setValue={setDescription}
          label={t("toothNotes", {
            tooth: extractNumber(selectedToothKey ?? "t0") + "",
          })}
          onConfirm={() => {
            toothDescriptionChanged(description);
          }}
        />
      </div>
    </div>
  );
};
