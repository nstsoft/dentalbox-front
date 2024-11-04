import { PatientFile } from "./file";
import { type Dayjs } from "dayjs";

export type History = {
  patient: string;
  files: string[];
  notes?: string;
  anamnesis?: string;
  complaints?: string;
  objectiveData?: string;
  materials?: string;
  diagnosis?: string;
  anesthesia?: string;
  workspace: string;
  treatment?: string;
  date?: string;
  _id: string;
};

export type HistoryData = Omit<
  History,
  "patient" | "_id" | "files" | "workspace" | "date"
> & {
  _id?: string;
  date?: Dayjs;
  files?: File[];
};

export type HistoryResponse = Omit<History, "files"> & { files: PatientFile[] };
