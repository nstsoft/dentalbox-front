import {
  UpperJawDirections,
  BottomJawDirections,
  ToothProperty,
  ToothPropertiesType,
  DeepPartial,
  PeriodontalChart,
} from "@types";

const generalToothProperties = ["implant", "note", "mobility"];

export const formToothChange = (
  jaw: "bottomJaw" | "upperJaw",
  index: number,
  key: ToothProperty,
  value: ToothPropertiesType[keyof ToothPropertiesType],
  side: "buccal" | "lingual" | "palatal"
): DeepPartial<PeriodontalChart> => {
  const tooth = (jaw === "upperJaw" ? UpperJawDirections : BottomJawDirections)[
    index
  ];

  const toothData = generalToothProperties.includes(key)
    ? { [key]: value }
    : { [side]: { [key]: value } };

  return { [jaw]: { [tooth]: toothData } };
};
