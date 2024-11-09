export type Anamnesis = {
  allergies?: string;
  surgeries?: string;
  medicationHistory?: string;
  immunization?: string;
  respiratory?: string;
  hypertension?: string;
  kidney?: string;
  liver?: string;
  autoimmune?: string;
  blood?: string;
  infectionsHistory?: string;
  chronicDisorders?: string;
  patient: string;
  workspace: string;
  smoking: boolean;
  alcohol: boolean;
  diabetes: boolean;
  _id: string;
};

export type AnamnesisData = Partial<
  Omit<Anamnesis, "patient" | "workspace" | "_id">
>;
