export type WorkspaceMetadata = {
  currency: string;
  dentalMapColors: {
    root: { color: string; name: string }[];
    crown: { color: string; name: string }[];
  };
  workingHours: { start: string; end: string };
  showPricing: boolean;
};
