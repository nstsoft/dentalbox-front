import { PatientFile } from "./file";

export type History = {
  patient: string;
  files: string[];
  notes?: string;
  anamnesis?: string;
  complaints?: string;
  objectiveData?: string;
  materials?: string;
  anesthesia?: string;
  workspace: string;
  treatment?: string;
  date?: string;
  _id: string;
};
export type HistoryResponse = Omit<History, "files"> & { files: PatientFile[] };
