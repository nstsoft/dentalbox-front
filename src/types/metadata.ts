export type WorkspaceMetadata = {
  currency: string;
  workingHours: {
    start: string;
    end: string;
  };
  dentalMapColors: {
    root: { color: string; name: string }[];
    crown: { color: string; name: string }[];
  };
  workingHours: { start: string; end: string };
};
