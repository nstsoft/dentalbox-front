export type PatientFile = {
  patient: string;
  workspace: string;
  notes?: string;
  url: string;
  mimeType: string;
};

export type FileWithDescription = {
  file: File;
  description: string;
  id: string;
};
