type Anamnesis = {
  furcation: number;
  bleeding: [boolean, boolean, boolean];
  plaque: [boolean, boolean, boolean];
  margin: [number, number, number];
  depth: [number, number, number];
};

export enum ToothProperty {
  furcation = "furcation",
  bleeding = "bleeding",
  plaque = "plaque",
  margin = "margin",
  depth = "depth",
  note = "note",
  mobility = "mobility",
  implant = "implant",
}

type ToothT = {
  mobility: number;
  implant: boolean;
  note?: string;
  index: string;
};

export type ToothPropertiesType = ToothT & Anamnesis;

export type UpperJawTooth = ToothT & { buccal: Anamnesis; palatal: Anamnesis };
export type BottomJawTooth = ToothT & { lingual: Anamnesis; buccal: Anamnesis };

export type UpperJawTeeth = {
  t18: UpperJawTooth;
  t17: UpperJawTooth;
  t16: UpperJawTooth;
  t15: UpperJawTooth;
  t14: UpperJawTooth;
  t13: UpperJawTooth;
  t12: UpperJawTooth;
  t11: UpperJawTooth;
  t28: UpperJawTooth;
  t27: UpperJawTooth;
  t26: UpperJawTooth;
  t25: UpperJawTooth;
  t24: UpperJawTooth;
  t23: UpperJawTooth;
  t22: UpperJawTooth;
  t21: UpperJawTooth;
};

export type BottomJawTeeth = {
  t38: BottomJawTooth;
  t37: BottomJawTooth;
  t36: BottomJawTooth;
  t35: BottomJawTooth;
  t34: BottomJawTooth;
  t33: BottomJawTooth;
  t32: BottomJawTooth;
  t31: BottomJawTooth;
  t48: BottomJawTooth;
  t47: BottomJawTooth;
  t46: BottomJawTooth;
  t45: BottomJawTooth;
  t44: BottomJawTooth;
  t43: BottomJawTooth;
  t42: BottomJawTooth;
  t41: BottomJawTooth;
};

export type PeriodontalChart = {
  upperJaw: UpperJawTeeth;
  bottomJaw: BottomJawTeeth;
};
export type PeriodontalChartResponse = {
  chart: PeriodontalChart;
  patient: string;
  notes?: string;
  _id: string;
};

export const UpperJawDirections = [
  "t18",
  "t17",
  "t16",
  "t15",
  "t14",
  "t13",
  "t12",
  "t11",
  "t21",
  "t22",
  "t23",
  "t24",
  "t25",
  "t26",
  "t27",
  "t28",
] as const;

export const BottomJawDirections = [
  "t48",
  "t47",
  "t46",
  "t45",
  "t44",
  "t43",
  "t42",
  "t41",
  "t31",
  "t32",
  "t33",
  "t34",
  "t35",
  "t36",
  "t37",
  "t38",
] as const;
