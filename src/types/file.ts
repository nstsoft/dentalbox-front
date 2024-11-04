export type PatientFile = {
  patient: string;
  workspace: string;
  notes?: string;
  url: string;
  mimeType: string;
  name: string;
  _id: string;
};

export type FileWithDescription = {
  file: File;
  description: string;
  id: string;
};
